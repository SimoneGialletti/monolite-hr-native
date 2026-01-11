import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { colors, spacing, borderRadius, goldGlow } from '@/theme';
import { TextComponent } from './text';

export interface Tab {
  value: string;
  label: string;
}

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  tabs: Tab[];
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, tabs, children }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map((tab) => {
          const isActive = value === tab.value;
          return (
            <Pressable
              key={tab.value}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => onValueChange(tab.value)}
            >
              <TextComponent
                variant="body"
                style={[styles.tabText, isActive && styles.activeTabText]}
              >
                {tab.label}
              </TextComponent>
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export const TabsList = Tabs;

export const TabsTrigger: React.FC<{ value: string; children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

export const TabsContent: React.FC<{ value: string; children: React.ReactNode }> = ({
  value: contentValue,
  children,
}) => {
  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabsContent: {
    paddingHorizontal: spacing.md,
  },
  tab: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginRight: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.gold,
    ...goldGlow,
  },
  tabText: {
    color: colors.mutedForeground,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.gold,
    fontWeight: '600',
  },
  content: {
    padding: spacing.md,
  },
});
