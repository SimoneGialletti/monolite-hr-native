import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';
import { colors, spacing, borderRadius, goldGlow, transitionDuration } from '@/theme';
import { TextComponent } from './text';
import { Input } from './input';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  searchable?: boolean;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = 'Select...',
  label,
  searchable = false,
  disabled = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const backdropOpacity = useSharedValue(0);
  const modalTranslateY = useSharedValue(300);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const selectedOption = options.find((opt) => opt.value === value);

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

  return (
    <View style={styles.container}>
      {label && (
        <TextComponent variant="label" style={styles.label}>
          {label}
        </TextComponent>
      )}
      <Pressable
        style={[styles.select, disabled && styles.disabled]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <TextComponent
          variant="body"
          style={[styles.selectText, !selectedOption && styles.placeholder]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </TextComponent>
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <AnimatedPressable
            style={[styles.modalBackdrop, backdropStyle]}
            onPress={() => setModalVisible(false)}
          />
          <AnimatedView style={[styles.modalContent, modalStyle]}>
            <View style={styles.modalHeader}>
              <TextComponent variant="h3" style={styles.modalTitle}>
                {label || 'Select'}
              </TextComponent>
              <Pressable onPress={() => setModalVisible(false)}>
                <TextComponent variant="body" style={styles.closeButton}>
                  Close
                </TextComponent>
              </Pressable>
            </View>

            {searchable && (
              <View style={styles.searchContainer}>
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            )}

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.option,
                    value === item.value && styles.selectedOption,
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                    setSearchQuery('');
                  }}
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
                </Pressable>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <TextComponent variant="body" style={styles.emptyText}>
                    No options found
                  </TextComponent>
                </View>
              }
            />
          </AnimatedView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    color: colors.foreground,
  },
  select: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.input,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 48,
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  selectText: {
    color: colors.foreground,
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
    maxHeight: '80%',
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
    color: colors.gold,
  },
  closeButton: {
    color: colors.gold,
  },
  searchContainer: {
    padding: spacing.md,
  },
  option: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedOption: {
    backgroundColor: colors.gold + '20',
  },
  optionText: {
    color: colors.foreground,
  },
  selectedOptionText: {
    color: colors.gold,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.mutedForeground,
  },
});
