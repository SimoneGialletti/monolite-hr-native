import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing, cardShadow } from '@/theme';

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card = React.forwardRef<View, CardProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
});

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<View, CardProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.cardHeader, style]} {...props}>
      {children}
    </View>
  );
});

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<View, CardProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.cardTitle, style]} {...props}>
      {children}
    </View>
  );
});

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<View, CardProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.cardDescription, style]} {...props}>
      {children}
    </View>
  );
});

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<View, CardProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.cardContent, style]} {...props}>
      {children}
    </View>
  );
});

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<View, CardProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.cardFooter, style]} {...props}>
      {children}
    </View>
  );
});

CardFooter.displayName = 'CardFooter';

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    ...cardShadow,
  },
  cardHeader: {
    flexDirection: 'column',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardTitle: {
    // Title styling will be handled by Text component
  },
  cardDescription: {
    // Description styling will be handled by Text component
  },
  cardContent: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: 0,
  },
});
