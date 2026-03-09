import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ViewStyle, Pressable, Modal, Text, ScrollView, Dimensions, Linking } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
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
import { useAuth } from '@/hooks/useAuth';
import { useUserCompany } from '@/hooks/useUserCompany';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

const DRAWER_WIDTH = Dimensions.get('window').width * 0.82;

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
  const { user } = useAuth();
  const { companies } = useUserCompany();
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const { unreadCount } = useNotifications();
  const backdropOpacity = useSharedValue(0);
  const drawerTranslateX = useSharedValue(-DRAWER_WIDTH);

  useEffect(() => {
    if (menuVisible) {
      backdropOpacity.value = withTiming(1, { duration: 250 });
      drawerTranslateX.value = withTiming(0, { duration: 280 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 200 });
      drawerTranslateX.value = withTiming(-DRAWER_WIDTH, { duration: 220 });
    }
  }, [menuVisible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: drawerTranslateX.value }],
  }));

  const handleLogout = async () => {
    setMenuVisible(false);
    await supabase.auth.signOut();
    navigation.navigate('Auth');
  };

  const handleNavigate = (screen: string) => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  const handleCreateCompany = () => {
    setMenuVisible(false);
    Linking.openURL('https://monolite-building.lovable.app/');
  };

  const userName = user?.user_metadata?.name || '';
  const userSurname = user?.user_metadata?.surname || '';
  const userEmail = user?.email || '';
  const userInitials = (userName.charAt(0) + userSurname.charAt(0)).toUpperCase() || '?';

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

      {/* Left Sidebar Drawer */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="none"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.drawerOverlay}>
          <AnimatedPressable
            style={[styles.drawerBackdrop, backdropStyle]}
            onPress={() => setMenuVisible(false)}
          />
          <AnimatedView style={[styles.drawerContainer, { paddingTop: insets.top }, drawerStyle]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.drawerScrollContent}
            >
              {/* User Profile Section */}
              <View style={styles.userSection}>
                <View style={styles.avatar}>
                  <TextComponent variant="h3" style={styles.avatarText}>
                    {userInitials}
                  </TextComponent>
                </View>
                <TextComponent variant="h4" style={styles.userName} numberOfLines={1}>
                  {userName} {userSurname}
                </TextComponent>
                <TextComponent variant="caption" style={styles.userEmail} numberOfLines={1}>
                  {userEmail}
                </TextComponent>
              </View>

              <View style={styles.drawerDivider} />

              {/* Navigation Links */}
              <View style={styles.menuGroup}>
                <Pressable style={styles.menuItem} onPress={() => handleNavigate('Home')}>
                  <Icon name="home" size={22} color={colors.foreground} />
                  <TextComponent variant="body" style={styles.menuItemText}>
                    {t('sidebar.home')}
                  </TextComponent>
                </Pressable>
                <Pressable style={styles.menuItem} onPress={() => handleNavigate('Settings')}>
                  <Icon name="cog" size={22} color={colors.foreground} />
                  <TextComponent variant="body" style={styles.menuItemText}>
                    {t('sidebar.settings')}
                  </TextComponent>
                </Pressable>
              </View>

              <View style={styles.drawerDivider} />

              {/* Companies Section */}
              <View style={styles.menuGroup}>
                <TextComponent variant="caption" style={styles.sectionTitle}>
                  {t('sidebar.companies')}
                </TextComponent>
                {companies.length > 0 ? (
                  companies.map((company) => (
                    <View key={company.id} style={styles.companyItem}>
                      <Icon name="office-building" size={20} color={colors.gold} />
                      <TextComponent variant="body" style={styles.companyName} numberOfLines={1}>
                        {company.company_name}
                      </TextComponent>
                    </View>
                  ))
                ) : (
                  <TextComponent variant="caption" style={styles.noCompaniesText}>
                    {t('sidebar.noCompanies')}
                  </TextComponent>
                )}
                <Pressable style={styles.createCompanyButton} onPress={handleCreateCompany}>
                  <Icon name="plus-circle-outline" size={20} color={colors.gold} />
                  <TextComponent variant="body" style={styles.createCompanyText}>
                    {t('sidebar.createCompany')}
                  </TextComponent>
                  <Icon name="open-in-new" size={14} color={colors.gold} />
                </Pressable>
              </View>

              <View style={styles.drawerDivider} />

              {/* Language Section */}
              <View style={styles.menuGroup}>
                <TextComponent variant="caption" style={styles.sectionTitle}>
                  {t('settings.language')}
                </TextComponent>
                <LanguageSwitcher />
              </View>

              <View style={styles.drawerDivider} />

              {/* Legal Links */}
              <View style={styles.menuGroup}>
                <Pressable style={styles.menuItem} onPress={() => handleNavigate('PrivacyPolicy')}>
                  <Icon name="shield-lock-outline" size={22} color={colors.foreground} />
                  <TextComponent variant="body" style={styles.menuItemText}>
                    {t('sidebar.privacyPolicy')}
                  </TextComponent>
                </Pressable>
                <Pressable style={styles.menuItem} onPress={() => handleNavigate('TermsAndConditions')}>
                  <Icon name="file-document-outline" size={22} color={colors.foreground} />
                  <TextComponent variant="body" style={styles.menuItemText}>
                    {t('sidebar.termsAndConditions')}
                  </TextComponent>
                </Pressable>
              </View>

              <View style={styles.drawerDivider} />

              {/* Logout */}
              <View style={styles.menuGroup}>
                <Pressable style={styles.logoutButton} onPress={handleLogout}>
                  <Icon name="logout" size={22} color={colors.destructive} />
                  <TextComponent variant="body" style={styles.logoutText}>
                    {t('profile.logout')}
                  </TextComponent>
                </Pressable>
              </View>
            </ScrollView>
          </AnimatedView>
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
  // Drawer styles
  drawerOverlay: {
    flex: 1,
  },
  drawerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 16,
  },
  drawerScrollContent: {
    paddingBottom: spacing['3xl'],
  },
  // User section
  userSection: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  avatarText: {
    color: colors.primaryForeground,
    fontWeight: '700',
    fontSize: 22,
  },
  userName: {
    color: colors.foreground,
    fontWeight: '600',
    fontSize: 16,
  },
  userEmail: {
    color: colors.mutedForeground,
    fontSize: 13,
  },
  // Divider
  drawerDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
  },
  // Menu items
  menuGroup: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 12,
  },
  menuItemText: {
    color: colors.foreground,
    fontSize: 15,
    fontWeight: '500',
  },
  sectionTitle: {
    color: colors.mutedForeground,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  // Companies
  companyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  companyName: {
    color: colors.foreground,
    fontSize: 14,
    flex: 1,
  },
  noCompaniesText: {
    color: colors.mutedForeground,
    fontSize: 13,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    fontStyle: 'italic',
  },
  createCompanyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    marginTop: spacing.xs,
  },
  createCompanyText: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 2,
    borderColor: colors.destructive,
    borderRadius: 12,
    backgroundColor: colors.destructive + '10',
  },
  logoutText: {
    color: colors.destructive,
    fontWeight: '700',
    fontSize: 15,
  },
});
