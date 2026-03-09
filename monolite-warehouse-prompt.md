# Monolite Warehouse — Implementation Prompt

This prompt describes features to replicate from the **Monolite HR Native** app into **Monolite Warehouse**. All features should follow the same tech stack: React Native, React Navigation, Supabase, react-i18next, react-native-reanimated.

Company name: **Monolite S.R.L.** — contact email: **info@monoliteai.com**

---

## 1. Left Sidebar Drawer (Hamburger Menu)

Implement a left-sliding sidebar drawer accessible from the app bar's hamburger menu icon. The sidebar should be a `Modal` with animated backdrop and drawer, using `react-native-reanimated`.

### Layout (top to bottom)

1. **User Profile Section**
   - Circular avatar (60x60px) with gold background showing user's initials (first letter of name + first letter of surname)
   - Full name (name + surname from `user.user_metadata`)
   - Email address (from `user.email`)

2. **Divider**

3. **Navigation Links**
   - Home (icon: `home`)
   - Settings (icon: `cog`)

4. **Divider**

5. **Companies Section**
   - Section title: "Companies" / "Aziende"
   - List of user's companies (from `useUserCompany` hook) with `office-building` icon and gold color
   - If no companies: italic "No companies yet" / "Nessuna azienda ancora"
   - "Create Company" button (icon: `plus-circle-outline`, gold color) that opens external URL: `https://monolite-building.lovable.app/`
   - External link icon (`open-in-new`, 14px) next to "Create Company"

6. **Divider**

7. **Language Section**
   - Section title: "Language" / "Lingua"
   - `<LanguageSwitcher />` component

8. **Divider**

9. **Legal Links**
   - Privacy Policy (icon: `shield-lock-outline`) → navigates to `'PrivacyPolicy'` screen
   - Terms & Conditions (icon: `file-document-outline`) → navigates to `'TermsAndConditions'` screen

10. **Divider**

11. **Logout Button**
    - Centered, with destructive styling (red border, red text, red icon)
    - Icon: `logout`
    - Calls `supabase.auth.signOut()` then navigates to `'Auth'`

### Animation

- Drawer width: **82% of screen width**
- Position: absolute, top-left-bottom
- Background: `colors.card` with shadow (elevation 16)
- **Opening**: drawer translateX from `-DRAWER_WIDTH` to `0` (280ms), backdrop opacity from `0` to `1` (250ms)
- **Closing**: drawer translateX to `-DRAWER_WIDTH` (220ms), backdrop opacity to `0` (200ms)
- Backdrop: `rgba(0, 0, 0, 0.6)`, pressable to close

### Hooks Required

- `useAuth()` → provides `user` (with `user_metadata.name`, `user_metadata.surname`, `email`)
- `useUserCompany()` → provides `{ companies, hasCompany, loading, refresh }`
  - Queries `user_companies` table joined with `companies` for company name
  - Returns `companies` array with: `id`, `company_id`, `company_name`, `role_id`
  - `hasCompany = companies.length > 0`
- `useNotifications()` → provides `unreadCount` for notification badge
- `useTranslation()` for i18n

### i18n Keys

```json
{
  "sidebar": {
    "home": "Home",
    "settings": "Settings",
    "companies": "Companies",
    "noCompanies": "No companies yet",
    "createCompany": "Create Company",
    "privacyPolicy": "Privacy Policy",
    "termsAndConditions": "Terms & Conditions"
  },
  "settings": {
    "language": "Language"
  },
  "profile": {
    "logout": "Logout"
  }
}
```

Italian:
```json
{
  "sidebar": {
    "home": "Home",
    "settings": "Impostazioni",
    "companies": "Aziende",
    "noCompanies": "Nessuna azienda ancora",
    "createCompany": "Crea Azienda",
    "privacyPolicy": "Informativa sulla Privacy",
    "termsAndConditions": "Termini e Condizioni"
  },
  "settings": {
    "language": "Lingua"
  },
  "profile": {
    "logout": "Esci"
  }
}
```

---

## 2. Privacy Policy Page

Create a full GDPR-compliant Privacy Policy page for **Monolite S.R.L.** (contact: **info@monoliteai.com**).

### Structure

- **Bilingual**: Render content conditionally based on `i18n.language === 'it'`
- **Layout**: SafeAreaView → Back button header → Card with ScrollView
- **Reusable sub-components**: `<Section title="">` and `<BulletPoint>` for consistent formatting

### Sections (16 total)

1. Introduction
2. Information We Collect (personal data, usage data, device data)
3. How We Use Your Information
4. Legal Basis for Processing (GDPR Art. 6)
5. Data Retention
6. Data Sharing and Third Parties (Supabase, push notification services)
7. International Data Transfers
8. Your Rights Under GDPR (access, rectification, erasure, restriction, portability, objection)
9. Children's Privacy
10. Data Security
11. Cookies and Similar Technologies
12. Push Notifications
13. Changes to This Privacy Policy
14. Data Protection Officer
15. Supervisory Authority (Italian Garante per la Protezione dei Dati Personali)
16. Contact Us (Monolite S.R.L., info@monoliteai.com)

