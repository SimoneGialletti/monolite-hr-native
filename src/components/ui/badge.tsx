import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@/theme';
import { TextComponent } from './text';

export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  style,
}) => {
  const getVariantStyle = (): ViewStyle => {
    const variantStyles: Record<string, ViewStyle> = {
      default: {
        backgroundColor: colors.gold,
      },
      secondary: {
        backgroundColor: colors.secondary,
      },
      destructive: {
        backgroundColor: colors.destructive,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.border,
      },
    };
    return variantStyles[variant] || variantStyles.default;
  };

  const getTextColor = (): string => {
    if (variant === 'default') return colors.primaryForeground;
    if (variant === 'destructive') return colors.destructiveForeground;
    if (variant === 'outline') return colors.foreground;
    return colors.secondaryForeground;
  };

  return (
    <View style={[styles.badge, getVariantStyle(), style]}>
      <TextComponent
        variant="caption"
        style={[styles.badgeText, { color: getTextColor() }]}
      >
        {children}
      </TextComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
});
