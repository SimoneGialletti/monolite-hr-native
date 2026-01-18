# Module: Frontend Components

> **Module**: 02-frontend-components
> **Status**: Not Started

## Overview

Create the PhoneInput component and CountryPickerModal following existing app patterns.

---

## 1. CountryPickerModal

**File**: `src/components/ui/country-picker-modal.tsx`

**Purpose**: Bottom sheet modal for country selection with search.

### Props Interface

```typescript
interface CountryPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  selectedCountry?: string; // ISO code
}
```

### Key Features

- Follows `city-search-input.tsx` modal pattern exactly
- Animated bottom sheet (70% screen height)
- Search input at top (searches name and dial code)
- FlatList with virtualization for smooth scrolling
- Shows emoji flag, country name, and dial code per row

### Implementation Pattern

Reference: `src/components/ui/city-search-input.tsx`

```typescript
import React, { useState, useCallback, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { countries, Country } from '@/data/countries';
import { colors, spacing, borderRadius, typography } from '@/theme';
import { useDebounce } from '@/hooks/useDebounce';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const MODAL_HEIGHT_PERCENT = 0.7;

export function CountryPickerModal({
  visible,
  onClose,
  onSelect,
  selectedCountry,
}: CountryPickerModalProps) {
  const { t } = useTranslation();
  const { height: screenHeight } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 150);

  // Animation values
  const backdropOpacity = useSharedValue(0);
  const modalTranslateY = useSharedValue(screenHeight);

  // Filter countries by search
  const filteredCountries = useMemo(() => {
    if (!debouncedSearch) return countries;
    const query = debouncedSearch.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.dialCode.includes(query)
    );
  }, [debouncedSearch]);

  // Open/close animations
  React.useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, { duration: 200 });
      modalTranslateY.value = withSpring(0, { damping: 20 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 150 });
      modalTranslateY.value = withTiming(screenHeight, { duration: 200 });
      setSearchQuery('');
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: modalTranslateY.value }],
  }));

  const handleSelect = useCallback((country: Country) => {
    onSelect(country);
    onClose();
  }, [onSelect, onClose]);

  const renderCountryItem = useCallback(
    ({ item }: { item: Country }) => (
      <Pressable
        style={[
          styles.countryRow,
          item.code === selectedCountry && styles.selectedRow,
        ]}
        onPress={() => handleSelect(item)}
      >
        <Text style={styles.flag}>{item.emoji}</Text>
        <Text style={styles.countryName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.dialCode}>{item.dialCode}</Text>
      </Pressable>
    ),
    [selectedCountry, handleSelect]
  );

  return (
    <Modal visible={visible} transparent animationType="none">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <AnimatedPressable
          style={[styles.backdrop, backdropStyle]}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.modal,
            { height: screenHeight * MODAL_HEIGHT_PERCENT },
            modalStyle,
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{t('phone.selectCountry')}</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </Pressable>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={t('phone.searchCountry')}
              placeholderTextColor={colors.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>

          {/* Country List */}
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            renderItem={renderCountryItem}
            style={styles.list}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text style={styles.emptyText}>{t('phone.noCountryFound')}</Text>
            }
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: colors.card,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.foreground,
  },
  closeButton: {
    fontSize: 20,
    color: colors.mutedForeground,
    padding: spacing.xs,
  },
  searchContainer: {
    padding: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.muted,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.foreground,
  },
  list: {
    flex: 1,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  selectedRow: {
    backgroundColor: colors.muted,
  },
  flag: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  countryName: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.foreground,
  },
  dialCode: {
    fontSize: typography.fontSize.sm,
    color: colors.mutedForeground,
    marginLeft: spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
    padding: spacing.lg,
    color: colors.mutedForeground,
  },
});
```

---

## 2. PhoneInput

**File**: `src/components/ui/phone-input.tsx`

**Purpose**: Main phone input component with country selector and auto-formatting.

### Props Interface

```typescript
interface PhoneInputProps {
  label?: string;
  value?: string;
  onChangeText: (value: string) => void;
  defaultCountry?: CountryCode;
  placeholder?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
```

### Implementation

