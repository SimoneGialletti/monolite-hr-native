import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Modal, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from 'react-native-reanimated';
import { colors, spacing, borderRadius, transitionDuration } from '@/theme';
import { TextComponent } from './text';
import { Input } from './input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface CityOption {
  label: string;
  value: string;
}

export interface CitySearchInputProps {
  value?: string;
  onValueChange: (value: string, label?: string) => void;
  label?: string;
  placeholder?: string;
  onSearch: (query: string) => Promise<CityOption[]>;
  selectedCityLabel?: string;
}

export const CitySearchInput: React.FC<CitySearchInputProps> = ({
  value,
  onValueChange,
  label,
  placeholder = 'Search city...',
  onSearch,
  selectedCityLabel,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [options, setOptions] = useState<CityOption[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const backdropOpacity = useSharedValue(0);
  const modalTranslateY = useSharedValue(300);

  // Animate modal
  useEffect(() => {
    if (modalVisible) {
      backdropOpacity.value = withTiming(1, { duration: 300 });
      modalTranslateY.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 200 });
      modalTranslateY.value = withTiming(300, { duration: 200 });
    }
  }, [modalVisible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: modalTranslateY.value }],
  }));

  // Search cities when query changes
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.length >= 2) {
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await onSearch(searchQuery);
          setOptions(results);
        } catch (error) {
          console.error('Error searching cities:', error);
          setOptions([]);
        } finally {
          setIsSearching(false);
        }
      }, 300); // Debounce 300ms
    } else {
      setOptions([]);
      setIsSearching(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, onSearch]);

  const handleFocus = () => {
    setModalVisible(true);
    setSearchQuery('');
    setOptions([]);
  };

  const handleSelect = (option: CityOption) => {
    onValueChange(option.value, option.label);
    setModalVisible(false);
    setSearchQuery('');
    setOptions([]);
  };

  const handleClose = () => {
    setModalVisible(false);
    setSearchQuery('');
    setOptions([]);
  };

  return (
    <View style={styles.container}>
      {label && (
        <TextComponent variant="body" style={styles.label}>
          {label}
        </TextComponent>
      )}
      <Pressable
        style={styles.selectButton}
        onPress={handleFocus}
      >
        <TextComponent
          variant="body"
          style={[styles.selectText, !selectedCityLabel && styles.placeholder]}
        >
          {selectedCityLabel || placeholder}
        </TextComponent>
        <Icon
          name="chevron-down"
          size={20}
          color={colors.mutedForeground}
        />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <AnimatedPressable
            style={[styles.modalBackdrop, backdropStyle]}
            onPress={handleClose}
          />
          <AnimatedView style={[styles.modalContent, modalStyle]}>
            <View style={styles.modalHeader}>
              <TextComponent variant="h3" style={styles.modalTitle}>
                {label || 'Select City'}
              </TextComponent>
              <Pressable onPress={handleClose}>
                <Icon name="close" size={24} color={colors.foreground} />
              </Pressable>
            </View>

            <View style={styles.searchContainer}>
              <Input
                placeholder={placeholder}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
                rightIcon={
                  isSearching ? (
                    <ActivityIndicator size="small" color={colors.primary} />
                  ) : searchQuery.length > 0 ? (
                    <Pressable onPress={() => setSearchQuery('')}>
                      <Icon name="close-circle" size={20} color={colors.mutedForeground} />
                    </Pressable>
                  ) : null
                }
              />
            </View>

            <View style={styles.listContainer}>
              {searchQuery.length < 2 && (
                <View style={styles.hintContainer}>
                  <TextComponent variant="caption" style={styles.hintText}>
                    Type at least 2 characters to search
                  </TextComponent>
                </View>
              )}

              {isSearching && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={colors.primary} />
                  <TextComponent variant="body" style={styles.loadingText}>
                    Searching...
                  </TextComponent>
                </View>
              )}

              {!isSearching && searchQuery.length >= 2 && (
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <Pressable
                      style={[
                        styles.option,
                        value === item.value && styles.selectedOption,
                      ]}
                      onPress={() => handleSelect(item)}
                    >
                      <TextComponent
                        variant="body"
                        style={[
                          styles.optionText,
                          value === item.value && styles.selectedOptionText,
                        ]}
                      >
                        {item.label}
                      </TextComponent>
                      {value === item.value && (
                        <Icon name="check" size={20} color={colors.primary} />
                      )}
                    </Pressable>
                  )}
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <TextComponent variant="body" style={styles.emptyText}>
                        No cities found
                      </TextComponent>
                    </View>
                  }
                  style={styles.list}
                  keyboardShouldPersistTaps="handled"
                />
              )}
            </View>
          </AnimatedView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.input,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  selectText: {
    color: colors.foreground,
    flex: 1,
  },
  placeholder: {
    color: colors.mutedForeground,
  },
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
  listContainer: {
    flex: 1,
    minHeight: 200,
  },
  hintContainer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  hintText: {
    color: colors.mutedForeground,
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    color: colors.mutedForeground,
  },
  list: {
    flex: 1,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedOption: {
    backgroundColor: colors.primary + '20',
  },
  optionText: {
    color: colors.foreground,
    flex: 1,
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
