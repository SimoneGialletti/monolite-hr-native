import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Pressable, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectOption } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { TextComponent } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Toast from 'react-native-toast-message';
import { colors, spacing, borderRadius } from '@/theme';

interface LeaveRequestType {
  id: string;
  name: string;
  display_name: string;
  display_name_it: string;
  description: string | null;
  description_it: string | null;
  is_paid: boolean;
  requires_document: boolean;
  color: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
}

export default function LeaveRequest() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const inputRefs = useRef<{ [key: string]: any }>({});
  const fieldPositions = useRef<{ [key: string]: number }>({});

  const scrollToField = (fieldKey: string) => {
    const yPosition = fieldPositions.current[fieldKey];
    const scrollRef = scrollViewRef.current;
    
    if (yPosition !== undefined && scrollRef) {
      // Add some offset to ensure field is visible above keyboard
      const offset = 120;
      scrollRef.scrollTo({ y: Math.max(0, yPosition - offset), animated: true });
    } else {
      // Fallback to scrollToEnd if position not available
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  };

  const handleFieldLayout = (fieldKey: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    fieldPositions.current[fieldKey] = y;
  };
  const [leaveRequestTypes, setLeaveRequestTypes] = useState<LeaveRequestType[]>([]);
  const [companyId, setCompanyId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    requestTypeId: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    reason: '',
    detailedDescription: '',
  });

  const getLocalizedDisplayName = (type: LeaveRequestType): string => {
    return i18n.language === 'it' ? type.display_name_it : type.display_name;
  };

  useEffect(() => {
    if (user?.id) {
      loadUserCompany();
    }
    loadLeaveRequestTypes();
  }, [user]);

  const loadUserCompany = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await (supabase as any)
        .from('user_companies')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error loading company:', error);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: t('materialRequest.companyNotFound'),
        });
        return;
      }

      setCompanyId(data?.company_id || null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loadLeaveRequestTypes = async () => {
    try {
      setIsLoadingTypes(true);
      const { data, error } = await (supabase as any)
        .from('leave_request_types')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error loading leave request types:', error);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: t('leaveRequest.failed'),
        });
        return;
      }

      setLeaveRequestTypes((data as any) || []);
    } catch (error) {
      console.error('Error:', error);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('leaveRequest.failed'),
      });
    } finally {
      setIsLoadingTypes(false);
    }
  };

  const calculateDuration = (start: Date, end: Date): number => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmit = async () => {
    if (!formData.requestTypeId) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('leaveRequest.selectRequestType'),
      });
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('leaveRequest.selectDates'),
      });
      return;
    }

    if (formData.endDate < formData.startDate) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('leaveRequest.endDateError'),
      });
      return;
    }

    if (!formData.reason) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('leaveRequest.provideReason'),
      });
      return;
    }

    if (!companyId) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('leaveRequest.companyNotFound'),
      });
      return;
    }

    if (!user?.id) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('leaveRequest.userNotAuth'),
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await (supabase as any).from('leave_requests').insert({
        company_id: companyId,
        user_id: user.id,
        leave_request_type_id: formData.requestTypeId,
        start_date: formData.startDate.toISOString(),
        end_date: formData.endDate.toISOString(),
        reason: formData.reason,
        detailed_description: formData.detailedDescription || null,
      });

      if (error) throw error;

      Toast.show({
        type: 'success',
        text1: t('common.success'),
        text2: t('leaveRequest.success'),
      });

      navigation.goBack();
    } catch (error: any) {
      console.error('Error submitting leave request:', error);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: error.message || t('leaveRequest.failed'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const typeOptions: SelectOption[] = leaveRequestTypes.map((type) => ({
    label: getLocalizedDisplayName(type),
    value: type.id,
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.foreground} />
        </Pressable>
        <TextComponent variant="h2" style={styles.headerTitle}>
          {t('leaveRequest.title')}
        </TextComponent>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          onScrollToIndexFailed={() => {}}
        >
        <Card style={styles.card}>
          <CardContent style={styles.form}>
            <Select
              label={t('leaveRequest.requestType')}
              placeholder={t('leaveRequest.selectType')}
              value={formData.requestTypeId}
              onValueChange={(value) => setFormData({ ...formData, requestTypeId: value })}
              options={typeOptions}
              searchable
              disabled={isLoadingTypes}
            />
            {isLoadingTypes && (
              <TextComponent variant="caption" style={styles.loadingText}>
                {t('leaveRequest.loadingTypes')}
              </TextComponent>
            )}
            {!isLoadingTypes && typeOptions.length === 0 && (
              <TextComponent variant="caption" style={styles.emptyText}>
                {t('leaveRequest.noTypes')}
              </TextComponent>
            )}

            <DatePicker
              label={t('leaveRequest.startDate')}
              placeholder="dd/mm/yyyy"
              value={formData.startDate}
              onValueChange={(date) => setFormData({ ...formData, startDate: date })}
            />

            <DatePicker
              label={t('leaveRequest.endDate')}
              placeholder="dd/mm/yyyy"
              value={formData.endDate}
              onValueChange={(date) => setFormData({ ...formData, endDate: date })}
              minimumDate={formData.startDate}
            />

            {formData.startDate && formData.endDate && (
              <View style={styles.durationContainer}>
                <TextComponent variant="label" style={styles.durationLabel}>
                  {t('leaveRequest.duration')}
                </TextComponent>
                <View style={styles.durationBox}>
                  <TextComponent variant="body" style={styles.durationText}>
                    {t('leaveRequest.days', { count: calculateDuration(formData.startDate, formData.endDate) })}
                  </TextComponent>
                </View>
              </View>
            )}

            <View
              onLayout={(e) => handleFieldLayout('reason', e)}
            >
              <Input
                label={t('leaveRequest.reason')}
                placeholder={t('leaveRequest.reasonPlaceholder')}
                value={formData.reason}
                onChangeText={(value) => setFormData({ ...formData, reason: value })}
                onFocus={() => {
                  setTimeout(() => {
                    scrollToField('reason');
                  }, 300);
                }}
              />
            </View>

            <View
              onLayout={(e) => handleFieldLayout('detailedDescription', e)}
            >
              <Textarea
                label={`${t('leaveRequest.detailedDescription')} (${t('common.optional')})`}
                placeholder={t('leaveRequest.detailsPlaceholder')}
                value={formData.detailedDescription}
                onChangeText={(value) => setFormData({ ...formData, detailedDescription: value })}
                rows={4}
                onFocus={() => {
                  setTimeout(() => {
                    scrollToField('detailedDescription');
                  }, 300);
                }}
              />
            </View>

            <Button
              onPress={handleSubmit}
              loading={isSubmitting}
              style={styles.submitButton}
              size="lg"
            >
              {isSubmitting ? t('common.submitting') : t('leaveRequest.submitRequest')}
            </Button>
          </CardContent>
        </Card>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: colors.foreground,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
    flexGrow: 1,
  },
  card: {
    marginBottom: spacing.lg,
  },
  form: {
    padding: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    gap: spacing.md,
  },
  loadingText: {
    color: colors.mutedForeground,
    textAlign: 'center',
    marginTop: -spacing.sm,
  },
  emptyText: {
    color: colors.mutedForeground,
    textAlign: 'center',
    marginTop: -spacing.sm,
  },
  durationContainer: {
    gap: spacing.xs,
  },
  durationLabel: {
    color: colors.foreground,
  },
  durationBox: {
    backgroundColor: colors.muted + '30',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  durationText: {
    color: colors.primary,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: spacing.md,
  },
});
