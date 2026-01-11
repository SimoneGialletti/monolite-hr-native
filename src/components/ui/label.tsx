import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export interface LabelProps {
  children: React.ReactNode;
  style?: TextStyle;
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ children, style, required }) => {
  return (
    <Text style={[styles.label, style]}>
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
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
  required: {
    color: colors.destructive,
  },
});
