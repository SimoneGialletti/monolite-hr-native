import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextComponent } from '@/components/ui/text';
import { AppBar } from '@/components/ui/app-bar';
import { colors, spacing } from '@/theme';

export default function Communications() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  // Check if we can go back (only show back button if navigated from stack, not from bottom tab)
  const routeName = navigation.getState()?.routes?.[navigation.getState()?.index || 0]?.name;
  const canGoBack = navigation.canGoBack() && routeName !== 'MessagesTab';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppBar showBackButton={canGoBack} />
      <View style={styles.content}>
        <Icon name="message-outline" size={48} color={colors.gold} />
        <TextComponent variant="h2" style={styles.title}>
          {t('communications.title')}
        </TextComponent>
        <TextComponent variant="body" style={styles.subtitle}>
          {t('communications.noMessages')}
        </TextComponent>
        <TextComponent variant="caption" style={styles.description}>
          {t('communications.noMessagesDesc')}
        </TextComponent>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    marginTop: 100, // Space for blurred app bar
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.gold,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.mutedForeground,
    textAlign: 'center',
  },
});
