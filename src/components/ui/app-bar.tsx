import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ViewStyle, Pressable, Modal, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing } from '@/theme';
import { TextComponent } from './text';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { supabase } from '@/integrations/supabase/client';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface AppBarProps {
  style?: ViewStyle;
  blurType?: 'dark' | 'light' | 'xlight';
  blurAmount?: number;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({
  style,
  blurType = 'dark',
  blurAmount = 20,
  showBackButton = false,
  onBackPress,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const { unreadCount } = useNotifications();
  const backdropOpacity = useSharedValue(0);
  const modalTranslateY = useSharedValue(300);

  useEffect(() => {
    if (menuVisible) {
      backdropOpacity.value = withTiming(1, { duration: 300 });
      modalTranslateY.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 200 });
      modalTranslateY.value = withTiming(300, { duration: 200 });
    }
  }, [menuVisible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: modalTranslateY.value }],
  }));

  const handleLogout = async () => {
    setMenuVisible(false);
    await supabase.auth.signOut();
    navigation.navigate('Auth');
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
          },
          style,
        ]}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType={blurType}
          blurAmount={blurAmount}
          reducedTransparencyFallbackColor={colors.card}
        />
        <View style={styles.content}>
          {/* Left: Hamburger Menu or Back Button */}
          <View style={styles.leftSection}>
            {showBackButton ? (
              <Pressable onPress={onBackPress || (() => navigation.goBack())} style={styles.iconButton}>
                <Icon name="arrow-left" size={24} color={colors.foreground} />
              </Pressable>
            ) : (
              <Pressable onPress={() => setMenuVisible(true)} style={styles.iconButton}>
                <Icon name="menu" size={24} color={colors.foreground} />
              </Pressable>
            )}
          </View>

          {/* Center: Logo */}
          <View style={styles.centerSection}>
            <TextComponent variant="h3" style={styles.logo}>
              Monolite HR
            </TextComponent>
          </View>

          {/* Right: Notifications */}
          <View style={styles.rightSection}>
            <Pressable
              style={styles.iconButton}
              onPress={() => setNotificationsVisible(true)}
            >
              <Icon name="bell-outline" size={24} color={colors.foreground} />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </View>

      {/* Hamburger Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="none"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <AnimatedPressable
            style={[styles.modalBackdrop, backdropStyle]}
            onPress={() => setMenuVisible(false)}
          />
          <AnimatedPressable
            style={[styles.modalContent, modalStyle]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <TextComponent variant="h3" style={styles.modalTitle}>
                {t('common.menu')}
              </TextComponent>
              <Pressable onPress={() => setMenuVisible(false)} style={styles.closeButton}>
                <Icon name="close" size={24} color={colors.foreground} />
              </Pressable>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.menuSection}>
                <TextComponent variant="body" style={styles.menuSectionTitle}>
                  {t('settings.language')}
                </TextComponent>
                <LanguageSwitcher />
              </View>

              <View style={styles.divider} />

              <View style={styles.menuSection}>
                <Pressable style={styles.logoutButton} onPress={handleLogout}>
                  <Icon name="logout" size={22} color={colors.destructive} />
                  <TextComponent variant="body" style={styles.logoutText}>
                    {t('profile.logout')}
                  </TextComponent>
                </Pressable>
              </View>
            </View>
          </AnimatedPressable>
        </View>
      </Modal>

      {/* Notification Center Modal */}
      <NotificationCenter
        visible={notificationsVisible}
        onClose={() => setNotificationsVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 56,
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: spacing.xs,
  },
  logo: {
    color: colors.gold,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    maxHeight: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 16,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.mutedForeground + '60',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    color: colors.foreground,
    fontWeight: '700',
    fontSize: 20,
  },
  closeButton: {
    padding: spacing.xs,
    borderRadius: 20,
    backgroundColor: colors.muted + '30',
  },
  modalBody: {
    gap: spacing.xl,
  },
  menuSection: {
    gap: spacing.md,
  },
  menuSectionTitle: {
    color: colors.mutedForeground,
    marginBottom: spacing.md,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderWidth: 2,
    borderColor: colors.destructive,
    borderRadius: 16,
    backgroundColor: colors.destructive + '10',
  },
  logoutText: {
    color: colors.destructive,
    fontWeight: '700',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.destructive,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