### Navigation Registration

- Screen name: `'PrivacyPolicy'`
- Deep link path: `'privacy-policy'`
- Add to `RootStackParamList`: `PrivacyPolicy: undefined`
- Register in both authenticated and unauthenticated navigator stacks
- Accessible from: sidebar, AcceptInvitation page

---

## 3. Terms & Conditions Page

Create full Terms & Conditions for **Monolite S.R.L.** under Italian law.

### Structure

Same as Privacy Policy: bilingual, SafeAreaView, Card with ScrollView, `<Section>` and `<BulletPoint>` sub-components.

### Sections (20 total)

1. Introduction
2. Accounts
3. Intellectual Property
4. Service Description
5. User Obligations
6. Acceptable Use
7. Prohibited Uses
8. Data and Privacy (references GDPR and Italian Privacy Code D.Lgs. 196/2003)
9. Fees and Payment (currently free, with future change clause)
10. Service Availability and Modifications
11. Termination
12. Limitation of Liability
13. Disclaimer of Warranties
14. Employment Relationship (app does not create employment relationship with Monolite S.R.L.)
15. Indemnification
16. Governing Law (Italian law, courts of Milan)
17. Dispute Resolution (includes EU ODR platform reference)
18. Severability
19. Changes to Terms
20. Contact Us (Monolite S.R.L., info@monoliteai.com)

### Navigation Registration

- Screen name: `'TermsAndConditions'`
- Deep link path: `'terms-and-conditions'`
- Add to `RootStackParamList`: `TermsAndConditions: undefined`
- Same navigator registration as Privacy Policy

---

## 4. Invitation System

Allow existing company admins to invite users to join their company. New users can accept invitations either from the Home page (if already registered) or via a dedicated AcceptInvitation page (for new users).

### Database Schema

**Tables/Views required:**

- `user_invitations` — stores invitation records
  - `id`, `company_id`, `email`, `name`, `surname`, `role_id`, `invited_by`, `invitation_token`, `status` (pending/accepted/rejected), `accepted_at`, `rejected_at`, `expires_at`, `invited_at`, `worker_data` (JSONB), `user_id`

- `v_worker_invitations` — view for querying pending invitations
  - Joins invitation data with company names, role display names, inviter full name
  - Computed fields: `is_expired`, `computed_status`, `days_until_expiry`, `full_location_name`

- `user_companies` — user-company relationship
  - `id`, `user_id`, `company_id`, `role_id`, `work_areas` (array)

- `user_permission_overrides` — custom permissions per user
  - `user_id`, `company_id`, `permission_id`, `is_granted`

### usePendingInvitations Hook

```typescript
interface PendingInvitation {
  invitation_id: string;
  company_id: string;
  company_name: string;
  email: string;
  name: string;
  surname: string;
  role_id: string;
  role_display_name: string | null;
  invited_by_full_name: string | null;
  invited_at: string | null;
  expires_at: string | null;
  days_until_expiry: number | null;
  worker_data: Record<string, unknown> | null;
  custom_permissions: Record<string, unknown> | null;
}

// Hook returns:
{
  invitations: PendingInvitation[];
  loading: boolean;
  error: string | null;
  fetchInvitations: (userEmail: string, userId?: string) => Promise<PendingInvitation[]>;
  acceptInvitation: (invitation: PendingInvitation, userId: string) => Promise<boolean>;
  declineInvitation: (invitationId: string) => Promise<boolean>;
  processingId: string | null;
}
```

**fetchInvitations**: Query `v_worker_invitations` filtered by `is_expired = false`, `computed_status = pending`, `accepted_at = null`, `rejected_at = null`. Filter by email (case-insensitive) or user_id.

**acceptInvitation** (4 steps):
1. Update `user_invitations`: set `accepted_at`, `status = 'accepted'`, `user_id`
2. Insert into `user_companies`: `user_id`, `company_id`, `role_id`, empty `work_areas` array
3. If `custom_permissions` exists: upsert into `user_permission_overrides`
4. Remove from local state

**declineInvitation**:
1. Update `user_invitations`: set `rejected_at`, `status = 'rejected'`
2. Remove from local state

### Home Page — Invitations Card

- Shown when `invitations.length > 0`
- Gold-bordered Card with email icon header
- Each invitation shows: company name, role, invited by, days until expiry
- Accept button (gold, checkmark icon) and Decline button (muted, X icon)
- Loading spinner per invitation via `processingId`
- Fetch invitations on screen focus via `useFocusEffect`
- Toast notifications on accept/decline success

