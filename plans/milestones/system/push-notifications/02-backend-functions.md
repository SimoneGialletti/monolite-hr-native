# Module 2: Backend Functions

> **Phase**: 2 of 6
> **Status**: Not Started
> **Dependencies**: Module 1 (Database Schema)

## Overview

This module covers all backend implementation including the Edge Function for sending push notifications, database triggers, and scheduled jobs.

## Edge Function: send-push-notification

### Purpose
Main function that handles sending push notifications via FCM. Called by database triggers and scheduled jobs.

### Location
`supabase/functions/send-push-notification/index.ts`

### Implementation

```typescript
// supabase/functions/send-push-notification/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

interface NotificationPayload {
  user_id: string;
  app_id?: string;
  title: string;
  body: string;
  notification_type: string;
  entity_type?: string;
  entity_id?: string;
  deep_link_path?: string;
  priority?: "low" | "normal" | "high" | "urgent";
  data?: Record<string, string>;
}

interface FCMMessage {
  token: string;
  notification: {
    title: string;
    body: string;
  };
  data: Record<string, string>;
  android?: {
    priority: string;
    notification: {
      channel_id: string;
      icon: string;
      color: string;
    };
  };
  apns?: {
    payload: {
      aps: {
        badge: number;
        sound: string;
        "mutable-content": number;
      };
    };
  };
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const NOTIFICATION_TYPE_TO_PREF: Record<string, string> = {
  request_submitted: "notify_request_submitted",
  request_approved: "notify_request_approved",
  request_rejected: "notify_request_rejected",
  announcement: "notify_announcements",
  document_expiring: "notify_document_expiring",
  document_expired: "notify_document_expired",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const payload: NotificationPayload = await req.json();
    const appId = payload.app_id || "monolite-hr";

    // 1. Check user notification preferences
    const { data: prefs } = await supabase
      .from("notification_preferences")
      .select("*")
      .eq("user_id", payload.user_id)
      .eq("app_id", appId)
      .single();

    // Check if push is globally disabled
    if (prefs?.push_enabled === false) {
      return jsonResponse({
        skipped: true,
        reason: "push_disabled",
      });
    }

    // Check if this specific notification type is disabled
    const prefKey = NOTIFICATION_TYPE_TO_PREF[payload.notification_type];
    if (prefKey && prefs?.[prefKey] === false) {
      return jsonResponse({
        skipped: true,
        reason: "notification_type_disabled",
      });
    }

    // Check quiet hours
    if (prefs && isQuietHours(prefs.quiet_hours_start, prefs.quiet_hours_end)) {
      return jsonResponse({
        skipped: true,
        reason: "quiet_hours",
      });
    }

    // 2. Create notification record in database
    const { data: notification, error: notifError } = await supabase
      .from("notifications")
      .insert({
        user_id: payload.user_id,
        app_id: appId,
        title: payload.title,
        body: payload.body,
        notification_type: payload.notification_type,
        entity_type: payload.entity_type,
        entity_id: payload.entity_id,
        deep_link_path: payload.deep_link_path,
        priority: payload.priority || "normal",
        metadata: payload.data || {},
      })
      .select()
      .single();

    if (notifError) {
      throw new Error(`Failed to create notification: ${notifError.message}`);
    }

    // 3. Get user's FCM tokens for this app
    const { data: devices, error: devicesError } = await supabase
      .from("user_devices")
      .select("id, fcm_token, platform")
      .eq("user_id", payload.user_id)
      .eq("app_id", appId)
      .eq("push_enabled", true)
      .not("fcm_token", "is", null);

    if (devicesError) {
      throw new Error(`Failed to fetch devices: ${devicesError.message}`);
    }

    if (!devices || devices.length === 0) {
      return jsonResponse({
        notification_id: notification.id,
        push_sent: false,
        reason: "no_devices",
      });
    }

    // 4. Get FCM access token
    const accessToken = await getFCMAccessToken();

    // 5. Send to all devices
    const results = await Promise.all(
      devices.map((device) =>
        sendFCMMessage(accessToken, device, payload, notification.id)
      )
    );

    const successCount = results.filter((r) => r.success).length;
    const failedDevices = results
      .filter((r) => !r.success)
      .map((r) => r.deviceId);

    // 6. Update notification with push status
    await supabase
      .from("notifications")
      .update({
        push_sent_at: new Date().toISOString(),
        push_error:
          failedDevices.length > 0
            ? `Failed for ${failedDevices.length} device(s)`
            : null,
      })
      .eq("id", notification.id);

    // 7. Clean up invalid tokens
    for (const result of results) {
      if (result.invalidToken) {
        await supabase
          .from("user_devices")
          .delete()
          .eq("id", result.deviceId);
      }
    }

    return jsonResponse({
      notification_id: notification.id,
      push_sent: true,
      devices_notified: successCount,
      devices_failed: failedDevices.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending notification:", message);

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function jsonResponse(data: unknown) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function isQuietHours(start: string | null, end: string | null): boolean {
  if (!start || !end) return false;

  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

  // Handle overnight quiet hours (e.g., 22:00 - 07:00)
  if (start > end) {
    return currentTime >= start || currentTime < end;
  }

  return currentTime >= start && currentTime < end;
}

async function getFCMAccessToken(): Promise<string> {
  // Get service account from Supabase Vault
  const serviceAccount = JSON.parse(
    Deno.env.get("FIREBASE_SERVICE_ACCOUNT") || "{}"
  );

  if (!serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error("Firebase service account not configured");
  }

  // Create JWT for FCM
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    sub: serviceAccount.client_email,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
  };

  const jwt = await createJWT(header, payload, serviceAccount.private_key);

  // Exchange JWT for access token
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${data.error_description}`);
  }

  return data.access_token;
}

