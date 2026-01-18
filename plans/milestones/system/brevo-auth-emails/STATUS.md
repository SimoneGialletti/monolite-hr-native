# Implementation Status: Brevo Auth Emails

> **Last Updated**: 2026-01-18
> **Overall Progress**: 0% (Not Started)

## Phase Summary

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Edge Function Development | Not Started | 0% |
| Phase 2: Deployment | Not Started | 0% |
| Phase 3: Dashboard Configuration | Not Started | 0% |
| Phase 4: Testing | Not Started | 0% |

## Detailed Progress

### Phase 1: Edge Function Development (0%)
- [ ] Create `send-auth-email` edge function code
- [ ] Implement webhook signature verification
- [ ] Implement language detection from user_metadata
- [ ] Create bilingual email templates (en/it)
- [ ] Implement Brevo API integration
- [ ] Handle all email action types

### Phase 2: Deployment (0%)
- [ ] Deploy edge function via MCP (`verify_jwt: false`)
- [ ] Set `SEND_EMAIL_HOOK_SECRET` environment variable

### Phase 3: Dashboard Configuration (0%)
- [ ] Enable "Send Email" hook in Supabase Dashboard
- [ ] Set hook URL to edge function endpoint
- [ ] Generate and save hook secret

### Phase 4: Testing (0%)
- [ ] Test signup flow with new email
- [ ] Verify email arrives via Brevo
- [ ] Click confirmation link and verify app opens
- [ ] Test password reset flow
- [ ] Test with Italian language user

## Notes

### Blockers
- None

### Decisions Made
- Using existing Brevo credentials (same as invitation emails)
- Deep link format: `monolite-hr://auth/callback?token_hash=...&type=...`
- Supporting English and Italian templates initially

### Open Questions
- None
