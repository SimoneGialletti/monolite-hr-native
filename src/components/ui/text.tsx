import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { colors, typography } from '@/theme';

export interface TextComponentProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  color?: string;
  bold?: boolean;
  semibold?: boolean;
  style?: TextStyle;
}

export const TextComponent = React.forwardRef<Text, TextComponentProps>(
  ({ variant = 'body', color, bold, semibold, style, children, ...props }, ref) => {
    const getVariantStyle = (): TextStyle => {
      const variantStyles: Record<string, TextStyle> = {
        h1: {
          fontSize: typography.fontSize['4xl'],
          fontWeight: typography.fontWeight.bold,
          fontFamily: typography.fontFamily.bold,
        },
        h2: {
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          fontFamily: typography.fontFamily.bold,
        },
        h3: {
          fontSize: typography.fontSize['2xl'],
          fontWeight: typography.fontWeight.semibold,
          fontFamily: typography.fontFamily.semibold,
        },
        h4: {
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.semibold,
          fontFamily: typography.fontFamily.semibold,
        },
        body: {
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.normal,
          fontFamily: typography.fontFamily.regular,
        },
        caption: {
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.normal,
          fontFamily: typography.fontFamily.regular,
        },
        label: {
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          fontFamily: typography.fontFamily.medium,
        },
      };

      return variantStyles[variant] || variantStyles.body;
    };

    const fontWeight = bold
      ? typography.fontWeight.bold
      : semibold
      ? typography.fontWeight.semibold
      : undefined;

    const fontFamily = bold
      ? typography.fontFamily.bold
      : semibold
      ? typography.fontFamily.semibold
      : undefined;

    return (
      <Text
        ref={ref}
        style={[
          getVariantStyle(),
          { color: color || colors.foreground },
          fontWeight && { fontWeight },
          fontFamily && { fontFamily },
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

TextComponent.displayName = 'Text';

// Export as default Text for convenience, but keep React Native Text available
export default TextComponent;