```typescript
import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { AsYouType, CountryCode } from 'libphonenumber-js';
import { useDeviceCountry } from '@/hooks/useDeviceCountry';
import { countries, getCountryByCode, Country } from '@/data/countries';
import { CountryPickerModal } from './country-picker-modal';
import { colors, spacing, borderRadius, typography } from '@/theme';

interface PhoneInputProps {
  label?: string;
  value?: string;
  onChangeText: (value: string) => void;
  defaultCountry?: CountryCode;
  placeholder?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export function PhoneInput({
  label,
  value = '',
  onChangeText,
  defaultCountry,
  placeholder,
  error,
  containerStyle,
}: PhoneInputProps) {
  const detectedCountry = useDeviceCountry();
  const initialCountry = defaultCountry || detectedCountry;

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    () => getCountryByCode(initialCountry) || countries[0]
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Extract local number from full value (remove dial code)
  const localNumber = useMemo(() => {
    if (!value) return '';
    const dialCode = selectedCountry.dialCode.replace('+', '');
    if (value.startsWith('+' + dialCode)) {
      return value.slice(dialCode.length + 1);
    }
    if (value.startsWith(dialCode)) {
      return value.slice(dialCode.length);
    }
    return value;
  }, [value, selectedCountry]);

  // Format for display
  const displayValue = useMemo(() => {
    if (!localNumber) return '';
    const formatter = new AsYouType(selectedCountry.code as CountryCode);
    // Input the dial code + number to get proper formatting
    const formatted = formatter.input(selectedCountry.dialCode + localNumber);
    // Remove the dial code from display (we show it separately)
    return formatted.replace(selectedCountry.dialCode, '').trim();
  }, [localNumber, selectedCountry]);

  const handleChangeText = useCallback(
    (text: string) => {
      // Strip non-numeric characters
      const numericOnly = text.replace(/\D/g, '');
      // Combine with dial code for full value
      const fullValue = numericOnly
        ? selectedCountry.dialCode.replace('+', '') + numericOnly
        : '';
      onChangeText(fullValue ? '+' + fullValue : '');
    },
    [selectedCountry, onChangeText]
  );

  const handleCountrySelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      // Update value with new dial code
      if (localNumber) {
        const newValue = country.dialCode.replace('+', '') + localNumber;
        onChangeText('+' + newValue);
      }
    },
    [localNumber, onChangeText]
  );

  const borderColor = error
    ? colors.destructive
    : isFocused
    ? colors.primary
    : colors.border;

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputContainer, { borderColor }]}>
        {/* Country Selector */}
        <Pressable
          style={styles.countrySelector}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.flag}>{selectedCountry.emoji}</Text>
          <Text style={styles.dialCode}>{selectedCountry.dialCode}</Text>
          <Text style={styles.chevron}>▼</Text>
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

      {error && <Text style={styles.error}>{error}</Text>}

      <CountryPickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleCountrySelect}
        selectedCountry={selectedCountry.code}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    minHeight: 48,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  flag: {
    fontSize: 20,
    marginRight: spacing.xs,
  },
  dialCode: {
    fontSize: typography.fontSize.base,
    color: colors.foreground,
    marginRight: spacing.xs,
  },
  chevron: {
    fontSize: 10,
    color: colors.mutedForeground,
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
  },
  error: {
    fontSize: typography.fontSize.sm,
    color: colors.destructive,
    marginTop: spacing.xs,
  },
});
```

---

## 3. Update Auth.tsx

**File**: `src/pages/Auth.tsx`

**Change**: Replace phone Input with PhoneInput (around lines 461-467)

### Before

```tsx
<Input
  label={t('auth.phone')}
  placeholder={t('auth.phonePlaceholder')}
  value={phone}
  onChangeText={setPhone}
  keyboardType="phone-pad"
/>
```

### After

```tsx
<PhoneInput
  label={t('auth.phone')}
  placeholder={t('auth.phonePlaceholder')}
  value={phone}
  onChangeText={setPhone}
/>
```

---

## Checklist

- [ ] Create `src/components/ui/country-picker-modal.tsx`
- [ ] Create `src/components/ui/phone-input.tsx`
- [ ] Update `src/pages/Auth.tsx` to use PhoneInput
- [ ] Test modal open/close animations
- [ ] Test country search functionality
- [ ] Test phone number formatting
- [ ] Test on both iOS and Android
