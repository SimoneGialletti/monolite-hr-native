# Feature: Apple Sign-In for iOS

> **Status**: ACTIVE
> **Domain**: system
> **Priority**: P1 (High)
> **Created**: 2026-01-18
> **Last Updated**: 2026-01-18

## Business Goal

Enable iOS users to sign in using their Apple ID, providing a seamless and trusted authentication experience that meets Apple's App Store requirements for apps offering third-party sign-in options.

### Success Metrics
- 100% of iOS users can successfully sign in with Apple ID
- Reduced sign-up friction (fewer form fields for Apple Sign-In users)
- Apple App Store compliance achieved

## Problem Statement

### Current State
- iOS app only supports email/password authentication
- Apple Sign-In button exists but shows "will be implemented soon" toast
- Users must manually enter all profile information during sign-up

### Desired State
- Native Apple Sign-In with one-tap authentication
- Automatic profile data population from Apple ID (name, email)
- Seamless session management with existing Supabase auth flow

## User Stories

### Primary Users
- **New Users**: First-time app users who prefer Apple ID sign-in
- **Existing Users**: May link Apple ID to existing account (future enhancement)

### Stories
1. As a **new user**, I want to **sign in with my Apple ID** so that **I can quickly access the app without creating a new password**
2. As a **privacy-conscious user**, I want to **use Hide My Email** so that **my real email stays private**
3. As a **returning user**, I want to **sign in with Face ID/Touch ID** so that **authentication is seamless**

## Business Rules & Constraints

### Rules
1. **First Sign-In Data**: Apple only provides full name on first sign-in; must capture and store immediately
2. **Email Options**: Users may choose "Hide My Email" which provides a relay address
3. **Session Management**: Apple Sign-In sessions follow same rules as email/password sessions

### Constraints
- **Platform**: iOS only (Android would require OAuth flow, out of scope)
- **iOS Version**: Requires iOS 13+ for Sign in with Apple
- **Apple Guidelines**: Must follow Apple Human Interface Guidelines for button styling

## Functional Requirements

### Must Have (MVP)
- [ ] Native Apple Sign-In button on Auth screen (iOS only)
- [ ] Token exchange with Supabase via signInWithIdToken
- [ ] User profile creation/update with Apple-provided data
- [ ] Session persistence and auto-refresh
- [ ] Error handling for cancelled/failed sign-in
- [ ] Company association check post-authentication

### Should Have (Phase 2)
- [ ] Link Apple ID to existing email account
- [ ] Sign out from Apple on app logout

### Nice to Have (Future)
- [ ] Android OAuth flow for Apple Sign-In
- [ ] Account deletion compliance (Apple requirement)

## User Flows

### Primary Flow: New User Apple Sign-In
1. User taps "Sign in with Apple" button
2. iOS presents Apple Sign-In sheet (Face ID/Touch ID/Password)
3. User chooses to share email (real or relay) and name
4. App receives identity token from Apple
5. App calls Supabase `signInWithIdToken` with Apple provider
6. Supabase validates token and creates/returns user session
7. App checks company association
8. User routed to Main or PendingInvitation screen

### Alternative Flow: Returning User
1. User taps "Sign in with Apple"
2. iOS authenticates with biometrics (no name/email prompt)
3. App receives identity token
4. Supabase returns existing user session
5. App routes to appropriate screen

## Edge Cases & Scenarios

### Scenario 1: User Cancels Apple Sign-In
- **Condition**: User taps cancel on Apple Sign-In sheet
- **Expected Behavior**: Return to Auth screen silently (no error toast)
- **Rationale**: User intentionally cancelled, not an error

### Scenario 2: Hide My Email Used
- **Condition**: User selects "Hide My Email" option
- **Expected Behavior**: Use relay email (@privaterelay.apple.com) for account
- **Rationale**: Respect user privacy choice

### Scenario 3: Name Not Provided (Returning User)
- **Condition**: Apple doesn't provide name on subsequent sign-ins
- **Expected Behavior**: Use existing profile data from database
- **Rationale**: Apple only sends name on first authorization

### Error Cases
- **Network Error**: Show toast "Connection failed, please try again"
- **Invalid Token**: Show toast "Authentication failed, please try again"
- **Supabase Error**: Show toast with error message from backend

## Data Requirements

### Input Data (from Apple)
- **identityToken**: JWT string, required for Supabase auth
- **fullName**: Object with givenName, familyName (first sign-in only)
- **email**: String, may be real or relay address
- **user**: Apple user identifier

### Output Data
- **Supabase Session**: access_token, refresh_token, user object
- **User Profile**: Created/updated in profiles table

## UI/UX Considerations (Mobile)

### Screens/Components Affected
- **Auth.tsx**: Update handleAppleSignIn to use native library

### Apple Sign-In Button Requirements
- Use Apple's official button styling (ASAuthorizationAppleIDButton)
- Support both light and dark modes
- Minimum 44pt touch target
- Full width to match other auth buttons

### Mobile-Specific UX
- **Gestures**: Standard tap interaction
- **Navigation**: Push to Main/PendingInvitation after success
- **Keyboard**: Not applicable (native sheet)
- **Offline**: Show error if no network connection

## Acceptance Criteria

### Functional Criteria
- [ ] When user taps Apple Sign-In on iOS, native Apple sheet appears
- [ ] When user completes Apple auth, session is created in Supabase
- [ ] When user is new, profile is created with Apple-provided data
- [ ] When user cancels, no error is shown
- [ ] Given successful auth, user is routed based on company association

### Non-Functional Criteria
- [ ] Performance: Auth completes within 3 seconds
- [ ] Security: Token validated server-side via Supabase
- [ ] Accessibility: VoiceOver announces "Sign in with Apple" button
- [ ] Platform Support: iOS 13+

## Dependencies

### Technical Dependencies
- @invertase/react-native-apple-authentication library
- Supabase Apple provider configuration
- Apple Developer account with Sign in with Apple capability

### External Dependencies
- Apple Developer Console configuration
- Supabase Dashboard Apple provider setup

## Out of Scope

- Android Apple Sign-In (requires OAuth flow)
- Linking Apple ID to existing email accounts
- Account deletion via Apple (future compliance)

## Related Documents

- Technical Spec: plans/milestones/system/apple-sign-in/README.md
- Design: Apple Human Interface Guidelines for Sign in with Apple

---

**Next Step**: Use this document as input to Claude to generate the technical milestone document in `plans/milestones/system/apple-sign-in/README.md`
