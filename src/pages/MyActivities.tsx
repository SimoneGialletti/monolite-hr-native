import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TextComponent } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { AppBar } from '@/components/ui/app-bar';
import { Loading } from '@/components/ui/loading';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Toast from 'react-native-toast-message';
import { colors, spacing, borderRadius } from '@/theme';
import { format } from 'date-fns';

interface LeaveRequest {
  id: string;
  title: string;
  status: string;
  submitted_at: string;
  start_date: string;
  end_date: string;
  duration_days: number;
  reason: string;
  leave_type_name: string;
}

interface MaterialRequest {
  id: string;
  title: string;
  status: string;
  priority: string;
  submitted_at: string;
  quantity: number;
  item_name: string;
  unit_name: string | null;
  project_name: string | null;
  site_name: string | null;
  needed_by_date: string | null;
}

interface WorkHoursLog {
  id: string;
  work_date: string;
  construction_site_name: string;
  work_description: string | null;
  regular_hours: number;
  overtime_hours: number;
  rain_hours: number;
  total_hours: number;
  work_type: string;
}

export default function MyActivities() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('hours');
  
  // Check if we can go back (only show back button if navigated from stack, not from bottom tab)
  const routeName = navigation.getState()?.routes?.[navigation.getState()?.index || 0]?.name;
  const canGoBack = navigation.canGoBack() && routeName !== 'ActivitiesTab';
  const [hourLogs, setHourLogs] = useState<WorkHoursLog[]>([]);
  const [materialRequests, setMaterialRequests] = useState<MaterialRequest[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [isLoadingHours, setIsLoadingHours] = useState(false);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);
  const [isLoadingLeave, setIsLoadingLeave] = useState(false);

  // Refetch data when screen comes into focus (e.g., after returning from LogHours)
  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        loadWorkHours();
        loadLeaveRequests();
        loadMaterialRequests();
      }
    }, [user])
  );

  const loadWorkHours = async () => {
    if (!user?.id) return;

    try {
      setIsLoadingHours(true);
      const { data, error } = await (supabase as any)
        .from('v_workers_hours')
        .select(`
          id,
          work_date,
          construction_site_name,
          work_description,
          regular_hours,
          overtime_hours,
          rain_hours,
          total_hours,
          work_type
        `)
        .eq('user_id', user.id)
        .order('work_date', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading work hours:', error);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: t('materialRequest.failed'),
        });
        return;
      }

      setHourLogs(data || []);
    } catch (err) {
      console.error('Error:', err);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('materialRequest.failed'),
      });
    } finally {
      setIsLoadingHours(false);
    }
  };

  const loadLeaveRequests = async () => {
    if (!user?.id) return;

    try {
      setIsLoadingLeave(true);
      const { data: leaveTypeData, error: typeError } = await (supabase as any)
        .from('worker_request_types')
        .select('id')
        .eq('name', 'leave')
        .single();

      if (typeError || !leaveTypeData) {
        console.error('Error loading leave request type:', typeError);
        return;
      }

      const { data, error } = await (supabase as any)
        .from('worker_requests')
        .select(`
          id,
          title,
          status,
          submitted_at,
          worker_leave_request_details!inner (
            start_date,
            end_date,
            duration_days,
            reason,
            leave_request_types (
              display_name
            )
          )
        `)
        .eq('user_id', user.id)
        .eq('request_type_id', leaveTypeData.id)
        .order('submitted_at', { ascending: false });

      if (error) {
        console.error('Error loading leave requests:', error);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: t('leaveRequest.failed'),
        });
        return;
      }

      const formattedData = (data || []).map((req: any) => {
        const details = Array.isArray(req.worker_leave_request_details)
          ? req.worker_leave_request_details[0]
          : req.worker_leave_request_details;

        return {
          id: req.id,
          title: req.title,
          status: req.status,
          submitted_at: req.submitted_at,
          start_date: details?.start_date,
          end_date: details?.end_date,
          duration_days: details?.duration_days,
          reason: details?.reason,
          leave_type_name: details?.leave_request_types?.display_name,
        };
      });

      setLeaveRequests(formattedData);
    } catch (err) {
      console.error('Error:', err);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('leaveRequest.failed'),
      });
    } finally {
      setIsLoadingLeave(false);
    }
  };

  const loadMaterialRequests = async () => {
    if (!user?.id) return;

    try {
      setIsLoadingMaterials(true);
      const { data, error } = await (supabase as any)
        .from('v_worker_material_requests')
        .select(`
          id,
          title,
          status,
          priority,
          requested_at,
          material_quantity,
          material_item_name,
          material_unit,
          material_project_name,
          material_site_name,
          material_needed_by_date
        `)
        .eq('user_id', user.id)
        .order('requested_at', { ascending: false });

      if (error) {
        console.error('Error loading material requests:', error);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: t('materialRequest.failed'),
        });
        return;
      }

      const formattedData = (data || []).map((req: any) => ({
        id: req.id,
        title: req.title,
        status: req.status,
        priority: req.priority,
        submitted_at: req.requested_at,
        quantity: req.material_quantity,
        item_name: req.material_item_name,
        unit_name: req.material_unit,
        project_name: req.material_project_name,
        site_name: req.material_site_name,
        needed_by_date: req.material_needed_by_date,
      }));

      setMaterialRequests(formattedData);
    } catch (err) {
      console.error('Error:', err);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('materialRequest.failed'),
      });
    } finally {
      setIsLoadingMaterials(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive',
    };
    return (
      <Badge variant={variants[status] || 'secondary'}>
        {t(`myActivities.${status}`)}
      </Badge>
    );
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '-';
      return format(date, 'MMM dd, yyyy');
    } catch {
      return '-';
    }
  };

  const tabs = [
    { value: 'hours', label: t('myActivities.hours'), icon: 'clock-outline' },
    { value: 'materials', label: t('myActivities.materials'), icon: 'package-variant' },
    { value: 'leave', label: t('myActivities.leave'), icon: 'calendar' },
  ];

  const renderHoursTab = () => {
    if (isLoadingHours) {
      return (
        <View style={styles.centerContainer}>
          <Loading message={t('myActivities.loadingHours')} />
        </View>
      );
    }

    if (hourLogs.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <TextComponent variant="body" style={styles.emptyText}>
            {t('myActivities.noHoursYet')}
          </TextComponent>
        </View>
      );
    }

    return (
      <FlatList
        data={hourLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <CardContent style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <TextComponent variant="h4" style={styles.cardTitle}>
                    {item.construction_site_name}
                  </TextComponent>
                  {item.work_description && (
                    <TextComponent variant="caption" style={styles.cardDescription}>
                      {item.work_description}
                    </TextComponent>
                  )}
                  <View style={styles.badgesContainer}>
                    <View style={styles.badge}>
                      <TextComponent variant="caption" style={styles.badgeText}>
                        {t('myActivities.regular')}: {item.regular_hours}h
                      </TextComponent>
                    </View>
                    {item.overtime_hours > 0 && (
                      <View style={[styles.badge, styles.overtimeBadge]}>
                        <TextComponent variant="caption" style={styles.overtimeBadgeText}>
                          {t('myActivities.overtime')}: {item.overtime_hours}h
                        </TextComponent>
                      </View>
                    )}
                    {item.rain_hours > 0 && (
                      <View style={[styles.badge, styles.rainBadge]}>
                        <TextComponent variant="caption" style={styles.rainBadgeText}>
                          ☔ {t('myActivities.rain')}: {item.rain_hours}h
                        </TextComponent>
                      </View>
                    )}
                  </View>
                </View>
                <TextComponent variant="h2" style={styles.totalHours}>
                  {item.total_hours}h
                </TextComponent>
              </View>
              <View style={styles.cardFooter}>
                <TextComponent variant="caption" style={styles.dateText}>
                  {formatDate(item.work_date)}
                </TextComponent>
                <Badge variant="secondary">
                  {t(`myActivities.workType.${item.work_type}`)}
                </Badge>
              </View>
            </CardContent>
          </Card>
        )}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  const renderMaterialsTab = () => {
    if (isLoadingMaterials) {
      return (
        <View style={styles.centerContainer}>
          <Loading message={t('myActivities.loadingMaterials')} />
        </View>
      );
    }

    if (materialRequests.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <TextComponent variant="body" style={styles.emptyText}>
            {t('myActivities.noMaterialsYet')}
          </TextComponent>
        </View>
      );
    }

    return (
      <FlatList
        data={materialRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <CardContent style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <TextComponent variant="h4" style={styles.cardTitle}>
                    {item.title}
                  </TextComponent>
                  <TextComponent variant="body" style={styles.itemText}>
                    <TextComponent variant="body" style={styles.boldText}>
                      {item.item_name}
                    </TextComponent>
                    {' - '}
                    <TextComponent variant="body" style={styles.quantityText}>
                      {item.quantity}
                    </TextComponent>
                    {item.unit_name && ` ${item.unit_name}`}
                  </TextComponent>
                  {item.project_name && (
                    <TextComponent variant="caption" style={styles.infoText}>
                      {t('myActivities.project')}: {item.project_name}
                    </TextComponent>
                  )}
                  {!item.project_name && item.site_name && (
                    <TextComponent variant="caption" style={styles.infoText}>
                      {t('myActivities.site')}: {item.site_name}
                    </TextComponent>
                  )}
                  {item.needed_by_date && (
                    <TextComponent variant="caption" style={styles.infoText}>
                      {t('myActivities.neededBy')}: {formatDate(item.needed_by_date)}
                    </TextComponent>
                  )}
                </View>
                <View style={styles.badgesColumn}>
                  {getStatusBadge(item.status)}
                  {item.priority !== 'normal' && (
                    <Badge
                      variant={
                        item.priority === 'urgent' || item.priority === 'high'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {t(`materialRequest.${item.priority}`)}
                    </Badge>
                  )}
                </View>
              </View>
              <TextComponent variant="caption" style={styles.submittedText}>
                {t('myActivities.submittedOn')} {formatDate(item.submitted_at)}
              </TextComponent>
            </CardContent>
          </Card>
        )}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  const renderLeaveTab = () => {
    if (isLoadingLeave) {
      return (
        <View style={styles.centerContainer}>
          <Loading message={t('myActivities.loadingLeave')} />
        </View>
      );
    }

    if (leaveRequests.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <TextComponent variant="body" style={styles.emptyText}>
            {t('myActivities.noLeaveYet')}
          </TextComponent>
        </View>
      );
    }

    return (
      <FlatList
        data={leaveRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <CardContent style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <TextComponent variant="h4" style={styles.cardTitle}>
                    {item.title}
                  </TextComponent>
                  {item.leave_type_name && (
                    <TextComponent variant="caption" style={styles.leaveTypeText}>
                      {item.leave_type_name}
                    </TextComponent>
                  )}
                  <TextComponent variant="body" style={styles.dateRangeText}>
                    {formatDate(item.start_date)} - {formatDate(item.end_date)}
                    <TextComponent variant="body" style={styles.durationText}>
                      {' '}({t('leaveRequest.days', { count: item.duration_days })})
                    </TextComponent>
                  </TextComponent>
                  <TextComponent variant="body" style={styles.reasonText}>
                    {item.reason}
                  </TextComponent>
                </View>
                {getStatusBadge(item.status)}
              </View>
              <TextComponent variant="caption" style={styles.submittedText}>
                {t('myActivities.submittedOn')} {formatDate(item.submitted_at)}
              </TextComponent>
            </CardContent>
          </Card>
        )}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppBar showBackButton={canGoBack} />
      <View style={styles.tabsContainer}>
        <Tabs value={activeTab} onValueChange={setActiveTab} tabs={tabs}>
          {activeTab === 'hours' && renderHoursTab()}
          {activeTab === 'materials' && renderMaterialsTab()}
          {activeTab === 'leave' && renderLeaveTab()}
        </Tabs>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabsContainer: {
    flex: 1,
    marginTop: 100, // Space for blurred app bar
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
  },
  emptyText: {
    color: colors.mutedForeground,
    textAlign: 'center',
  },
  listContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardContent: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  cardHeaderLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  cardTitle: {
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  cardDescription: {
    color: colors.mutedForeground,
    marginBottom: spacing.xs,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  badgesColumn: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  badge: {
    backgroundColor: colors.muted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    color: colors.foreground,
    fontSize: 10,
  },
  overtimeBadge: {
    backgroundColor: colors.gold + '30',
  },
  overtimeBadgeText: {
    color: colors.gold,
    fontSize: 10,
  },
  rainBadge: {
    backgroundColor: '#3B82F6' + '30',
  },
  rainBadgeText: {
    color: '#3B82F6',
    fontSize: 10,
  },
  totalHours: {
    color: colors.gold,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: colors.mutedForeground,
  },
  itemText: {
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  boldText: {
    fontWeight: '600',
  },
  quantityText: {
    fontWeight: '600',
    color: colors.foreground,
  },
  infoText: {
    color: colors.mutedForeground,
    marginBottom: spacing.xs,
  },
  submittedText: {
    color: colors.mutedForeground,
    marginTop: spacing.xs,
  },
  leaveTypeText: {
    color: colors.mutedForeground,
    marginBottom: spacing.xs,
  },
  dateRangeText: {
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  durationText: {
    fontWeight: '600',
    color: colors.foreground,
  },
  reasonText: {
    color: colors.mutedForeground,
  },
});