async function createJWT(
  header: object,
  payload: object,
  privateKey: string
): Promise<string> {
  const encoder = new TextEncoder();

  const headerB64 = btoa(JSON.stringify(header));
  const payloadB64 = btoa(JSON.stringify(payload));
  const unsigned = `${headerB64}.${payloadB64}`;

  // Import private key
  const pemContents = privateKey
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "");

  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  // Sign
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    encoder.encode(unsigned)
  );

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${unsigned}.${signatureB64}`;
}

async function sendFCMMessage(
  accessToken: string,
  device: { id: string; fcm_token: string; platform: string },
  payload: NotificationPayload,
  notificationId: string
): Promise<{ success: boolean; deviceId: string; invalidToken?: boolean }> {
  const projectId = Deno.env.get("FIREBASE_PROJECT_ID");

  if (!projectId) {
    throw new Error("FIREBASE_PROJECT_ID not configured");
  }

  const message: FCMMessage = {
    token: device.fcm_token,
    notification: {
      title: payload.title,
      body: payload.body,
    },
    data: {
      notification_id: notificationId,
      notification_type: payload.notification_type,
      entity_type: payload.entity_type || "",
      entity_id: payload.entity_id || "",
      deep_link_path: payload.deep_link_path || "",
      click_action: "FLUTTER_NOTIFICATION_CLICK",
    },
  };

  // Platform-specific configuration
  if (device.platform === "android") {
    message.android = {
      priority: payload.priority === "urgent" ? "high" : "normal",
      notification: {
        channel_id: "monolite_hr_notifications",
        icon: "ic_notification",
        color: "#FFD700",
      },
    };
  } else if (device.platform === "ios") {
    message.apns = {
      payload: {
        aps: {
          badge: 1,
          sound: "default",
          "mutable-content": 1,
        },
      },
    };
  }

  try {
    const response = await fetch(
      `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ message }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Check for invalid token errors
      const isInvalidToken =
        data.error?.details?.some(
          (d: { errorCode?: string }) =>
            d.errorCode === "UNREGISTERED" || d.errorCode === "INVALID_ARGUMENT"
        ) || false;

      console.error(`FCM error for device ${device.id}:`, data.error);

      return {
        success: false,
        deviceId: device.id,
        invalidToken: isInvalidToken,
      };
    }

    return { success: true, deviceId: device.id };
  } catch (error) {
    console.error(`Network error sending to device ${device.id}:`, error);
    return { success: false, deviceId: device.id };
  }
}
```

## Database Trigger: Request Status Changes

### Purpose
Automatically send notifications when `worker_requests` status changes.

### Implementation

```sql
-- Create notification trigger function
CREATE OR REPLACE FUNCTION public.notify_request_status_change()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
DECLARE
  v_requester_name text;
  v_request_type text;
  v_notification_type text;
  v_title text;
  v_body text;
  v_deep_link text;
