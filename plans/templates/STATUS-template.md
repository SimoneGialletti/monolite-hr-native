# Implementation Status: [Feature Name]

> **Last Status Check**: YYYY-MM-DD
> **Overall Progress**: X%
> **Next Sprint Goal**: [Target milestone]

---

## Progress by Phase

### Phase 1: Database (X%)

**Status**: NOT_STARTED | IN_PROGRESS | COMPLETED | BLOCKED

#### Checklist
- [ ] Tables created with proper schemas
- [ ] Foreign key relationships configured
- [ ] Indexes added for performance
- [ ] RLS policies configured for security
- [ ] Views created for common queries
- [ ] Triggers implemented for automation
- [ ] Migration tested locally
- [ ] Migration applied to production

#### Progress Notes
[Any specific progress notes, discoveries, or issues encountered]

#### Blockers
- [ ] Blocker 1: [Description and resolution plan]

---

### Phase 2: Backend (X%)

**Status**: NOT_STARTED | IN_PROGRESS | COMPLETED | BLOCKED

#### Checklist
- [ ] Edge Functions created
- [ ] Edge Functions deployed to production
- [ ] Database functions implemented
- [ ] Database triggers configured
- [ ] Business logic tested
- [ ] API endpoints verified
- [ ] Error handling implemented
- [ ] Logging/monitoring added

#### Progress Notes
[Any specific progress notes, discoveries, or issues encountered]

#### Blockers
- [ ] Blocker 1: [Description and resolution plan]

---

### Phase 3: Frontend - React Native (X%)

**Status**: NOT_STARTED | IN_PROGRESS | COMPLETED | BLOCKED

#### Checklist
- [ ] TypeScript types generated from Supabase
- [ ] React Native hooks implemented (`src/hooks/`)
- [ ] Custom hooks tested
- [ ] UI components created (`src/components/ui/`)
- [ ] Screens built (`src/pages/`)
- [ ] Navigation routes added (`src/navigation/`)
- [ ] State management added (React Query)
- [ ] UI/UX polished with theme tokens
- [ ] Error handling with toast messages
- [ ] Loading states with animations
- [ ] iOS tested on simulator
- [ ] Android tested on emulator
- [ ] iOS tested on physical device
- [ ] Android tested on physical device

#### Progress Notes
[Any specific progress notes, discoveries, or issues encountered]

#### Blockers
- [ ] Blocker 1: [Description and resolution plan]

---

### Phase 4: Testing (X%)

**Status**: NOT_STARTED | IN_PROGRESS | COMPLETED | BLOCKED

#### Checklist
- [ ] Unit tests (backend Edge Functions)
- [ ] Unit tests (React Native hooks)
- [ ] Unit tests (React Native components)
- [ ] Integration tests (API via Supabase)
- [ ] Manual testing on iOS completed
- [ ] Manual testing on Android completed
- [ ] Performance testing (animations, list scrolling)
- [ ] Security testing
- [ ] Accessibility testing (VoiceOver/TalkBack)

#### Progress Notes
[Any specific progress notes, discoveries, or issues encountered]

#### Blockers
- [ ] Blocker 1: [Description and resolution plan]

---

## Next Actions

1. **[Priority]** [Specific next step with owner/timeline]
2. **[Priority]** [Specific next step with owner/timeline]
3. **[Priority]** [Specific next step with owner/timeline]

---

## Active Blockers Summary

| Phase | Blocker | Impact | Resolution Plan | ETA |
|-------|---------|--------|-----------------|-----|
| Database | [Description] | High/Med/Low | [Plan] | YYYY-MM-DD |
| Backend | [Description] | High/Med/Low | [Plan] | YYYY-MM-DD |

---

## Recent Updates

**YYYY-MM-DD**: [Brief update on what changed - use active voice]
- Phase X: [Specific change]
- Phase Y: [Specific change]

**YYYY-MM-DD**: [Brief update on what changed]
- Phase X: [Specific change]

---

## Files Implemented

### Database
- `supabase/migrations/YYYYMMDD_migration_name.sql` - [Description]

### Backend
- `supabase/functions/function-name/index.ts` - [Description]

### Frontend
- `src/hooks/useFeatureName.ts` - [Description]
- `src/components/ComponentName.tsx` - [Description]
- `src/pages/PageName.tsx` - [Description]

---

## How to Check Status

Run these commands to verify implementation:

```bash
# Check database
npx supabase db diff

# Check what tables/functions exist
# Use Claude with MCP: "list tables and functions for project [project-id]"

# Check frontend files
ls src/hooks/use*.ts
ls src/components/ui/[Feature]*.tsx
ls src/pages/[Feature]*.tsx

# Run TypeScript check
npx tsc --noEmit

# Run tests
npm test

# Build iOS (verify no build errors)
npx react-native run-ios

# Build Android (verify no build errors)
npx react-native run-android
```

Or ask Claude:
```
Check implementation status for @plans/milestones/[domain]/[feature-name]/STATUS.md
by comparing against:
1. Supabase database (use MCP tools)
2. Codebase (check hooks, components, screens)
3. iOS/Android builds

Update this STATUS.md file with current progress percentages.
```
