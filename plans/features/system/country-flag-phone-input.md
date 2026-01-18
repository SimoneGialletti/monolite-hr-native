# Feature: Country Flag Phone Input

> **Status**: ACTIVE
> **Domain**: system
> **Priority**: P2 (Medium)
> **Created**: 2026-01-18
> **Last Updated**: 2026-01-18

## Business Goal

Improve the user experience during signup by providing an intuitive international phone number input with country flag selection, auto-formatting, and device locale detection.

### Success Metrics
- Reduced signup abandonment due to phone field confusion
- Proper international phone format stored in database
- Users can easily select their country without typing country codes

## Problem Statement

### Current State
- Phone field is a simple text input with no country selection
- Users must manually type country codes (+39, +1, etc.)
- No phone number formatting as users type
- Placeholder shows Italian format (+39 123 456 7890) which may confuse international users
- No validation of phone number format

### Desired State
- Tap-to-select country with emoji flag display
- Automatic phone number formatting based on selected country
- Device locale auto-detection for default country
- Clear visual feedback of selected country and dial code

## User Stories

### Primary Users
- **New User**: Person signing up for the app from any country
- **International User**: Person in a country other than Italy

### Stories
1. As a **new user**, I want to **select my country from a list with flags** so that **I don't have to remember my country's dial code**
2. As a **new user**, I want **my phone number to format automatically as I type** so that **I can verify I'm entering it correctly**
3. As an **international user**, I want **my country to be auto-detected** so that **I don't have to search for it manually**
4. As a **user**, I want to **search for my country by name or dial code** so that **I can find it quickly in the list**

## Business Rules & Constraints

### Rules
1. **Default Country**: Auto-detect from device locale; fallback to Italy (IT) if unknown
2. **Phone Storage**: Store full international format with country code (e.g., "+39123456789")
3. **Country List**: Include all 240+ countries with valid dial codes

### Constraints
- **Technical**: Must work offline (static country data, no API calls)
- **Performance**: Country list must render smoothly (FlatList virtualization)
- **Business**: Italy should appear at top of common countries for faster access
- **UX**: Must match existing app design patterns (see CitySearchInput modal)

## Functional Requirements

### Must Have (MVP)
- [x] Country selector button showing emoji flag + dial code
- [x] Bottom sheet modal with searchable country list
- [x] Search by country name and dial code
- [x] Auto-format phone number as user types
- [x] Auto-detect country from device locale
- [x] All 240+ countries with emoji flags

### Should Have (Phase 2)
- [ ] Phone number validation before form submission
- [ ] Remember last selected country for returning users

### Nice to Have (Future)
- [ ] Paste detection: auto-parse pasted international numbers
- [ ] Recent countries section at top of list

## User Flows

### Primary Flow: Select Country and Enter Phone
1. User taps on signup tab
2. User reaches phone field (shows auto-detected country flag, e.g., IT +39)
3. User taps on flag/dial code area
4. Bottom sheet modal opens with country list
5. User searches or scrolls to find country
6. User taps country row
7. Modal closes, flag and dial code update
8. User types phone number (auto-formats as they type)
9. User continues with signup

### Alternative Flow: Keep Default Country
1. User reaches phone field (shows auto-detected country)
2. User types phone number directly without changing country
3. Phone formats according to detected country rules

## Edge Cases & Scenarios

### Scenario 1: Unknown Device Locale
- **Condition**: Device locale cannot be determined
- **Expected Behavior**: Default to Italy (IT, +39)
- **Rationale**: App's primary market is Italy

### Scenario 2: User Pastes Full International Number
- **Condition**: User pastes "+1 555 123 4567"
- **Expected Behavior**: (Phase 2) Auto-detect country and format
- **Rationale**: Improves UX for users copying from contacts

### Scenario 3: Country Not in List
- **Condition**: Extremely rare - disputed territories
- **Expected Behavior**: User can still type dial code manually in number field
- **Rationale**: Edge case, manual fallback acceptable

### Error Cases
- **Invalid Characters**: Strip non-numeric characters during formatting
- **Number Too Long**: Allow typing but libphonenumber will handle validation

## Data Requirements

### Input Data
- **Country Code**: ISO 3166-1 alpha-2 (e.g., "IT", "US"), required
- **Phone Number**: String, numeric only, required

### Output Data
- **Full Phone**: String in format "+{dialCode}{number}" (e.g., "+393331234567")

### Data Sources
- Static country data bundled with app (no external API)
- Device locale from react-native-localize

## UI/UX Considerations (Mobile)

### Screens/Components Affected
- [Auth.tsx](src/pages/Auth.tsx): Replace current Input with PhoneInput
- New: [phone-input.tsx](src/components/ui/phone-input.tsx)
- New: [country-picker-modal.tsx](src/components/ui/country-picker-modal.tsx)

### User Experience
- Loading states: None needed (static data)
- Error messages: Via existing error prop on PhoneInput
- Success feedback: Visual formatting as user types
- Accessibility: Flag emojis have country name labels

### Mobile-Specific UX
- **Gestures**: Tap to open modal, scroll through country list
- **Navigation**: Modal overlay (not stack navigation)
- **Keyboard**: Phone-pad keyboard for number input, default keyboard for search
- **Offline**: Fully functional (no network required)
- **Orientation**: Portrait only (matches app)

### Design Notes
- Follow [city-search-input.tsx](src/components/ui/city-search-input.tsx) modal pattern exactly
- Use theme colors from [colors.ts](src/theme/colors.ts)
- Use theme spacing from [spacing.ts](src/theme/spacing.ts)
- Flag emoji size: ~24px to match input text size

## Acceptance Criteria

### Functional Criteria
- [x] When user taps phone field country selector, then bottom sheet modal opens
- [x] When user searches "italy" or "39", then Italy appears in results
- [x] When user selects a country, then modal closes and flag/dial code update
- [x] When user types phone number, then it formats according to country rules
- [x] When device locale is Italian, then default country is Italy

### Non-Functional Criteria
- [x] Performance: Country list scrolls at 60fps (FlatList virtualization)
- [x] Accessibility: Screen readers announce country names
- [x] Platform Support: iOS 13+ / Android 10+
- [x] Device Support: Phone only

## Dependencies

### Technical Dependencies
- Depends on: Existing Input component, theme system, react-native-reanimated
- Blocks: None

### External Dependencies
- libphonenumber-js (new npm package)
- react-native-localize (already installed)

## Assumptions

- Emoji flags render correctly on all supported iOS/Android versions
- libphonenumber-js provides accurate formatting for all countries
- Device locale is a reliable indicator of user's country

## Out of Scope

- Phone number verification via SMS
- Phone number validation blocking form submission
- Tablet-specific UI adjustments
- Landscape orientation support

## Questions & Open Issues

- [x] Picker style? → Modal bottom sheet (user confirmed)
- [x] Auto-format? → Yes (user confirmed)
- [x] Which countries? → All countries (user confirmed)
- [x] Auto-detect locale? → Yes (user confirmed)

## Related Documents

- Technical Spec: [plans/milestones/system/country-flag-phone-input/](plans/milestones/system/country-flag-phone-input/)
- Design Reference: [city-search-input.tsx](src/components/ui/city-search-input.tsx)

---

**Next Step**: Use this document as input to Claude to generate the technical milestone document in `plans/milestones/system/country-flag-phone-input/`
