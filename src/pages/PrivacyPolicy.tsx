import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextComponent } from '@/components/ui/text';
import { colors, spacing } from '@/theme';

export default function PrivacyPolicy() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextComponent variant="h1" style={styles.title}>
          PrivacyPolicy Screen
        </TextComponent>
        <TextComponent variant="body" style={styles.subtitle}>
          This screen will be implemented
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
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.gold,
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.mutedForeground,
    textAlign: 'center',
  },
});
