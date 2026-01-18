# Module 1: Database Schema

> **Phase**: 1 of 6
> **Status**: Not Started
> **Dependencies**: None

## Overview

This module defines all database changes required for the push notification system, including table modifications, new tables, RLS policies, and indexes.

## Tables

### 1.1 Modify `user_devices` Table

Add columns for FCM support and multi-app routing:

```sql
-- Migration: add_fcm_support_to_user_devices
ALTER TABLE public.user_devices
  ADD COLUMN IF NOT EXISTS app_id text NOT NULL DEFAULT 'monolite-hr',
  ADD COLUMN IF NOT EXISTS fcm_token text,
  ADD COLUMN IF NOT EXISTS platform text CHECK (platform IN ('ios', 'android')),
  ADD COLUMN IF NOT EXISTS push_enabled boolean DEFAULT true;

-- Add unique constraint for user + device + app combination
ALTER TABLE public.user_devices
  ADD CONSTRAINT unique_user_device_app UNIQUE (user_id, device_uuid, app_id);

-- Index for efficient FCM token lookups
CREATE INDEX IF NOT EXISTS idx_user_devices_fcm_token
  ON public.user_devices(fcm_token)
  WHERE fcm_token IS NOT NULL;

-- Index for user + app lookups
CREATE INDEX IF NOT EXISTS idx_user_devices_user_app
  ON public.user_devices(user_id, app_id)
  WHERE push_enabled = true;

-- Comment for deprecation notice
COMMENT ON COLUMN public.user_devices.onesignal_player_id IS
  'DEPRECATED: Use fcm_token instead. Will be removed in future migration.';
```

### 1.2 Create `notifications` Table

Core table for notification storage and history:

```sql
-- Migration: create_notifications_table
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  app_id text NOT NULL DEFAULT 'monolite-hr',

  -- Notification content
  title text NOT NULL,
  body text NOT NULL,

  -- Categorization
  notification_type text NOT NULL CHECK (notification_type IN (
    'request_submitted',
    'request_approved',
    'request_rejected',
    'announcement',
    'document_expiring',
    'document_expired',
    'invitation',
    'batch_summary'
  )),

  -- Deep linking
  entity_type text,
  entity_id uuid,
  deep_link_path text,

  -- Status tracking
  read_at timestamp with time zone,
  dismissed_at timestamp with time zone,

  -- Push delivery tracking
  push_sent_at timestamp with time zone,
  push_delivered_at timestamp with time zone,
  push_error text,

  -- Metadata
  metadata jsonb DEFAULT '{}',
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),

  -- Timestamps
  created_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone,

  -- Constraints
  CONSTRAINT valid_entity CHECK (
    (entity_type IS NULL AND entity_id IS NULL) OR
    (entity_type IS NOT NULL AND entity_id IS NOT NULL)
  )
);

-- Indexes
CREATE INDEX idx_notifications_user_unread
  ON public.notifications(user_id, created_at DESC)
  WHERE read_at IS NULL AND dismissed_at IS NULL;

CREATE INDEX idx_notifications_user_app
  ON public.notifications(user_id, app_id, created_at DESC);

CREATE INDEX idx_notifications_entity
  ON public.notifications(entity_type, entity_id);

CREATE INDEX idx_notifications_type
  ON public.notifications(notification_type);

CREATE INDEX idx_notifications_pending_push
  ON public.notifications(created_at)
  WHERE push_sent_at IS NULL;
```

### 1.3 Create `notification_preferences` Table

User notification settings per app:

```sql
-- Migration: create_notification_preferences_table
CREATE TABLE public.notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  app_id text NOT NULL DEFAULT 'monolite-hr',

  -- Global settings
  push_enabled boolean DEFAULT true,
  email_enabled boolean DEFAULT false,
  quiet_hours_start time,
  quiet_hours_end time,

  -- Per-type settings
  notify_request_submitted boolean DEFAULT true,
  notify_request_approved boolean DEFAULT true,
  notify_request_rejected boolean DEFAULT true,
  notify_announcements boolean DEFAULT true,
  notify_document_expiring boolean DEFAULT true,
  notify_document_expired boolean DEFAULT true,

  -- Manager-specific settings
  batch_notifications_enabled boolean DEFAULT false,
  batch_notification_time time DEFAULT '08:00',
  batch_notification_timezone text DEFAULT 'Europe/Rome',

  -- Timestamps
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),

  CONSTRAINT unique_user_app_prefs UNIQUE (user_id, app_id)
);

-- Index for preferences lookup
CREATE INDEX idx_notification_prefs_user_app
  ON public.notification_preferences(user_id, app_id);

-- Index for batch notification scheduling
CREATE INDEX idx_notification_prefs_batch
  ON public.notification_preferences(batch_notification_time)
  WHERE batch_notifications_enabled = true;
```

