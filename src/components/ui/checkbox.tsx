import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { colors, spacing, borderRadius } from '@/theme';
import { TextComponent } from './text';

export interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
    >
      <CheckBox
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        tintColors={{
          true: colors.gold,
          false: colors.border,
        }}
        onCheckColor={colors.gold}
        onFillColor={colors.background}
        onTintColor={colors.gold}
        style={styles.checkbox}
      />
      {label && (
        <TextComponent variant="body" style={styles.label}>
          {label}
        </TextComponent>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  checkbox: {
    marginRight: spacing.sm,
  },
  label: {
    flex: 1,
    color: colors.foreground,
  },
});
