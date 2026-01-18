# Feature: Brevo Auth Emails (Custom Email Provider for Authentication)

> **Status**: ACTIVE
> **Domain**: system
> **Priority**: P1 (High)
> **Created**: 2026-01-18
> **Last Updated**: 2026-01-18

## Business Goal

Replace Supabase's built-in SMTP for authentication emails (signup confirmation, password reset, magic links) with Brevo to bypass rate limits and ensure reliable email delivery.

### Success Metrics
- 100% of signup confirmation emails delivered via Brevo
- No rate limit errors during signup flow
- Email delivery within 30 seconds of signup
- Consistent branding across all authentication emails

## Problem Statement

### Current State
- Supabase's built-in SMTP is hitting rate limits for signup confirmation emails
- Users cannot complete email verification due to rate limiting
- Invitation emails and password reset emails already work via Brevo (separate edge functions)
- Inconsistent email delivery experience

### Desired State
- All authentication emails sent via Brevo (same as invitations)
- No rate limit issues
- Consistent email templates with bilingual support (English/Italian)
- Reliable email delivery with proper deep linking to the app

## User Stories

### Primary Users
- **New User**: Person signing up for the first time
- **Existing User**: Person requesting password reset or email change

### Stories
1. As a **new user**, I want to receive a confirmation email quickly after signing up so that I can verify my email and start using the app
2. As a **new user**, I want the confirmation email to open the app directly when I click the link so that I don't have to manually navigate back to the app
3. As an **existing user**, I want password reset emails to match the same professional style as other emails so that I trust the email is legitimate
4. As an **Italian user**, I want to receive authentication emails in Italian so that I can understand them easily

## Business Rules & Constraints

### Rules
1. **Email Language Detection**: Emails should be sent in the user's preferred language (from user_metadata) or default to English
2. **Deep Link Format**: All confirmation links must use the `monolite-hr://` deep link scheme
3. **Branding Consistency**: All emails must match the existing Monolite HR email style

### Constraints
- **Technical**: Must use Supabase Auth Hooks (Send Email Hook) to intercept email sending
- **Technical**: Edge function must have `verify_jwt: false` since it's called by Supabase Auth internally
- **Security**: Webhook signature must be verified using `SEND_EMAIL_HOOK_SECRET`
- **Performance**: Email sending should not block the signup response

## Functional Requirements

### Must Have (MVP)
- [x] Create edge function `send-auth-email` that handles the Send Email Auth Hook
- [x] Support `signup` email type (confirmation email)
- [x] Support `recovery` email type (password reset)
- [x] Bilingual templates (English and Italian)
- [x] Deep links to app (`monolite-hr://auth/callback`)
- [x] Webhook signature verification

### Should Have (Phase 2)
- [ ] Support `magiclink` email type
- [ ] Support `email_change` email type
- [ ] Support `invite` email type (consolidate with existing function)
- [ ] Email delivery tracking/logging

### Nice to Have (Future)
- [ ] Email template management in database
- [ ] A/B testing for email subject lines
- [ ] Email analytics dashboard

## User Flows

### Primary Flow: New User Signup
1. User fills in signup form and submits
2. Supabase Auth creates user and triggers Send Email Hook
3. Edge function receives webhook with user data and token
4. Edge function sends confirmation email via Brevo
5. User receives email with "Confirm Email" button
6. User clicks button, app opens via deep link
7. App verifies token and shows EmailConfirmed screen

### Alternative Flow: Password Recovery
1. User requests password reset on signin screen
2. Supabase Auth triggers Send Email Hook
3. Edge function sends recovery email via Brevo
4. User receives email with "Reset Password" button
5. User clicks button, app opens via deep link
6. App shows password reset form

## Edge Cases & Scenarios

### Scenario 1: User Language Detection
- **Condition**: User has `i18n` or `language` in user_metadata
- **Expected Behavior**: Send email in that language
- **Rationale**: Personalized experience for international users

### Scenario 2: Unknown Language
- **Condition**: User language is not 'en' or 'it'
- **Expected Behavior**: Fall back to English
- **Rationale**: English is the default language

### Scenario 3: Brevo API Failure
- **Condition**: Brevo API returns an error
- **Expected Behavior**: Return error response to Supabase Auth
- **Rationale**: Supabase will retry or the user can request a new email

### Error Cases
- **Invalid Webhook Signature**: Return 401 Unauthorized
- **Missing BREVO_API_KEY**: Return 500 with "Email service not configured"
- **Invalid Request Body**: Return 400 Bad Request

## Data Requirements

### Input Data (Webhook Payload)
- **user**: User object with email, user_metadata
- **email_data.token**: OTP code (6 digits)
- **email_data.token_hash**: Token hash for URL verification
- **email_data.redirect_to**: Redirect URL after verification
- **email_data.email_action_type**: Type of email (signup, recovery, etc.)
- **email_data.site_url**: Site URL for constructing verification link

### Output Data
- No output required (empty 200 response indicates success)

### Data Sources
- Supabase Auth (webhook payload)
- Environment variables (BREVO_API_KEY, BREVO_SENDER_EMAIL, BREVO_SENDER_NAME)

## UI/UX Considerations (Mobile)

### Screens/Components Affected
- No UI changes required in the app
- Email templates should be mobile-friendly (responsive HTML)

### User Experience
- Email should arrive within 30 seconds
- Email should render correctly on mobile email clients
- CTA button should be large enough to tap on mobile
- Deep link should open the app directly

### Mobile-Specific UX
- **Deep Linking**: `monolite-hr://auth/callback` must be configured in both iOS and Android
- **Fallback**: If app is not installed, link should gracefully fail (no web fallback)

## Acceptance Criteria

### Functional Criteria
- [x] When a new user signs up, then they receive a confirmation email via Brevo within 30 seconds
- [x] Given the user's language is Italian, when they sign up, then the email is in Italian
- [x] When the user clicks the confirmation link, then the app opens and navigates to EmailConfirmed
- [x] When the user requests password reset, then they receive a recovery email via Brevo

### Non-Functional Criteria
- [x] Security: Webhook signature is verified before processing
- [x] Security: BREVO_API_KEY is never exposed in logs or responses
- [x] Performance: Email sending completes within 5 seconds
- [x] Reliability: Function returns proper error codes for debugging

## Dependencies

### Technical Dependencies
- Depends on: Supabase Auth Hooks feature
- Depends on: Brevo account with API access
- Depends on: Deep linking configured in iOS and Android

### External Dependencies
- Brevo SMTP API (https://api.brevo.com/v3/smtp/email)
- Supabase Auth Hook secret generation

## Assumptions

- Brevo API key is already configured (used by existing functions)
- Deep linking is already configured for `monolite-hr://` scheme
- User language preference may be stored in user_metadata

## Out of Scope

- Web-based email confirmation (only mobile app deep links)
- Custom email domains (using existing Brevo sender)
- Email unsubscribe functionality (transactional emails only)
- SMS-based verification

## Questions & Open Issues

- [x] Question 1: Should we consolidate existing `send-password-reset-email` into this function? **Answer**: Keep separate for now, can consolidate later
- [x] Question 2: How to handle users without a language preference? **Answer**: Default to English

## Related Documents

- Technical Spec: `plans/milestones/system/brevo-auth-emails/README.md`
- Existing Edge Function: `send-invitation-email`
- Existing Edge Function: `send-password-reset-email`
- Supabase Docs: https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook

---

**Next Step**: Use this document as input to Claude to generate the technical milestone document in `plans/milestones/system/brevo-auth-emails/`
