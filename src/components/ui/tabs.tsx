import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, borderRadius, goldGlow } from '@/theme';
import { TextComponent } from './text';

export interface Tab {
  value: string;
  label: string;
  icon?: string;
}

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  tabs: Tab[];
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, tabs, children }) => {
  if (!tabs || tabs.length === 0) {
    return <View style={styles.content}>{children}</View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabsWrapper}>
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
                {tab.icon && (
                  <Icon
                    name={tab.icon}
                    size={18}
                    color={isActive ? colors.gold : colors.mutedForeground}
                    style={styles.tabIcon}
                  />
                )}
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
      </View>
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
    flex: 1,
  },
  tabsWrapper: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    minHeight: 56,
  },
  tabsContainer: {
    flexGrow: 0,
    flexShrink: 0,
  },
  tabsContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    minHeight: 56,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginRight: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    minHeight: 48,
  },
  tabIcon: {
    marginRight: spacing.xs,
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
    flex: 1,
  },
});
