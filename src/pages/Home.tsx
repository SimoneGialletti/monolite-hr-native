import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TextComponent } from '@/components/ui/text';
import { AppBar } from '@/components/ui/app-bar';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { colors, spacing, borderRadius, goldGlow } from '@/theme';

const Home = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [userName, setUserName] = useState('');
  const [todayHours, setTodayHours] = useState(0);

  useEffect(() => {
    if (user) {
      if (user.user_metadata?.name) {
        setUserName(user.user_metadata.name);
      }
    }
  }, [user]);

  // Refetch hours when screen comes into focus (e.g., after returning from LogHours)
  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadTodayHours(user.id);
      }
    }, [user])
  );

  const loadTodayHours = async (userId: string) => {
    try {
      const { data, error } = await (supabase as any)
        .from('v_workers_total_hours_today')
        .select('total_hours')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        // Only log if it's not a "no rows" error
        if (error.code !== 'PGRST116') {
          console.error("Error loading today's hours:", error);
        }
        setTodayHours(0);
        return;
      }

      setTodayHours(data?.total_hours || 0);
    } catch (err) {
      console.error('Error:', err);
      setTodayHours(0);
    }
  };

  const mainActions = [
    {
      icon: 'clock-outline',
      label: t('home.logHours'),
      description: t('home.logHoursDesc'),
      path: 'LogHours',
    },
    {
      icon: 'package-variant',
      label: t('home.materialRequest'),
      description: t('home.materialRequestDesc'),
      path: 'MaterialRequest',
    },
    {
      icon: 'calendar-outline',
      label: t('home.leaveRequest'),
      description: t('home.leaveRequestDesc'),
      path: 'LeaveRequest',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppBar />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <TextComponent variant="h3" style={styles.title}>
              {t('home.title')}, {userName}
            </TextComponent>
            <TextComponent variant="caption" style={styles.subtitle}>
              {t('home.subtitle')}
            </TextComponent>
          </View>
        </View>

        {/* Daily Hours Indicator */}
        <Card style={styles.hoursCard}>
          <View style={styles.hoursContainer}>
            <View style={styles.hoursRow}>
              <TextComponent variant="h1" style={styles.hoursText}>
                {todayHours.toFixed(1)}
              </TextComponent>
              <TextComponent variant="h3" style={styles.hoursUnit}>
                h
              </TextComponent>
            </View>
            <TextComponent variant="caption" style={styles.hoursLabel}>
              {t('home.todaysHours')}
            </TextComponent>
            {todayHours > 8 && (
              <Pressable
                onPress={() => navigation.navigate('LogHours')}
                style={styles.overtimeButton}
              >
                <TextComponent variant="caption" style={styles.overtimeText}>
                  {t('logHours.overtime')}: {(todayHours - 8).toFixed(1)}h
                </TextComponent>
              </Pressable>
            )}
          </View>
        </Card>

        {/* Main Actions */}
        <View style={styles.actionsContainer}>
          {mainActions.map((action) => (
            <Pressable
              key={action.path}
              onPress={() => navigation.navigate(action.path)}
              style={styles.actionCard}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIconContainer}>
                  <Icon name={action.icon} size={32} color={colors.gold} />
                </View>
                <View style={styles.actionText}>
                  <TextComponent variant="h4" style={styles.actionTitle}>
                    {action.label}
                  </TextComponent>
                  <TextComponent variant="caption" style={styles.actionDescription}>
                    {action.description}
                  </TextComponent>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* My Activities Card */}
        <Card style={styles.activitiesCard}>
          <CardHeader>
            <View style={styles.activitiesHeader}>
              <Icon name="file-document-outline" size={24} color={colors.gold} />
              <TextComponent variant="h3" style={styles.activitiesTitle}>
                {t('myActivities.title')}
              </TextComponent>
            </View>
          </CardHeader>
          <CardContent>
            <Pressable
              style={styles.activitiesButton}
              onPress={() => navigation.navigate('MyActivities')}
            >
              <Icon name="clipboard-list" size={20} color={colors.gold} />
              <TextComponent variant="body" style={styles.activitiesButtonText}>
                {t('myActivities.title')}
              </TextComponent>
            </Pressable>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: spacing['3xl'] + spacing.lg, // Space for blurred app bar
    paddingBottom: spacing['3xl'], // Space for tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  headerText: {
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    color: colors.foreground,
    marginBottom: spacing.xs,
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.mutedForeground,
    fontSize: 14,
    marginBottom: 0,
  },
  hoursCard: {
    marginBottom: spacing.xl,
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  hoursContainer: {
    alignItems: 'center',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  hoursText: {
    fontSize: 60,
    fontWeight: '700',
    color: colors.gold,
  },
  hoursUnit: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.gold + 'CC',
    marginLeft: spacing.xs,
  },
  hoursLabel: {
    color: colors.mutedForeground,
    marginTop: spacing.sm,
  },
  overtimeButton: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.gold,
    borderRadius: borderRadius.full,
  },
  overtimeText: {
    color: colors.primaryForeground,
    fontWeight: '600',
  },
  actionsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  actionCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius['2xl'],
    padding: spacing.lg,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  actionIconContainer: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  actionDescription: {
    color: colors.mutedForeground,
  },
  activitiesCard: {
    marginBottom: spacing.lg,
  },
  activitiesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  activitiesTitle: {
    color: colors.foreground,
  },
  activitiesButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 2,
    borderColor: colors.gold,
    borderRadius: borderRadius.lg,
    backgroundColor: 'transparent',
    gap: spacing.sm,
  },
  activitiesButtonText: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '600',
  },
});
