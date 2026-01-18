import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextComponent } from './text';
import { colors, spacing, borderRadius } from '@/theme';

export interface FilterBadgeProps {
  count: number;
}

export const FilterBadge: React.FC<FilterBadgeProps> = ({ count }) => {
  if (count <= 0) {
    return null;
  }

  return (
    <View style={styles.badge}>
      <TextComponent variant="caption" style={styles.badgeText}>
        {count > 9 ? '9+' : count}
      </TextComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.gold,
    borderRadius: borderRadius.full,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  badgeText: {
    color: colors.background,
    fontSize: 10,
    fontWeight: 'bold',
    lineHeight: 12,
  },
});
