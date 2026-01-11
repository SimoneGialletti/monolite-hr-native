import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextComponent } from './ui/text';
import { colors, spacing, borderRadius } from '@/theme';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'it', label: 'IT' },
  ];

  const currentLanguage = i18n.language || 'en';

  const switchLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <View style={styles.container}>
      {languages.map((lang) => (
        <Pressable
          key={lang.code}
          style={[
            styles.button,
            currentLanguage === lang.code && styles.activeButton,
          ]}
          onPress={() => switchLanguage(lang.code)}
        >
          <TextComponent
            variant="caption"
            style={[
              styles.text,
              currentLanguage === lang.code && styles.activeText,
            ]}
          >
            {lang.label}
          </TextComponent>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.xs,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
  },
  button: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  activeButton: {
    backgroundColor: colors.gold,
  },
  text: {
    color: colors.mutedForeground,
    fontWeight: '600',
  },
  activeText: {
    color: colors.primaryForeground,
  },
});