### 1.4 Create `notification_batch_queue` Table

Queue for manager daily batch notifications:

```sql
-- Migration: create_notification_batch_queue_table
CREATE TABLE public.notification_batch_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  app_id text NOT NULL DEFAULT 'monolite-hr',

  -- Aggregated data
  pending_requests_count integer DEFAULT 0,
  pending_leave_requests integer DEFAULT 0,
  pending_material_requests integer DEFAULT 0,
  expiring_documents_count integer DEFAULT 0,

  -- Scheduling
  scheduled_for timestamp with time zone NOT NULL,
  processed_at timestamp with time zone,

  -- Metadata
  summary_data jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),

  CONSTRAINT unique_manager_schedule UNIQUE (manager_user_id, app_id, scheduled_for)
);

-- Index for pending batch processing
CREATE INDEX idx_batch_queue_pending
  ON public.notification_batch_queue(scheduled_for)
  WHERE processed_at IS NULL;
```

## RLS Policies

### Notifications Table

```sql
-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON public.notifications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can update their own notifications (mark as read/dismissed)
CREATE POLICY "Users can update own notifications"
  ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Only service role can insert (via Edge Function)
CREATE POLICY "Service role can insert notifications"
  ON public.notifications
  FOR INSERT
  TO service_role
  WITH CHECK (true);
```

### Notification Preferences Table

```sql
-- Enable RLS
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- Users can view their own preferences
CREATE POLICY "Users can view own preferences"
  ON public.notification_preferences
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can insert their own preferences
CREATE POLICY "Users can insert own preferences"
  ON public.notification_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update their own preferences
CREATE POLICY "Users can update own preferences"
  ON public.notification_preferences
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
```

### User Devices Table (Update existing)

```sql
-- Ensure RLS is enabled
ALTER TABLE public.user_devices ENABLE ROW LEVEL SECURITY;

-- Users can view their own devices
CREATE POLICY "Users can view own devices"
  ON public.user_devices
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can insert their own devices
CREATE POLICY "Users can insert own devices"
  ON public.user_devices
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update their own devices
CREATE POLICY "Users can update own devices"
  ON public.user_devices
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can delete their own devices
CREATE POLICY "Users can delete own devices"
  ON public.user_devices
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());
```

## Updated Timestamp Trigger

```sql
-- Create trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to notification_preferences
CREATE TRIGGER update_notification_preferences_updated_at
  BEFORE UPDATE ON public.notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
```

## Complete Migration Script

