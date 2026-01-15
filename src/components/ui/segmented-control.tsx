import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme';
import { TextComponent } from './text';

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SegmentedControlOption[];
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  value,
  onValueChange,
  options,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = value === option.value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <Pressable
            key={option.value}
            style={[
              styles.segment,
              isFirst && styles.firstSegment,
              isLast && styles.lastSegment,
              isSelected && styles.selectedSegment,
            ]}
            onPress={() => onValueChange(option.value)}
          >
            <TextComponent
              variant="body"
              style={[styles.segmentText, isSelected && styles.selectedSegmentText]}
            >
              {option.label}
            </TextComponent>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstSegment: {
    borderTopLeftRadius: borderRadius.sm,
    borderBottomLeftRadius: borderRadius.sm,
  },
  lastSegment: {
    borderTopRightRadius: borderRadius.sm,
    borderBottomRightRadius: borderRadius.sm,
  },
  selectedSegment: {
    backgroundColor: colors.background,
  },
  segmentText: {
    color: colors.foreground,
    fontWeight: '500',
  },
  selectedSegmentText: {
    color: colors.foreground,
    fontWeight: '600',
  },
});
