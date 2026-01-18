# Feature: MyActivities Search & Filter

> **Status**: ACTIVE
> **Domain**: workforce
> **Priority**: P2 (Medium)
> **Created**: 2026-01-16
> **Last Updated**: 2026-01-16

## Business Goal

Enable users to quickly find specific activities (work hours, material requests, leave requests) within the MyActivities page without scrolling through potentially long lists.

### Success Metrics
- Users can find specific activities in under 5 seconds
- Reduced time spent navigating activity history
- Improved user satisfaction with activity management

## Problem Statement

### Current State
- Users must scroll through all activities to find specific entries
- No way to filter by date range or status
- Large activity histories become difficult to navigate
- Finding a specific entry from weeks ago requires extensive scrolling

### Desired State
- Instant text search filters activities as users type
- Date range filter narrows results to specific time periods
- Status filter (for materials/leave) shows only pending, approved, or rejected items
- Clear visual feedback when filters are active

## User Stories

### Primary Users
- **Worker**: Field worker who logs hours, requests materials, and submits leave requests
- **Office Staff**: Administrative user who tracks their own activities

### Stories
1. As a **worker**, I want **to search for a specific construction site** so that **I can quickly find my logged hours for that site**
2. As a **worker**, I want **to filter my leave requests by status** so that **I can see which requests are still pending approval**
3. As a **worker**, I want **to filter activities by date range** so that **I can see what I submitted last month**
4. As a **office staff**, I want **to search material requests by item name** so that **I can track a specific order**

## Business Rules & Constraints

### Rules
1. **Search Scope**: Search only applies to the currently active tab (Hours, Materials, or Leave)
2. **Tab Independence**: Switching tabs clears the search input for a fresh start
3. **Status Filter Visibility**: Status filter only appears for Materials and Leave tabs (Hours have no status)
4. **Case Insensitive**: All searches are case-insensitive

### Constraints
- **Technical**: Client-side filtering only (data already loaded)
- **Performance**: Search must feel instant (use debounce to prevent lag)
- **Business**: No changes to existing data models or backend
- **Performance**: Must work smoothly on older devices

## Functional Requirements

### Must Have (MVP)
- [x] Text search input above tabs
- [x] Search filters all visible text fields per tab
- [x] Debounced search (300ms delay) for performance
- [x] Clear button to reset search
- [x] Filter icon button next to search bar
- [x] Filter modal with date range picker (From/To)
- [x] Filter modal with status dropdown (Materials/Leave only)
- [x] Filter badge showing active filter count
- [x] Clear filters on tab change
- [x] Empty state when no results match

### Should Have (Phase 2)
- [ ] Quick date presets (Today, This Week, This Month)
- [ ] Remember last used filters per tab
- [ ] Highlight matching text in search results

### Nice to Have (Future)
- [ ] Server-side search for large datasets
- [ ] Advanced filters (amount ranges, specific sites)
- [ ] Save filter presets

## User Flows

### Primary Flow: Text Search
1. User navigates to MyActivities page
2. User taps search input
3. User types search query
4. System filters results as user types (with 300ms debounce)
5. User sees filtered list of activities
6. User taps X button to clear search and see all results

### Alternative Flow: Filter Modal
1. User taps filter icon button
2. System opens filter modal
3. User selects "From Date" using date picker
4. User selects "To Date" using date picker
5. User selects status (if on Materials or Leave tab)
6. User taps "Apply" button
7. System closes modal and shows filtered results
8. Filter badge shows "2" (indicating 2 active filters)

### Alternative Flow: Clear Filters
1. User has active filters applied
2. User taps filter icon button
3. User taps "Reset" button
4. System clears all filters
5. System shows all activities again

## Edge Cases & Scenarios

### Scenario 1: No Results Found
- **Condition**: Search query or filters match no activities
- **Expected Behavior**: Show "No results found" message with suggestion to adjust search/filters
- **Rationale**: User needs clear feedback that the search worked but found nothing

### Scenario 2: Tab Switch with Active Search
- **Condition**: User has active search, switches to different tab
- **Expected Behavior**: Search input is cleared, all activities in new tab shown
- **Rationale**: Previous search context doesn't apply to new tab content

