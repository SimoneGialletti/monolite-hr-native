# Module: Frontend Hooks

> **Module**: 01-frontend-hooks
> **Status**: Not Started

## Overview

Create a hook to detect the device's country from its locale settings.

---

## useDeviceCountry Hook

**File**: `src/hooks/useDeviceCountry.ts`

**Purpose**: Detect user's country from device locale, fallback to Italy.

### Implementation

```typescript
import * as RNLocalize from 'react-native-localize';
import type { CountryCode } from 'libphonenumber-js';

/**
 * Hook to detect the device's country from locale settings.
 * Falls back to Italy ('IT') if country cannot be determined.
 */
export const useDeviceCountry = (): CountryCode => {
  // getCountry() returns the device's region setting (e.g., 'IT', 'US')
  const deviceCountry = RNLocalize.getCountry();

  // Fallback to Italy if unknown
  return (deviceCountry as CountryCode) || 'IT';
};
```

### Usage

```typescript
import { useDeviceCountry } from '@/hooks/useDeviceCountry';

function PhoneInput() {
  const defaultCountry = useDeviceCountry();
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  // ...
}
```

### Notes

- `react-native-localize` is already installed in the project
- `getCountry()` returns the device's region, not language (more accurate for phone defaults)
- Returns ISO 3166-1 alpha-2 country codes which match libphonenumber-js expectations

---

## Checklist

- [ ] Create `src/hooks/useDeviceCountry.ts`
- [ ] Test on iOS with different region settings
- [ ] Test on Android with different region settings
