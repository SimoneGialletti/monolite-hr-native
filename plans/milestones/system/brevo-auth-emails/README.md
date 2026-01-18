# Technical Milestone: Brevo Auth Emails

> **Status**: APPROVED
> **Domain**: system
> **Sprint/Milestone**: Auth Enhancement
> **Estimated Effort**: 2-3 hours
> **Platform**: Both (iOS & Android)
> **Created**: 2026-01-18
> **Last Updated**: 2026-01-18

## Overview

Implement a Supabase Edge Function that handles the **Send Email Auth Hook** to send all authentication-related emails (signup confirmation, password reset, magic links) via Brevo instead of Supabase's built-in SMTP. This bypasses rate limits and ensures consistent email delivery.

### Feature Reference
- **Business Requirements**: [plans/features/system/brevo-auth-emails.md](../../../features/system/brevo-auth-emails.md)

### Technical Goals
- Create `send-auth-email` Edge Function to handle Supabase Auth email hooks
- Support bilingual email templates (English/Italian)
- Use deep links (`monolite-hr://auth/callback`) for mobile app integration
- Verify webhook signatures for security

### Implementation Status

See [STATUS.md](STATUS.md) for detailed implementation progress.

## Architecture Overview

### High-Level Design

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Supabase Auth  │────>│  send-auth-email │────>│    Brevo API    │
│  (Auth Hook)    │     │  (Edge Function) │     │  (SMTP Email)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                        │
        │ Triggers on:           │ Sends:
        │ - signup               │ - Confirmation email
        │ - recovery             │ - Recovery email
        │ - magiclink            │ - Magic link email
        │ - email_change         │ - Email change email
        └────────────────────────┘
```

### Components Affected
- **Backend**: New Edge Function `send-auth-email`
- **Dashboard**: Auth Hooks configuration (manual step)

### Technology Stack
- Backend: Supabase Edge Functions (Deno)
- Email Service: Brevo SMTP API
- Webhook Verification: standardwebhooks library

## Edge Function Implementation

### Function: `send-auth-email`

**Purpose**: Handle Supabase Auth's Send Email Hook to send emails via Brevo

**Trigger**: Supabase Auth Hook (HTTP POST)

**Location**: Deployed via Supabase MCP

**Input (Webhook Payload)**:
```typescript
interface AuthHookPayload {
  user: {
    id: string;
    email: string;
    user_metadata: {
      name?: string;
      surname?: string;
      i18n?: string;
      language?: string;
    };
  };
  email_data: {
    token: string;           // OTP code (6 digits)
    token_hash: string;      // For URL verification
    redirect_to: string;     // Redirect after verification
    email_action_type: 'signup' | 'recovery' | 'magiclink' | 'email_change' | 'invite' | 'reauthentication';
    site_url: string;
  };
}
```

**Output**: Empty 200 response on success

**Environment Variables Required**:
- `BREVO_API_KEY` - Already configured
- `BREVO_SENDER_EMAIL` - Already configured
- `BREVO_SENDER_NAME` - Already configured
- `SEND_EMAIL_HOOK_SECRET` - New (generate in Dashboard)

### Email Types Supported

| Type | Description | Template |
|------|-------------|----------|
| `signup` | Email confirmation for new signups | Welcome + Confirm button |
| `recovery` | Password reset | Reset Password button |
| `magiclink` | Passwordless login | Login button |
| `email_change` | Email change confirmation | Confirm Change button |

### Confirmation URL Format

The confirmation URL uses the app's deep link scheme:

```
monolite-hr://auth/callback?token_hash={token_hash}&type={email_action_type}&redirect_to={redirect_to}
```

This ensures clicking the email button opens the app directly.

## Email Templates

### English Templates

**Signup Confirmation**:
- Subject: "Confirm Your Email - Monolite HR"
- CTA: "Confirm Email"
- Includes OTP code as backup

**Password Recovery**:
- Subject: "Reset Your Password - Monolite HR"
- CTA: "Reset Password"
- 24-hour expiry notice

### Italian Templates

**Signup Confirmation**:
- Subject: "Conferma la tua Email - Monolite HR"
- CTA: "Conferma Email"

**Password Recovery**:
- Subject: "Reimposta la tua Password - Monolite HR"
- CTA: "Reimposta Password"

## Implementation Steps

### Phase 1: Edge Function Development
1. [x] Create `send-auth-email` edge function code
2. [x] Implement webhook signature verification
3. [x] Implement language detection from user_metadata
4. [x] Create bilingual email templates (en/it)
5. [x] Implement Brevo API integration
6. [x] Handle all email action types

### Phase 2: Deployment
1. [ ] Deploy edge function via MCP (`verify_jwt: false`)
2. [ ] Set `SEND_EMAIL_HOOK_SECRET` environment variable

### Phase 3: Dashboard Configuration
1. [ ] Go to Supabase Dashboard > Authentication > Hooks
2. [ ] Enable "Send Email" hook
3. [ ] Set hook URL to edge function endpoint
4. [ ] Generate hook secret and save to environment

### Phase 4: Testing
1. [ ] Test signup flow with new email
2. [ ] Verify email arrives via Brevo
3. [ ] Click confirmation link and verify app opens
4. [ ] Test password reset flow
5. [ ] Test with Italian language user

## Security Considerations

### Webhook Signature Verification
```typescript
import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";

const hookSecret = Deno.env.get("SEND_EMAIL_HOOK_SECRET")!.replace("v1,whsec_", "");
const wh = new Webhook(hookSecret);
const payload = wh.verify(rawBody, headers);
```

### Authentication
- Edge function must have `verify_jwt: false` (called internally by Supabase Auth)
- Security is provided by webhook signature verification instead

### Data Privacy
- No sensitive data logged
- API keys never exposed in responses
- User email only used for sending

## Error Handling

### Error Responses

| Status | Condition | Response |
|--------|-----------|----------|
| 200 | Success | Empty body |
| 400 | Missing required fields | `{ error: "..." }` |
| 401 | Invalid webhook signature | `{ error: "Invalid signature" }` |
| 500 | Brevo API error | `{ error: "Failed to send email", details: "..." }` |
| 500 | Missing BREVO_API_KEY | `{ error: "Email service not configured" }` |

## Deployment Checklist

### Pre-Deployment
- [x] Code review completed
- [x] Email templates tested for formatting
- [x] Deep link URL format verified

### Deployment Steps
1. [ ] Deploy edge function: `mcp__supabase__deploy_edge_function`
2. [ ] Generate `SEND_EMAIL_HOOK_SECRET` in Supabase Dashboard
3. [ ] Set secret: `supabase secrets set SEND_EMAIL_HOOK_SECRET=...`
4. [ ] Configure Auth Hook in Dashboard

### Post-Deployment
- [ ] Test signup with new email
- [ ] Verify Brevo delivery logs
- [ ] Monitor Supabase Auth logs for errors

## Verification Steps

1. **Create new account** with a fresh email
2. **Check Brevo dashboard** for sent email
3. **Check inbox** for confirmation email
4. **Click confirmation link** in email
5. **Verify app opens** and navigates to EmailConfirmed
6. **Test password reset** flow similarly

## Related Files

- Edge Function (to deploy): See `02-backend-functions.md`
- Existing reference: `send-invitation-email` edge function
- Existing reference: `send-password-reset-email` edge function

---

**Next Step**: Deploy the edge function using `mcp__supabase__deploy_edge_function`