### Scenario 3: Filter Modal on Hours Tab
- **Condition**: User opens filter modal while on Hours tab
- **Expected Behavior**: Status dropdown is hidden (only date filters shown)
- **Rationale**: Hours entries don't have approval status

### Scenario 4: Invalid Date Range
- **Condition**: User selects "To Date" before "From Date"
- **Expected Behavior**: Allow it - filter by "on or before To Date" if only To is set
- **Rationale**: Partial date filtering is still useful

### Error Cases
- **Empty search**: If user clears search, show all results (not an error)
- **Date picker cancel**: If user cancels date picker, keep previous value

## Data Requirements

### Input Data
- **searchQuery**: String, optional, used for text filtering
- **dateFrom**: Date, optional, filter activities on or after this date
- **dateTo**: Date, optional, filter activities on or before this date
- **status**: 'all' | 'pending' | 'approved' | 'rejected', optional

### Output Data
- **filteredHours**: Filtered WorkHoursLog array
- **filteredMaterials**: Filtered MaterialRequest array
- **filteredLeave**: Filtered LeaveRequest array
- **activeFilterCount**: Number of active filters (for badge)

### Data Sources
- Existing `hourLogs`, `materialRequests`, `leaveRequests` state in MyActivities.tsx
- No external integrations needed

## UI/UX Considerations (Mobile)

### Screens/Components Affected
- [MyActivities.tsx](src/pages/MyActivities.tsx): Add search bar, filter button, filter logic
- New SearchBar component
- New FilterBadge component
- New ActivityFilterModal component

### User Experience
- Loading states: Not needed (client-side filtering is instant)
- Error messages: "No results found" with clear action to reset
- Success feedback: Instant filtering as user types
- Accessibility: VoiceOver labels for search input and filter button
- Haptic feedback: Light impact on filter apply

### Mobile-Specific UX
- **Gestures**: Tap to focus search, tap filter icon for modal
- **Navigation**: Modal presentation for filters
- **Keyboard**: Auto-dismiss keyboard when scrolling results
- **Offline**: Works fully offline (client-side filtering)
- **Orientation**: Portrait only (consistent with app)

### Design Notes
- Search bar: Follow existing Input component style with search icon
- Filter modal: Use existing Modal component pattern
- Gold accent for active filter badge
- Use existing DatePicker and Select components

## Acceptance Criteria

### Functional Criteria
- [x] When user types in search, then results filter within 300ms
- [x] Given user is on Hours tab, when they search "office", then only hours with "office" in site name, description, or work type appear
- [x] Given user is on Materials tab with status filter "pending", when applied, then only pending material requests appear
- [x] When user switches tabs, then search input is cleared
- [x] When filters are active, then filter badge shows count

### Non-Functional Criteria
- [x] Performance: Filtering feels instant (< 100ms after debounce)
- [x] Security: No security implications (client-side only)
- [x] Accessibility: Search input has proper accessibilityLabel
- [x] Platform Support: iOS 13+ / Android 10+
- [x] Device Support: Phone only

## Dependencies

### Technical Dependencies
- Depends on: Existing MyActivities page, Modal component, DatePicker component, Select component
- Blocks: None

### External Dependencies
- None (fully client-side)

## Assumptions

- User activity lists are reasonably sized (< 500 items per category)
- Existing data fetching pattern will remain unchanged
- Users prefer instant search over explicit "Search" button

## Out of Scope

- Server-side search/filtering
- Saving search/filter history
- Search across all tabs simultaneously
- Export filtered results
- Sorting options

## Questions & Open Issues

- [x] Question 1: Should search persist across tabs? Answer: No, clear on tab switch
- [x] Question 2: Should status filter appear on Hours tab? Answer: No, hours have no status

## Related Documents

- Technical Spec: [plans/milestones/workforce/my-activities-search-filter/README.md](../../../milestones/workforce/my-activities-search-filter/README.md)
- Design: N/A (follow existing component patterns)
- Related Features: N/A

---

**Next Step**: Use this document as input to Claude to generate the technical milestone document in `plans/milestones/workforce/my-activities-search-filter/`