BEGIN
  -- Only trigger on status changes
  IF OLD.status IS NOT DISTINCT FROM NEW.status THEN
    RETURN NEW;
  END IF;

  -- Get requester info
  SELECT COALESCE(p.name, '') || ' ' || COALESCE(p.surname, '')
  INTO v_requester_name
  FROM public.profiles p
  WHERE p.id = NEW.user_id;

  -- Get request type name
  SELECT name INTO v_request_type
  FROM public.worker_request_types
  WHERE id = NEW.request_type_id;

  v_deep_link := '/activities';

  -- Determine notification based on new status
  CASE NEW.status
    WHEN 'approved' THEN
      v_notification_type := 'request_approved';
      v_title := 'Request Approved';
      v_body := 'Your ' || COALESCE(v_request_type, 'request') || ' has been approved';

      -- Notify the requester
      PERFORM public.queue_notification(
        NEW.user_id,
        'monolite-hr',
        v_title,
        v_body,
        v_notification_type,
        'worker_request',
        NEW.id,
        v_deep_link
      );

    WHEN 'rejected' THEN
      v_notification_type := 'request_rejected';
      v_title := 'Request Not Approved';
      v_body := 'Your ' || COALESCE(v_request_type, 'request') || ' was not approved';

      -- Notify the requester
      PERFORM public.queue_notification(
        NEW.user_id,
        'monolite-hr',
        v_title,
        v_body,
        v_notification_type,
        'worker_request',
        NEW.id,
        v_deep_link
      );

    WHEN 'pending' THEN
      -- Request submitted - could notify managers here
      -- For now, this is handled by batch notifications
      NULL;

    ELSE
      NULL;
  END CASE;

  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_request_status_notification ON public.worker_requests;

CREATE TRIGGER trigger_request_status_notification
  AFTER UPDATE OF status ON public.worker_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_request_status_change();
```

## Helper Function: Queue Notification

### Purpose
SQL wrapper to invoke the Edge Function via pg_net.

### Implementation

```sql
-- Helper function to queue a notification (calls Edge Function via pg_net)
CREATE OR REPLACE FUNCTION public.queue_notification(
  p_user_id uuid,
  p_app_id text,
  p_title text,
  p_body text,
  p_notification_type text,
  p_entity_type text DEFAULT NULL,
  p_entity_id uuid DEFAULT NULL,
  p_deep_link_path text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_project_url text;
  v_service_key text;
BEGIN
  -- Get secrets from vault
  SELECT decrypted_secret INTO v_project_url
  FROM vault.decrypted_secrets
  WHERE name = 'project_url';

  SELECT decrypted_secret INTO v_service_key
  FROM vault.decrypted_secrets
  WHERE name = 'service_role_key';

  -- Call Edge Function via pg_net
  PERFORM net.http_post(
    url := v_project_url || '/functions/v1/send-push-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || v_service_key
    ),
    body := jsonb_build_object(
      'user_id', p_user_id,
      'app_id', p_app_id,
      'title', p_title,
      'body', p_body,
      'notification_type', p_notification_type,
      'entity_type', p_entity_type,
      'entity_id', p_entity_id,
      'deep_link_path', p_deep_link_path
    )
  );
END;
$$;
```

## Scheduled Job: Document Expiry Check

### Purpose
Daily check for documents expiring within 30 days.

### Implementation

```sql
-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Document expiry check function
CREATE OR REPLACE FUNCTION public.check_document_expiry()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_worker RECORD;
BEGIN
  -- Find workers with documents expiring in 30 days
  FOR v_worker IN
    SELECT DISTINCT
      ws.user_id,
      ws.expiring_documents_count,
      ws.next_expiry_date
    FROM public.v_worker_statistics ws
    WHERE ws.expiring_documents_count > 0
      AND ws.next_expiry_date <= (CURRENT_DATE + INTERVAL '30 days')
      AND ws.next_expiry_date > CURRENT_DATE
  LOOP
    PERFORM public.queue_notification(
      v_worker.user_id,
      'monolite-hr',
      'Document Expiring Soon',
      format('You have %s document(s) expiring. Next expiry: %s',
        v_worker.expiring_documents_count,
        to_char(v_worker.next_expiry_date, 'DD/MM/YYYY')
      ),
      'document_expiring',
      NULL,
      NULL,
      '/settings'
    );
  END LOOP;
END;
$$;

-- Schedule daily at 8 AM UTC
SELECT cron.schedule(
  'check-document-expiry',
  '0 8 * * *',
  $$SELECT public.check_document_expiry();$$
);
```

## Scheduled Job: Manager Batch Notifications

### Purpose
Process queued manager batch notifications at their configured time.

### Implementation

```sql
-- Process batch notifications function
CREATE OR REPLACE FUNCTION public.process_batch_notifications()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_queue_item RECORD;
  v_title text;
  v_body text;
  v_parts text[];
