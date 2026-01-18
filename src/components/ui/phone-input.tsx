import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {AsYouType, CountryCode} from 'libphonenumber-js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDeviceCountry} from '@/hooks/useDeviceCountry';
import {countries, getCountryByCode, Country} from '@/data/countries';
import {CountryPickerModal} from './country-picker-modal';
import {colors, spacing, borderRadius, typography} from '@/theme';

export interface PhoneInputProps {
  label?: string;
  value?: string;
  onChangeText: (value: string) => void;
  defaultCountry?: CountryCode;
  placeholder?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  value = '',
  onChangeText,
  defaultCountry,
  placeholder,
  error,
  containerStyle,
}) => {
  const detectedCountry = useDeviceCountry();
  const initialCountryCode = defaultCountry || detectedCountry;

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    () => getCountryByCode(initialCountryCode) || countries[0],
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Extract local number from full value (remove dial code prefix)
  const localNumber = useMemo(() => {
    if (!value) {
      return '';
    }
    const dialCodeWithoutPlus = selectedCountry.dialCode.replace('+', '');
    if (value.startsWith('+' + dialCodeWithoutPlus)) {
      return value.slice(dialCodeWithoutPlus.length + 1);
    }
    if (value.startsWith(dialCodeWithoutPlus)) {
      return value.slice(dialCodeWithoutPlus.length);
    }
    // If value doesn't start with current dial code, it might be a raw number
    if (value.startsWith('+')) {
      return value.slice(1);
    }
    return value;
  }, [value, selectedCountry]);

  // Format for display using libphonenumber-js
  const displayValue = useMemo(() => {
    if (!localNumber) {
      return '';
    }
    try {
      const formatter = new AsYouType(selectedCountry.code as CountryCode);
      // Input the full number with dial code to get proper formatting
      const fullNumber = selectedCountry.dialCode + localNumber;
      const formatted = formatter.input(fullNumber);
      // Remove the dial code from display since we show it separately
      const dialCodeFormatted = selectedCountry.dialCode + ' ';
      if (formatted.startsWith(dialCodeFormatted)) {
        return formatted.slice(dialCodeFormatted.length);
      }
      // Fallback: just remove the dial code without space
      if (formatted.startsWith(selectedCountry.dialCode)) {
        return formatted.slice(selectedCountry.dialCode.length).trim();
      }
      return localNumber;
    } catch {
      return localNumber;
    }
  }, [localNumber, selectedCountry]);

  const handleChangeText = useCallback(
    (text: string) => {
      // Strip non-numeric characters
      const numericOnly = text.replace(/\D/g, '');
      // Combine with dial code for full value
      const dialCodeWithoutPlus = selectedCountry.dialCode.replace('+', '');
      const fullValue = numericOnly
        ? '+' + dialCodeWithoutPlus + numericOnly
        : '';
      onChangeText(fullValue);
    },
    [selectedCountry, onChangeText],
  );

  const handleCountrySelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      // Update value with new dial code if there's a local number
      if (localNumber) {
        const dialCodeWithoutPlus = country.dialCode.replace('+', '');
        const newValue = '+' + dialCodeWithoutPlus + localNumber;
        onChangeText(newValue);
      }
    },
    [localNumber, onChangeText],
  );

  const borderColor = error
    ? colors.destructive
    : isFocused
    ? colors.gold
    : colors.border;

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputContainer, {borderColor}]}>
        {/* Country Selector */}
        <Pressable
          style={styles.countrySelector}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.flag}>{selectedCountry.emoji}</Text>
          <Text style={styles.dialCode}>{selectedCountry.dialCode}</Text>
          <Icon name="chevron-down" size={16} color={colors.mutedForeground} />
        </Pressable>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Phone Input */}
        <TextInput
          style={styles.input}
          value={displayValue}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          keyboardType="phone-pad"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <CountryPickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleCountrySelect}
        selectedCountry={selectedCountry.code}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.foreground,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.input,
    minHeight: 48,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  flag: {
    fontSize: 20,
  },
  dialCode: {
    fontSize: typography.fontSize.base,
    color: colors.foreground,
    fontFamily: typography.fontFamily.regular,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.foreground,
    fontFamily: typography.fontFamily.regular,
    paddingVertical: spacing.sm,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.destructive,
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily.regular,
  },
});
