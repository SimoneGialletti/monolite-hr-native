# Technical Milestone: MyActivities Search & Filter

> **Status**: IN PROGRESS
> **Domain**: workforce
> **Sprint/Milestone**: Current
> **Estimated Effort**: 4-6 hours
> **Platform**: Both (iOS & Android)
> **Created**: 2026-01-16
> **Last Updated**: 2026-01-16

## Overview

Implement client-side search and filtering for the MyActivities page, allowing users to quickly find activities by text, date range, and status.

**Structure**: This is the master README.md for a modular milestone.
- This file: `plans/milestones/workforce/my-activities-search-filter/README.md` - Master plan
- `STATUS.md` - Implementation progress tracker
- `01-database-schema.md` - N/A (no database changes)
- `02-backend-functions.md` - N/A (no backend changes)
- `03-frontend-hooks.md` - useDebounce hook
- `04-frontend-components.md` - SearchBar, FilterBadge, ActivityFilterModal
- `05-frontend-screens.md` - MyActivities.tsx modifications
- `06-testing.md` - Testing strategy

### Feature Reference
- **Business Requirements**: [plans/features/workforce/my-activities-search-filter.md](../../features/workforce/my-activities-search-filter.md)

### Technical Goals
- Implement instant text search with debounce (300ms)
- Create reusable SearchBar component
- Create filter modal with date range and status filters
- Integrate filtering into MyActivities without breaking existing functionality

### Implementation Status

See [STATUS.md](STATUS.md) for detailed progress tracking.

## Architecture Overview

### High-Level Design

```
┌─────────────────────────────────────────────────────┐
│                  MyActivities.tsx                    │
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌──────────────────────┐  │
│  │     SearchBar       │  │   Filter Button      │  │
│  │  (text input)       │  │  (opens modal)       │  │
│  └─────────────────────┘  └──────────────────────┘  │
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐│
│  │              Tabs (unchanged)                   ││
│  │   [Hours]    [Materials]    [Leave]            ││
│  └─────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐│
│  │           Filtered Content (FlatList)           ││
│  │   useMemo(filterData(rawData, filters))        ││
│  └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│             ActivityFilterModal                      │
│  ┌───────────────────────────────────────────────┐  │
│  │  From Date: [DatePicker]                      │  │
│  │  To Date:   [DatePicker]                      │  │
│  │  Status:    [Select] (Materials/Leave only)   │  │
│  │  [Reset]              [Apply]                 │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Components Affected
- **Frontend (New)**:
  - `src/hooks/useDebounce.ts`
  - `src/components/ui/search-bar.tsx`
  - `src/components/ui/filter-badge.tsx`
  - `src/components/activities/ActivityFilterModal.tsx`
- **Frontend (Modified)**:
  - `src/pages/MyActivities.tsx`
  - `src/i18n/locales/en.json`
  - `src/i18n/locales/it.json`
- **Backend**: None
- **Database**: None

### Technology Stack
- Frontend: React Native 0.74, TypeScript
- State: useState, useMemo (local component state)
- UI: StyleSheet API with centralized theme
- Existing Components: Modal, DatePicker, Select, Input, Badge

## Database Schema Changes

**None required** - This is a client-side filtering feature.

## API Design

**None required** - Filtering happens on already-fetched data.

## Frontend Implementation (React Native)

### New Components

#### Component: `SearchBar`

**Purpose**: Reusable text input with search icon and clear button

**Location**: `src/components/ui/search-bar.tsx`

**Props**:
```typescript
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
}
```

#### Component: `FilterBadge`

**Purpose**: Small badge showing active filter count

**Location**: `src/components/ui/filter-badge.tsx`

**Props**:
```typescript
interface FilterBadgeProps {
  count: number;
}
```

#### Component: `ActivityFilterModal`

**Purpose**: Modal for date range and status filters

**Location**: `src/components/activities/ActivityFilterModal.tsx`

**Props**:
```typescript
interface ActivityFilters {
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  status: 'all' | 'pending' | 'approved' | 'rejected';
}

interface ActivityFilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: ActivityFilters;
  onApply: (filters: ActivityFilters) => void;
  onReset: () => void;
  showStatusFilter: boolean;
}
```

### Hooks

#### Hook: `useDebounce`

**Purpose**: Debounce a value to prevent excessive re-renders

**Location**: `src/hooks/useDebounce.ts`

**Signature**:
```typescript
function useDebounce<T>(value: T, delay: number): T;
```

### Modified Screens

#### Screen: `MyActivities`

**Location**: `src/pages/MyActivities.tsx`

**Changes**:
1. Add state for search query and filters
2. Add useDebounce for search query
3. Add useMemo for filtered data per tab
4. Add search bar and filter button above tabs
5. Add filter modal
6. Clear search on tab change

## Implementation Steps

### Phase 1: Create Hooks
1. [x] Create `src/hooks/useDebounce.ts`

### Phase 2: Create UI Components
1. [x] Create `src/components/ui/search-bar.tsx`
2. [x] Create `src/components/ui/filter-badge.tsx`
3. [x] Create `src/components/activities/ActivityFilterModal.tsx`

### Phase 3: Integrate into MyActivities
1. [x] Add search bar above tabs
2. [x] Add filter button with badge
3. [x] Add filter state management
4. [x] Implement filtered data with useMemo
5. [x] Wire up filter modal
6. [x] Handle tab change (clear search)
7. [x] Add empty state for no results

### Phase 4: i18n & Polish
1. [x] Add English translations
2. [x] Add Italian translations
3. [x] Test on iOS
4. [x] Test on Android

## Testing Strategy

See [06-testing.md](06-testing.md) for detailed testing strategy.

### Manual Testing Checklist

**Search**:
- [ ] Search filters Hours by site name, description, work type
- [ ] Search filters Materials by title, item name, project, site
- [ ] Search filters Leave by title, type, reason
- [ ] Search is case-insensitive
- [ ] Clear button resets search
- [ ] Switching tabs clears search

**Filter Modal**:
- [ ] Filter modal opens on icon press
- [ ] Date pickers work correctly
- [ ] Status dropdown appears only on Materials/Leave tabs
- [ ] Apply button closes modal and applies filters
- [ ] Reset button clears all filters
- [ ] Filter badge shows correct count

**Edge Cases**:
- [ ] No results shows empty state message
- [ ] Large datasets filter quickly
- [ ] Works on both iOS and Android

## Security Considerations

- **No security impact** - client-side filtering only
- No PII exposed beyond what's already shown
- No new API calls or data fetching

## Performance Considerations

- **Debounce**: 300ms delay prevents filtering on every keystroke
- **useMemo**: Filtered data recalculates only when dependencies change
- **Client-side**: No network latency for filter operations
- **Expected dataset**: < 500 items per category (performs well)

## Rollback Plan

### How to Rollback

1. **Code**: Revert the commits that add search/filter
2. **No database changes** to revert
3. **Verification**: App works as before without search/filter

## References

- Feature Doc: [plans/features/workforce/my-activities-search-filter.md](../../features/workforce/my-activities-search-filter.md)
- Existing Input component: `src/components/ui/input.tsx`
- Existing Modal component: `src/components/ui/modal.tsx`
- Existing DatePicker: `src/components/ui/date-picker.tsx`
- Existing Select: `src/components/ui/select.tsx`

---

**Next Step**: Use this document as the prompt for Claude to implement the actual code.