### AcceptInvitation Page (for new users via deep link)

- Route: `accept-invitation/:token?`
- Deep link: `monolite-warehouse://accept-invitation/TOKEN`
- Flow:
  1. Validate invitation token from route params
  2. Query `v_worker_invitations` by `invitation_token`
  3. Show invitation details (company, role, invited by, expiry)
  4. Registration form: email (disabled/prefilled), password, confirm password
  5. Checkboxes: Accept Terms & Conditions, Accept Privacy Policy (both link to respective pages)
  6. On submit: `supabase.auth.signUp()` with `user_metadata` from invitation
  7. Navigate to email confirmation screen

### i18n Keys

```json
{
  "invitationModal": {
    "title": "Pending Invitations",
    "company": "Company",
    "role": "Role",
    "invitedBy": "Invited by",
    "daysLeft": "{{count}} days left",
    "accept": "Accept",
    "decline": "Decline",
    "acceptSuccess": "Invitation accepted successfully!",
    "declineSuccess": "Invitation declined"
  },
  "acceptInvitation": {
    "title": "You're Invited!",
    "subtitle": "Complete your registration to join the company",
    "company": "Company",
    "role": "Role",
    "invitedBy": "Invited by",
    "expiresIn": "Expires in {{days}} days",
    "createAccount": "Create Account & Join",
    "alreadyHaveAccount": "Already have an account? Sign In"
  }
}
```

Italian:
```json
{
  "invitationModal": {
    "title": "Inviti in Attesa",
    "company": "Azienda",
    "role": "Ruolo",
    "invitedBy": "Invitato da",
    "daysLeft": "{{count}} giorni rimanenti",
    "accept": "Accetta",
    "decline": "Rifiuta",
    "acceptSuccess": "Invito accettato con successo!",
    "declineSuccess": "Invito rifiutato"
  },
  "acceptInvitation": {
    "title": "Sei Stato Invitato!",
    "subtitle": "Completa la registrazione per entrare nell'azienda",
    "company": "Azienda",
    "role": "Ruolo",
    "invitedBy": "Invitato da",
    "expiresIn": "Scade tra {{days}} giorni",
    "createAccount": "Crea Account e Unisciti",
    "alreadyHaveAccount": "Hai già un account? Accedi"
  }
}
```

---

## 5. No-Company Guard

Block users without a company from accessing certain features. Show an AlertDialog instead of navigating.

### Implementation

In the Home page, create a `navigateWithCompanyCheck()` function:

```typescript
const companyRequiredPaths = ['LogHours', 'MaterialRequest', 'LeaveRequest'];
// Adapt these paths to Monolite Warehouse features

const navigateWithCompanyCheck = (path: string, params?: any) => {
  if (companyLoading) return; // Don't navigate while loading
  if (companyRequiredPaths.includes(path) && !hasCompany) {
    setShowNoCompanyDialog(true);
    return;
  }
  navigation.navigate(path, params);
};
```

### AlertDialog

- Title: "Company Required" / "Azienda Richiesta"
- Message: "You need to be part of a company to use this feature. Create your own company or wait for an invitation."
- Two buttons:
  - **Close** (outline/cancel style) — dismisses dialog
  - **Create** (primary/action style) — opens `https://monolite-building.lovable.app/`

### Safety Net

In pages that require a company, also use `.maybeSingle()` instead of `.single()` when querying `user_companies` to avoid PGRST116 errors when no row exists. Add `if (!data) return;` after the query.

### i18n Keys

```json
{
  "noCompany": {
    "title": "Company Required",
    "message": "You need to be part of a company to use this feature. Create your own company or wait for an invitation.",
    "createCompany": "Create",
    "close": "Close"
  }
}
```

Italian:
```json
{
  "noCompany": {
    "title": "Azienda Richiesta",
    "message": "Devi far parte di un'azienda per utilizzare questa funzionalità. Crea la tua azienda o attendi un invito.",
    "createCompany": "Crea",
    "close": "Chiudi"
  }
}
```

---

## Design System Notes

- **Color scheme**: Dark theme with gold accent (`colors.gold`)
- **Icons**: `react-native-vector-icons/MaterialCommunityIcons`
- **Animations**: `react-native-reanimated` with `useAnimatedStyle`, `useSharedValue`, `withTiming`, `withSpring`
- **Navigation**: `@react-navigation/native` with native stack + JS-based stack (for form screens on Android)
- **Auth**: Supabase Auth with email/password, Apple Sign-In, deep links
- **i18n**: `react-i18next` with JSON locale files, bilingual content rendering for legal pages
- **Safe areas**: `react-native-safe-area-context`
- **Blur**: `@react-native-community/blur` for app bar
- **Toasts**: `react-native-toast-message`
