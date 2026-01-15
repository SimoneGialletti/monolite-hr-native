import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, ViewStyle, TextStyle, TextInputProps, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors, borderRadius, spacing, typography, goldGlow, transitionDuration } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, error, containerStyle, inputStyle, rightIcon, onRightIconPress, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const borderColor = useSharedValue(colors.border);
    const shadowOpacity = useSharedValue(0);

    const animatedBorderStyle = useAnimatedStyle(() => {
      return {
        borderColor: borderColor.value,
        shadowOpacity: shadowOpacity.value,
      };
    });

    const handleFocus = (e: any) => {
      setIsFocused(true);
      borderColor.value = withTiming(colors.gold, { duration: transitionDuration.normal });
      shadowOpacity.value = withTiming(0.4, { duration: transitionDuration.normal });
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      borderColor.value = withTiming(colors.border, { duration: transitionDuration.normal });
      shadowOpacity.value = withTiming(0, { duration: transitionDuration.normal });
      onBlur?.(e);
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <AnimatedView
          style={[
            styles.inputContainer,
            animatedBorderStyle,
            isFocused && { ...goldGlow },
            error && { borderColor: colors.destructive },
          ]}
        >
          <TextInput
            ref={ref}
            style={[styles.input, inputStyle, rightIcon && styles.inputWithIcon]}
            placeholderTextColor={colors.mutedForeground}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {rightIcon && (
            <Pressable onPress={onRightIconPress} style={styles.rightIconContainer}>
              {rightIcon}
            </Pressable>
          )}
        </AnimatedView>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.foreground,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily.medium,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.input,
    paddingHorizontal: spacing.md,
    minHeight: 48,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: typography.fontSize.base,
    color: colors.foreground,
    fontFamily: typography.fontFamily.regular,
    paddingVertical: spacing.sm,
    flex: 1,
  },
  inputWithIcon: {
    paddingRight: spacing.xs,
  },
  rightIconContainer: {
    paddingLeft: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.destructive,
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily.regular,
  },
});
