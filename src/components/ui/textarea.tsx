import React from 'react';
import { TextInput, View, Text, StyleSheet, ViewStyle, TextStyle, TextInputProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors, borderRadius, spacing, typography, goldGlow, transitionDuration } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface TextareaProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  rows?: number;
}

export const Textarea = React.forwardRef<TextInput, TextareaProps>(
  ({ label, error, containerStyle, inputStyle, onFocus, onBlur, rows = 4, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
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

    const minHeight = rows * 20 + spacing.md * 2;

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <AnimatedView
          style={[
            styles.inputContainer,
            { minHeight },
            animatedBorderStyle,
            isFocused && { ...goldGlow },
            error && { borderColor: colors.destructive },
          ]}
        >
          <TextInput
            ref={ref}
            style={[styles.input, inputStyle]}
            placeholderTextColor={colors.mutedForeground}
            onFocus={handleFocus}
            onBlur={handleBlur}
            multiline
            textAlignVertical="top"
            {...props}
          />
        </AnimatedView>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

Textarea.displayName = 'Textarea';

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
    paddingVertical: spacing.md,
  },
  input: {
    fontSize: typography.fontSize.base,
    color: colors.foreground,
    fontFamily: typography.fontFamily.regular,
    minHeight: 80,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.destructive,
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily.regular,
  },
});
