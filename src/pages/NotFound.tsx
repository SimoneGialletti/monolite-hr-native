import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TextComponent } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { colors, spacing } from '@/theme';

export default function NotFound() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextComponent variant="h1" style={styles.title}>
          404
        </TextComponent>
        <TextComponent variant="h3" style={styles.subtitle}>
          Oops! Page not found
        </TextComponent>
        <Button
          variant="outline"
          onPress={() => navigation.navigate('Auth')}
          style={styles.button}
        >
          <TextComponent variant="body" style={styles.buttonText}>
            Return to Home
          </TextComponent>
        </Button>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    color: colors.gold,
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.mutedForeground,
    marginBottom: spacing.xl,
  },
  button: {
    marginTop: spacing.md,
  },
  buttonText: {
    color: colors.gold,
  },
});