```sql
-- Migration: 20260116_push_notifications_schema
-- Description: Add push notification infrastructure

BEGIN;

-- 1. Modify user_devices table
ALTER TABLE public.user_devices
  ADD COLUMN IF NOT EXISTS app_id text NOT NULL DEFAULT 'monolite-hr',
  ADD COLUMN IF NOT EXISTS fcm_token text,
  ADD COLUMN IF NOT EXISTS platform text CHECK (platform IN ('ios', 'android')),
  ADD COLUMN IF NOT EXISTS push_enabled boolean DEFAULT true;

ALTER TABLE public.user_devices
  DROP CONSTRAINT IF EXISTS unique_user_device_app;

ALTER TABLE public.user_devices
  ADD CONSTRAINT unique_user_device_app UNIQUE (user_id, device_uuid, app_id);

CREATE INDEX IF NOT EXISTS idx_user_devices_fcm_token
  ON public.user_devices(fcm_token) WHERE fcm_token IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_user_devices_user_app
  ON public.user_devices(user_id, app_id) WHERE push_enabled = true;

-- 2. Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  app_id text NOT NULL DEFAULT 'monolite-hr',
  title text NOT NULL,
  body text NOT NULL,
  notification_type text NOT NULL CHECK (notification_type IN (
    'request_submitted', 'request_approved', 'request_rejected',
    'announcement', 'document_expiring', 'document_expired',
    'invitation', 'batch_summary'
  )),
  entity_type text,
  entity_id uuid,
  deep_link_path text,
  read_at timestamp with time zone,
  dismissed_at timestamp with time zone,
  push_sent_at timestamp with time zone,
  push_delivered_at timestamp with time zone,
  push_error text,
  metadata jsonb DEFAULT '{}',
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone,
  CONSTRAINT valid_entity CHECK (
    (entity_type IS NULL AND entity_id IS NULL) OR
    (entity_type IS NOT NULL AND entity_id IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
  ON public.notifications(user_id, created_at DESC)
  WHERE read_at IS NULL AND dismissed_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_notifications_user_app
  ON public.notifications(user_id, app_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_entity
  ON public.notifications(entity_type, entity_id);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- 3. Create notification_preferences table
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  app_id text NOT NULL DEFAULT 'monolite-hr',
  push_enabled boolean DEFAULT true,
  email_enabled boolean DEFAULT false,
  quiet_hours_start time,
  quiet_hours_end time,
  notify_request_submitted boolean DEFAULT true,
  notify_request_approved boolean DEFAULT true,
  notify_request_rejected boolean DEFAULT true,
  notify_announcements boolean DEFAULT true,
  notify_document_expiring boolean DEFAULT true,
  notify_document_expired boolean DEFAULT true,
  batch_notifications_enabled boolean DEFAULT false,
  batch_notification_time time DEFAULT '08:00',
  batch_notification_timezone text DEFAULT 'Europe/Rome',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT unique_user_app_prefs UNIQUE (user_id, app_id)
);

CREATE INDEX IF NOT EXISTS idx_notification_prefs_user_app
  ON public.notification_preferences(user_id, app_id);

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON public.notification_preferences FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own preferences"
  ON public.notification_preferences FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own preferences"
  ON public.notification_preferences FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- 4. Create notification_batch_queue table
CREATE TABLE IF NOT EXISTS public.notification_batch_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  app_id text NOT NULL DEFAULT 'monolite-hr',
  pending_requests_count integer DEFAULT 0,
  pending_leave_requests integer DEFAULT 0,
  pending_material_requests integer DEFAULT 0,
  expiring_documents_count integer DEFAULT 0,
  scheduled_for timestamp with time zone NOT NULL,
  processed_at timestamp with time zone,
  summary_data jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT unique_manager_schedule UNIQUE (manager_user_id, app_id, scheduled_for)
);

CREATE INDEX IF NOT EXISTS idx_batch_queue_pending
  ON public.notification_batch_queue(scheduled_for)
  WHERE processed_at IS NULL;

-- 5. Updated at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_notification_preferences_updated_at
  ON public.notification_preferences;

CREATE TRIGGER update_notification_preferences_updated_at
  BEFORE UPDATE ON public.notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

COMMIT;
```

## Verification Queries

After migration, run these to verify:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('notifications', 'notification_preferences', 'notification_batch_queue');

-- Check user_devices columns
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'user_devices' AND column_name IN ('app_id', 'fcm_token', 'platform', 'push_enabled');

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('notifications', 'notification_preferences', 'user_devices');

-- Check indexes
SELECT indexname FROM pg_indexes
WHERE tablename IN ('notifications', 'notification_preferences', 'user_devices')
AND indexname LIKE 'idx_%';
```

## Rollback Script

```sql
-- ROLLBACK: Remove push notification schema
BEGIN;

DROP TABLE IF EXISTS public.notification_batch_queue;
DROP TABLE IF EXISTS public.notification_preferences;
DROP TABLE IF EXISTS public.notifications;

ALTER TABLE public.user_devices
  DROP COLUMN IF EXISTS app_id,
  DROP COLUMN IF EXISTS fcm_token,
  DROP COLUMN IF EXISTS platform,
  DROP COLUMN IF EXISTS push_enabled;

DROP INDEX IF EXISTS idx_user_devices_fcm_token;
DROP INDEX IF EXISTS idx_user_devices_user_app;

COMMIT;
```
