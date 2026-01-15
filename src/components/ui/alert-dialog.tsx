import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, Modal } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from 'react-native-reanimated';
import { colors, spacing, borderRadius, goldGlow } from '@/theme';
import { TextComponent } from './text';
import { Button } from './button';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface AlertDialogTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export interface AlertDialogContentProps {
  children: React.ReactNode;
}

export interface AlertDialogHeaderProps {
  children: React.ReactNode;
}

export interface AlertDialogTitleProps {
  children: React.ReactNode;
}

export interface AlertDialogDescriptionProps {
  children: React.ReactNode;
}

export interface AlertDialogFooterProps {
  children: React.ReactNode;
}

export interface AlertDialogActionProps {
  onPress?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface AlertDialogCancelProps {
  onPress?: () => void;
  children: React.ReactNode;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open = false,
  onOpenChange,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(open);
  const backdropOpacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const triggerChild = React.Children.toArray(children).find(
    (child: any) => child?.type === AlertDialogTrigger
  );
  const contentChild = React.Children.toArray(children).find(
    (child: any) => child?.type === AlertDialogContent
  );

  return (
    <>
      {triggerChild && (
        <Pressable onPress={() => setIsOpen(true)}>
          {React.cloneElement(triggerChild as React.ReactElement, {
            onPress: () => setIsOpen(true),
          })}
        </Pressable>
      )}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <View style={styles.overlay}>
          <AnimatedPressable style={[styles.backdrop, backdropStyle]} onPress={handleClose} />
          <AnimatedView style={[styles.content, contentStyle]}>
            {contentChild &&
              React.cloneElement(contentChild as React.ReactElement, {
                onClose: handleClose,
              })}
          </AnimatedView>
        </View>
      </Modal>
    </>
  );
};

export const AlertDialogTrigger: React.FC<AlertDialogTriggerProps> = ({
  children,
}) => {
  return <>{children}</>;
};

export const AlertDialogContent: React.FC<AlertDialogContentProps & { onClose?: () => void }> = ({
  children,
  onClose,
}) => {
  const headerChild = React.Children.toArray(children).find(
    (child: any) => child?.type === AlertDialogHeader
  );
  const footerChild = React.Children.toArray(children).find(
    (child: any) => child?.type === AlertDialogFooter
  );
  const otherChildren = React.Children.toArray(children).filter(
    (child: any) =>
      child?.type !== AlertDialogHeader && child?.type !== AlertDialogFooter
  );

  return (
    <View style={styles.dialog}>
      {headerChild}
      {otherChildren}
      {footerChild &&
        React.cloneElement(footerChild as React.ReactElement, {
          onClose,
        })}
    </View>
  );
};

export const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({
  children,
}) => {
  return <View style={styles.header}>{children}</View>;
};

export const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({
  children,
}) => {
  return (
    <TextComponent variant="h3" style={styles.title}>
      {children}
    </TextComponent>
  );
};

export const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({
  children,
}) => {
  return (
    <TextComponent variant="body" style={styles.description}>
      {children}
    </TextComponent>
  );
};

export const AlertDialogFooter: React.FC<AlertDialogFooterProps & { onClose?: () => void }> = ({
  children,
  onClose,
}) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <View style={styles.footer}>
      {childrenArray.map((child: any, index) => {
        if (child?.type === AlertDialogCancel || child?.type === AlertDialogAction) {
          return React.cloneElement(child, {
            key: index,
            onPress: () => {
              child.props.onPress?.();
              onClose?.();
            },
          });
        }
        return child;
      })}
    </View>
  );
};

export const AlertDialogAction: React.FC<AlertDialogActionProps> = ({
  onPress,
  children,
  className,
}) => {
  return (
    <Button onPress={onPress} style={styles.actionButton}>
      {children}
    </Button>
  );
};

export const AlertDialogCancel: React.FC<AlertDialogCancelProps> = ({
  onPress,
  children,
}) => {
  return (
    <Button variant="outline" onPress={onPress} style={styles.cancelButton}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    width: '90%',
    maxWidth: 400,
  },
  dialog: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary,
    ...goldGlow,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.mutedForeground,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  },
});
