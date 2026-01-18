# Technical Milestone: Apple Sign-In for iOS

> **Status**: IN PROGRESS
> **Domain**: system
> **Platform**: iOS
> **Estimated Effort**: 4-6 hours
> **Created**: 2026-01-18
> **Last Updated**: 2026-01-18

## Overview

Implement native Apple Sign-In for iOS using `@invertase/react-native-apple-authentication` library, integrating with existing Supabase authentication flow.

### Feature Reference
- **Business Requirements**: [plans/features/system/apple-sign-in.md](../../features/system/apple-sign-in.md)

### Technical Goals
- Implement native iOS Apple Sign-In flow
- Exchange Apple identity token with Supabase
- Handle user profile creation with Apple-provided data
- Maintain consistency with existing auth patterns

## Architecture Overview

### High-Level Design

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│  iOS App        │────>│  Apple Auth      │────>│  Apple ID   │
│  (RN + Native)  │     │  (Native SDK)    │     │  Servers    │
└────────┬────────┘     └──────────────────┘     └─────────────┘
         │
         │ identityToken
         ▼
┌─────────────────┐     ┌──────────────────┐
│  Supabase       │────>│  Token           │
│  signInWithId   │     │  Validation      │
│  Token()        │     │  (Apple JWKS)    │
└────────┬────────┘     └──────────────────┘
         │
         │ session
         ▼
┌─────────────────┐
│  App Navigation │
│  (Main/Pending) │
└─────────────────┘
```

### Components Affected
- **Frontend**: Auth.tsx (handleAppleSignIn function)
- **iOS Native**: Entitlements, Xcode capabilities
- **Backend**: Supabase Apple provider (dashboard config)

### Technology Stack
- Library: @invertase/react-native-apple-authentication
- Auth: Supabase signInWithIdToken API
- Platform: iOS 13+

## Implementation Steps

### Step 1: Apple Developer Console Setup (Manual) ✅
Pre-requisite completed by user.

### Step 2: Supabase Dashboard Configuration (Manual)
1. Go to Supabase Dashboard > Authentication > Providers
2. Enable Apple provider
3. Add iOS Bundle ID to **Client IDs** field (e.g., `com.monolitehrnative`)
4. For native iOS flow, you do NOT need:
   - Services ID
   - Secret Key (no 6-month rotation required!)
   - Team ID
5. Save the configuration

### Step 3: Install Dependencies

```bash
npm install @invertase/react-native-apple-authentication
cd ios && pod install
```

### Step 4: iOS Configuration

**Update MonoliteHRNative.entitlements:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>aps-environment</key>
  <string>development</string>
  <key>com.apple.developer.applesignin</key>
  <array>
    <string>Default</string>
  </array>
</dict>
</plist>
```

### Step 5: Update Auth.tsx

Import and implement the native Apple Sign-In flow using `@invertase/react-native-apple-authentication`.

### Step 6: Add i18n Translations

Add translations for Apple Sign-In messages in both English and Italian.

## Files to Modify

| File | Changes |
|------|---------|
| package.json | Add @invertase/react-native-apple-authentication |
| ios/Podfile.lock | Updated after pod install |
| ios/MonoliteHRNative/MonoliteHRNative.entitlements | Add Sign in with Apple entitlement |
| src/pages/Auth.tsx | Update handleAppleSignIn function |
| src/i18n/locales/en.json | Add Apple Sign-In translations |
| src/i18n/locales/it.json | Add Apple Sign-In translations |

## Security Considerations

- Apple identity tokens are validated server-side by Supabase using Apple's JWKS
- No client secret stored in app (native flow doesn't require it)
- User data from Apple is only available on first sign-in and must be captured immediately

## Testing Strategy

### Manual Testing Checklist

**iOS Simulator (Limited):**
- [ ] Apple Sign-In button appears
- [ ] Tapping shows error (simulator doesn't support Apple Sign-In)

**Physical iOS Device (Required):**
- [ ] Apple Sign-In sheet appears with Face ID/Touch ID
- [ ] Successful sign-in creates Supabase session
- [ ] User profile populated with Apple data
- [ ] Subsequent sign-ins work (returning user)
- [ ] Cancel action returns to Auth screen silently
- [ ] Network error shows appropriate toast
- [ ] Company check routes to correct screen

## Rollback Plan

1. Remove @invertase/react-native-apple-authentication from package.json
2. Run npm install and pod install
3. Revert Auth.tsx handleAppleSignIn to toast placeholder
4. Remove Sign in with Apple entitlement
5. Rebuild iOS app

---

**Next Step**: Implement the code changes as specified above.
