import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, borderRadius, spacing, typography, goldGlow, goldGlowIntense, scale, transitionDuration } from '@/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = React.forwardRef<any, ButtonProps>(
  ({ 
    variant = 'default', 
    size = 'default', 
    children, 
    onPress, 
    disabled = false,
    loading = false,
    style,
    textStyle,
    ...props 
  }, ref) => {
    const scaleValue = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scaleValue.value }],
      };
    });

    const handlePressIn = () => {
      scaleValue.value = withSpring(scale.active, {
        damping: 15,
        stiffness: 300,
      });
    };

    const handlePressOut = () => {
      scaleValue.value = withSpring(scale.normal, {
        damping: 15,
        stiffness: 300,
      });
    };

    const getButtonStyle = (): ViewStyle[] => {
      const baseStyle: ViewStyle = {
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
        minWidth: 0,
      };

      // Size styles
      const sizeStyles: Record<string, ViewStyle> = {
        sm: {
          minHeight: 36,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
        },
        default: {
          minHeight: 48,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
        },
        lg: {
          minHeight: 56,
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.sm,
        },
        icon: {
          height: 40,
          width: 40,
          padding: 0,
        },
      };

      // Variant styles
      const variantStyles: Record<string, ViewStyle> = {
        default: {
          backgroundColor: colors.primary,
          ...goldGlow,
        },
        destructive: {
          backgroundColor: colors.destructive,
        },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.gold,
        },
        secondary: {
          backgroundColor: colors.secondary,
        },
        ghost: {
          backgroundColor: 'transparent',
        },
        link: {
          backgroundColor: 'transparent',
          padding: 0,
        },
      };

      return [
        baseStyle,
        sizeStyles[size],
        variantStyles[variant],
        disabled && { opacity: 0.5 },
        style,
      ];
    };

    const getTextStyle = (): TextStyle[] => {
      const baseTextStyle: TextStyle = {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        fontFamily: typography.fontFamily.semibold,
        includeFontPadding: false,
        textAlignVertical: 'center',
        lineHeight: typography.fontSize.sm * 1.2,
      };

      const sizeTextStyles: Record<string, TextStyle> = {
        sm: {
          fontSize: typography.fontSize.sm,
          lineHeight: typography.fontSize.sm * 1.2,
        },
        default: {
          fontSize: typography.fontSize.sm,
          lineHeight: typography.fontSize.sm * 1.2,
        },
        lg: {
          fontSize: typography.fontSize.base,
          lineHeight: typography.fontSize.base * 1.2,
        },
        icon: {
          fontSize: typography.fontSize.sm,
          lineHeight: typography.fontSize.sm * 1.2,
        },
      };

      const variantTextStyles: Record<string, TextStyle> = {
        default: {
          color: colors.primaryForeground,
        },
        destructive: {
          color: colors.destructiveForeground,
        },
        outline: {
          color: colors.gold,
        },
        secondary: {
          color: colors.secondaryForeground,
        },
        ghost: {
          color: colors.accent,
        },
        link: {
          color: colors.primary,
          textDecorationLine: 'underline',
        },
      };

      return [
        baseTextStyle,
        sizeTextStyles[size],
        variantTextStyles[variant],
        textStyle,
      ];
    };

    // Check if children is a string or contains React elements
    const isStringChildren = typeof children === 'string';
    
    return (
      <AnimatedPressable
        ref={ref}
        style={[getButtonStyle(), animatedStyle]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === 'outline' || variant === 'ghost' || variant === 'link' ? colors.gold : colors.primaryForeground} 
          />
        ) : isStringChildren ? (
          <Text style={getTextStyle()} numberOfLines={1} adjustsFontSizeToFit={false}>
            {children}
          </Text>
        ) : (
          children
        )}
      </AnimatedPressable>
    );
  }
);

Button.displayName = 'Button';