BEGIN
  FOR v_queue_item IN
    SELECT bq.*
    FROM public.notification_batch_queue bq
    WHERE bq.processed_at IS NULL
      AND bq.scheduled_for <= NOW()
  LOOP
    -- Build summary message
    v_parts := ARRAY[]::text[];

    IF v_queue_item.pending_requests_count > 0 THEN
      v_parts := array_append(v_parts,
        v_queue_item.pending_requests_count || ' pending request(s)');
    END IF;

    IF v_queue_item.expiring_documents_count > 0 THEN
      v_parts := array_append(v_parts,
        v_queue_item.expiring_documents_count || ' expiring document(s)');
    END IF;

    IF array_length(v_parts, 1) > 0 THEN
      v_title := 'Daily Summary';
      v_body := array_to_string(v_parts, ', ');

      PERFORM public.queue_notification(
        v_queue_item.manager_user_id,
        v_queue_item.app_id,
        v_title,
        v_body,
        'batch_summary',
        NULL,
        NULL,
        '/activities'
      );
    END IF;

    -- Mark as processed
    UPDATE public.notification_batch_queue
    SET processed_at = NOW()
    WHERE id = v_queue_item.id;
  END LOOP;
END;
$$;

-- Schedule every minute to check for batch notifications
SELECT cron.schedule(
  'process-batch-notifications',
  '* * * * *',
  $$SELECT public.process_batch_notifications();$$
);

-- Function to queue daily batch for managers
CREATE OR REPLACE FUNCTION public.queue_manager_batch_notifications()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_manager RECORD;
  v_scheduled_time timestamp with time zone;
BEGIN
  -- Find managers with batch notifications enabled
  FOR v_manager IN
    SELECT
      np.user_id,
      np.app_id,
      np.batch_notification_time,
      np.batch_notification_timezone,
      uc.company_id
    FROM public.notification_preferences np
    JOIN public.user_companies uc ON uc.user_id = np.user_id
    WHERE np.batch_notifications_enabled = true
  LOOP
    -- Calculate scheduled time for today in manager's timezone
    v_scheduled_time := (
      CURRENT_DATE::text || ' ' || v_manager.batch_notification_time::text
    )::timestamp AT TIME ZONE v_manager.batch_notification_timezone;

    -- Only queue if time hasn't passed today
    IF v_scheduled_time > NOW() THEN
      -- Get pending counts
      INSERT INTO public.notification_batch_queue (
        manager_user_id,
        company_id,
        app_id,
        pending_requests_count,
        pending_leave_requests,
        pending_material_requests,
        scheduled_for
      )
      SELECT
        v_manager.user_id,
        v_manager.company_id,
        v_manager.app_id,
        COUNT(*) FILTER (WHERE wr.status = 'pending'),
        COUNT(*) FILTER (WHERE wr.status = 'pending' AND wrt.is_leave_type = true),
        COUNT(*) FILTER (WHERE wr.status = 'pending' AND wrt.is_material_type = true),
        v_scheduled_time
      FROM public.worker_requests wr
      JOIN public.worker_request_types wrt ON wrt.id = wr.request_type_id
      WHERE wr.company_id = v_manager.company_id
      ON CONFLICT (manager_user_id, app_id, scheduled_for) DO UPDATE
        SET pending_requests_count = EXCLUDED.pending_requests_count,
            pending_leave_requests = EXCLUDED.pending_leave_requests,
            pending_material_requests = EXCLUDED.pending_material_requests;
    END IF;
  END LOOP;
END;
$$;

-- Schedule daily at midnight to queue batch notifications
SELECT cron.schedule(
  'queue-manager-batches',
  '0 0 * * *',
  $$SELECT public.queue_manager_batch_notifications();$$
);
```

## Vault Secrets Setup

Required secrets in Supabase Vault:

```sql
-- Store project URL
SELECT vault.create_secret('https://mnyytgyfzuntoyhombjp.supabase.co', 'project_url');

-- Store service role key (get from Supabase dashboard)
SELECT vault.create_secret('your-service-role-key', 'service_role_key');
```

For Edge Function environment variables (set in Supabase dashboard):
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `FIREBASE_SERVICE_ACCOUNT`: Full service account JSON string

## Deployment

```bash
# Deploy Edge Function
supabase functions deploy send-push-notification --no-verify-jwt

# Note: --no-verify-jwt because this function is called by database triggers
# with service role key, not user JWTs
```

## Testing

### Test Edge Function directly:

```bash
curl -X POST 'https://mnyytgyfzuntoyhombjp.supabase.co/functions/v1/send-push-notification' \
  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "user_id": "test-user-uuid",
    "app_id": "monolite-hr",
    "title": "Test Notification",
    "body": "This is a test",
    "notification_type": "announcement"
  }'
```

### Test database trigger:

```sql
-- Update a request status to trigger notification
UPDATE worker_requests
SET status = 'approved'
WHERE id = 'some-request-uuid';

-- Check notifications table
SELECT * FROM notifications ORDER BY created_at DESC LIMIT 5;
```
