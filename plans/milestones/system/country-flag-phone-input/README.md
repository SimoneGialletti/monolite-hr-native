# Technical Milestone: Country Flag Phone Input

> **Status**: DRAFT
> **Domain**: system
> **Platform**: Both (iOS & Android)
> **Created**: 2026-01-18
> **Last Updated**: 2026-01-18

## Overview

Implement an international phone input component for the signup form with country flag selection, auto-formatting, and device locale detection.

**Structure**: This milestone follows the modular structure:
- `README.md` - This file (master plan)
- `STATUS.md` - Implementation progress tracker
- `01-frontend-hooks.md` - Device country detection hook
- `02-frontend-components.md` - PhoneInput and CountryPickerModal components
- `03-data.md` - Static country data

### Feature Reference
- **Business Requirements**: [plans/features/system/country-flag-phone-input.md](../../features/system/country-flag-phone-input.md)

### Technical Goals
- Create reusable PhoneInput component with country selection
- Implement searchable country picker following CitySearchInput pattern
- Add auto-formatting using libphonenumber-js
- Detect device country from locale

### Implementation Status

See [STATUS.md](STATUS.md) for detailed progress.

## Architecture Overview

### High-Level Design

```
┌─────────────────────────────────────────────────────────────┐
│                        Auth.tsx                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    PhoneInput                        │    │
│  │  ┌──────────────┐  ┌────────────────────────────┐   │    │
│  │  │ CountryBtn   │  │ TextInput (formatted)      │   │    │
│  │  │ 🇮🇹 +39      │  │ 333 123 4567              │   │    │
│  │  └──────────────┘  └────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ (on tap)
┌─────────────────────────────────────────────────────────────┐
│                  CountryPickerModal                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Search: [italy________________]                      │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ 🇮🇹 Italy                                      +39  │    │
│  │ 🇺🇸 United States                              +1   │    │
│  │ 🇬🇧 United Kingdom                            +44   │    │
│  │ ...                                                  │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Components Affected
- **Frontend (New)**:
  - `src/components/ui/phone-input.tsx`
  - `src/components/ui/country-picker-modal.tsx`
  - `src/data/countries.ts`
  - `src/hooks/useDeviceCountry.ts`
- **Frontend (Modified)**:
  - `src/pages/Auth.tsx`
  - `src/i18n/locales/en.json`
  - `src/i18n/locales/it.json`

### Technology Stack
- Frontend: React Native 0.74, TypeScript
- Phone Formatting: libphonenumber-js (new dependency)
- Locale Detection: react-native-localize (existing)
- Animations: react-native-reanimated (existing)
- UI: StyleSheet with theme tokens

## Implementation Summary

### New Files

| File | Purpose |
|------|---------|
| `src/data/countries.ts` | Static country data (240+ countries) |
| `src/hooks/useDeviceCountry.ts` | Detect device country from locale |
| `src/components/ui/country-picker-modal.tsx` | Bottom sheet country selector |
| `src/components/ui/phone-input.tsx` | Main phone input component |

### Modified Files

| File | Change |
|------|--------|
| `src/pages/Auth.tsx` | Replace Input with PhoneInput (lines 461-467) |
| `src/i18n/locales/en.json` | Add phone picker translations |
| `src/i18n/locales/it.json` | Add phone picker translations |
| `package.json` | Add libphonenumber-js |

### Dependencies

**New npm package:**
```bash
npm install libphonenumber-js
```

## Key Implementation Details

### 1. Country Data Structure

```typescript
interface Country {
  code: string;      // ISO 3166-1 alpha-2: 'IT', 'US'
  name: string;      // English: 'Italy', 'United States'
  dialCode: string;  // '+39', '+1'
  emoji: string;     // '🇮🇹', '🇺🇸'
}
```

### 2. Emoji Flag Generation

```typescript
const countryCodeToEmoji = (code: string): string => {
  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};
```

### 3. Phone Formatting

```typescript
import { AsYouType, CountryCode } from 'libphonenumber-js';

const formatPhone = (value: string, country: CountryCode): string => {
  return new AsYouType(country).input(value);
};
```

### 4. PhoneInput Props

```typescript
interface PhoneInputProps {
  label?: string;
  value?: string;                    // Full: "+39333123456"
  onChangeText: (value: string) => void;
  defaultCountry?: CountryCode;
  placeholder?: string;
  error?: string;
}
```

## Module Documents

- [01-frontend-hooks.md](01-frontend-hooks.md) - useDeviceCountry hook
- [02-frontend-components.md](02-frontend-components.md) - UI components
- [03-data.md](03-data.md) - Country data

## Testing Strategy

### Manual Testing Checklist

**iOS:**
- [ ] Open signup, verify default country matches device locale
- [ ] Tap country selector, modal opens with animation
- [ ] Search "united", verify US and UK appear
- [ ] Select country, verify flag and dial code update
- [ ] Type phone number, verify formatting
- [ ] Complete signup with formatted phone

**Android:**
- [ ] Same tests as iOS
- [ ] Verify emoji flags render correctly
- [ ] Verify back button closes modal

## Verification

1. Run `npm install` to add libphonenumber-js
2. Start app on iOS/Android
3. Navigate to signup tab
4. Verify country auto-detected from device
5. Test country search and selection
6. Test phone formatting
7. Complete signup and verify phone stored correctly

---

**Next Step**: Implement following the module documents in order.
