import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextComponent } from '@/components/ui/text';
import { colors, spacing } from '@/theme';

export default function Auth() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TextComponent variant="h1" style={styles.title}>
          Auth Screen
        </TextComponent>
        <TextComponent variant="body" style={styles.subtitle}>
          Authentication screen will be implemented here
        </TextComponent>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
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
