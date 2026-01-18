import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Pressable, StyleProp, ViewStyle, TextInputProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, borderRadius, spacing, typography, goldGlow, transitionDuration } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = useSharedValue(colors.border);
  const shadowOpacity = useSharedValue(0);

  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      borderColor: borderColor.value,
      shadowOpacity: shadowOpacity.value,
    };
  });

  const handleFocus = () => {
    setIsFocused(true);
    borderColor.value = withTiming(colors.gold as string, { duration: transitionDuration.normal });
    shadowOpacity.value = withTiming(0.4, { duration: transitionDuration.normal });
  };

  const handleBlur = () => {
    setIsFocused(false);
    borderColor.value = withTiming(colors.border, { duration: transitionDuration.normal });
    shadowOpacity.value = withTiming(0, { duration: transitionDuration.normal });
  };

  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <AnimatedView
      style={[
        styles.container,
        animatedBorderStyle,
        isFocused && { ...goldGlow },
        style,
      ]}
    >
      <Icon
        name="magnify"
        size={20}
        color={isFocused ? colors.gold : colors.mutedForeground}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel={placeholder}
        accessibilityRole="search"
        {...props}
      />
      {value.length > 0 && (
        <Pressable
          onPress={handleClear}
          style={styles.clearButton}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
        >
          <Icon name="close-circle" size={18} color={colors.mutedForeground} />
        </Pressable>
      )}
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.input,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.foreground,
    fontFamily: typography.fontFamily.regular,
    paddingVertical: spacing.sm,
  },
  clearButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
});
