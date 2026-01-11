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
      };

      // Size styles
      const sizeStyles: Record<string, ViewStyle> = {
        sm: {
          height: 36,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        },
        default: {
          height: 48,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
        },
        lg: {
          height: 56,
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.md,
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
      };

      const sizeTextStyles: Record<string, TextStyle> = {
        sm: {
          fontSize: typography.fontSize.sm,
        },
        default: {
          fontSize: typography.fontSize.sm,
        },
        lg: {
          fontSize: typography.fontSize.base,
        },
        icon: {
          fontSize: typography.fontSize.sm,
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
        ) : (
          <Text style={getTextStyle()}>{children}</Text>
        )}
      </AnimatedPressable>
    );
  }
);

Button.displayName = 'Button';
