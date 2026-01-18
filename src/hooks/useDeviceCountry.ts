import * as RNLocalize from 'react-native-localize';
import type {CountryCode} from 'libphonenumber-js';

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
