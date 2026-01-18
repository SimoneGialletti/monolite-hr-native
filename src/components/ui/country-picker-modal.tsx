import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, spacing, borderRadius, typography} from '@/theme';
import {TextComponent} from './text';
import {countries, Country} from '@/data/countries';
import {useDebounce} from '@/hooks/useDebounce';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface CountryPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  selectedCountry?: string; // ISO code
}

export const CountryPickerModal: React.FC<CountryPickerModalProps> = ({
  visible,
  onClose,
  onSelect,
  selectedCountry,
}) => {
  const {t} = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 150);
  const backdropOpacity = useSharedValue(0);
  const modalTranslateY = useSharedValue(300);

  // Animate modal
  useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, {duration: 300});
      modalTranslateY.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
    } else {
      backdropOpacity.value = withTiming(0, {duration: 200});
      modalTranslateY.value = withTiming(300, {duration: 200});
      setSearchQuery('');
    }
  }, [visible, backdropOpacity, modalTranslateY]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{translateY: modalTranslateY.value}],
  }));

  // Filter countries by search query (name or dial code)
  const filteredCountries = useMemo(() => {
    if (!debouncedSearch) {
      return countries;
    }
    const query = debouncedSearch.toLowerCase().trim();
    return countries.filter(
      c =>
        c.name.toLowerCase().includes(query) ||
        c.dialCode.includes(query) ||
        c.code.toLowerCase().includes(query),
    );
  }, [debouncedSearch]);

  const handleSelect = useCallback(
    (country: Country) => {
      onSelect(country);
      onClose();
    },
    [onSelect, onClose],
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const renderCountryItem = useCallback(
    ({item}: {item: Country}) => (
      <Pressable
        style={[
          styles.option,
          item.code === selectedCountry && styles.selectedOption,
        ]}
        onPress={() => handleSelect(item)}>
        <TextComponent variant="body" style={styles.flag}>
          {item.emoji}
        </TextComponent>
        <TextComponent
          variant="body"
          style={[
            styles.countryName,
            item.code === selectedCountry && styles.selectedOptionText,
          ]}
          numberOfLines={1}>
          {item.name}
        </TextComponent>
        <TextComponent variant="body" style={styles.dialCode}>
          {item.dialCode}
        </TextComponent>
        {item.code === selectedCountry && (
          <Icon name="check" size={20} color={colors.primary} />
        )}
      </Pressable>
    ),
    [selectedCountry, handleSelect],
  );

  const keyExtractor = useCallback((item: Country) => item.code, []);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <AnimatedPressable
          style={[styles.modalBackdrop, backdropStyle]}
          onPress={handleClose}
        />
        <AnimatedView style={[styles.modalContent, modalStyle]}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TextComponent variant="h3" style={styles.modalTitle}>
              {t('phone.selectCountry')}
            </TextComponent>
            <Pressable onPress={handleClose}>
              <Icon name="close" size={24} color={colors.foreground} />
            </Pressable>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Icon
                name="magnify"
                size={20}
                color={colors.mutedForeground}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder={t('phone.searchCountry')}
                placeholderTextColor={colors.mutedForeground}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')}>
                  <Icon
                    name="close-circle"
                    size={20}
                    color={colors.mutedForeground}
                  />
                </Pressable>
              )}
            </View>
          </View>

          {/* Country List */}
          <FlatList
            data={filteredCountries}
            keyExtractor={keyExtractor}
            renderItem={renderCountryItem}
            style={styles.list}
            keyboardShouldPersistTaps="handled"
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <TextComponent variant="body" style={styles.emptyText}>
                  {t('phone.noCountryFound')}
                </TextComponent>
              </View>
            }
          />
        </AnimatedView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    height: '70%',
    paddingBottom: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    color: colors.foreground,
    fontWeight: '600',
  },
  searchContainer: {
    padding: spacing.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.input,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.foreground,
    fontFamily: typography.fontFamily.regular,
    paddingVertical: spacing.sm,
  },
  list: {
    flex: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedOption: {
    backgroundColor: colors.primary + '20',
  },
  flag: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  countryName: {
    flex: 1,
    color: colors.foreground,
  },
  dialCode: {
    color: colors.mutedForeground,
    marginRight: spacing.sm,
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.mutedForeground,
  },
});
