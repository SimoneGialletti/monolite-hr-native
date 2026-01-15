import React, { useEffect } from 'react';
import { Modal, View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from 'react-native-reanimated';
import { colors, spacing, borderRadius } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const ModalComponent: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  containerStyle,
}) => {
  const backdropOpacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, {
        damping: 20,
        stiffness: 90,
      });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.9, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <AnimatedPressable style={[styles.overlay, backdropStyle]} onPress={onClose}>
        <AnimatedPressable
          style={[styles.container, containerStyle, containerAnimatedStyle]}
          onPress={(e) => e.stopPropagation()}
        >
          {children}
        </AnimatedPressable>
      </AnimatedPressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    minWidth: 300,
    maxWidth: '90%',
    maxHeight: '80%',
  },
});
