import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

interface StoreItem {
  id: string;
  name: string;
  barcode: string | null;
  category_name: string | null;
  unit_name: string | null;
}

interface Location {
  id: string;
  name: string;
  location_type_id: string;
  location_type_name: string;
}

export default function MaterialRequest() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [isLoadingSites, setIsLoadingSites] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [workerCategoryId, setWorkerCategoryId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [neededByDate, setNeededByDate] = useState<Date | undefined>(undefined);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (user?.id) {
      loadUserCompany();
    }
  }, [user]);

  useEffect(() => {
    if (companyId) {
      loadStoreItems();
      loadLocations();
    }
  }, [companyId, workerCategoryId, userRole]);

  const loadUserCompany = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await (supabase as any)
        .from('user_companies')
        .select('company_id, worker_category_id, roles(name)')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error loading company:', error);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: 'Failed to load company information',
        });
        return;
      }

      setCompanyId(data?.company_id || null);
      setWorkerCategoryId(data?.worker_category_id || null);
      setUserRole(data?.roles?.name || null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loadStoreItems = async () => {
    if (!companyId) return;

    try {
      setIsLoadingItems(true);
      const { data, error } = await (supabase as any)
        .from('company_store_items')
        .select(`
          id,
          name,
          barcode,
          item_categories!company_store_items_item_category_id_fkey (name),
          measure_units!company_store_items_measure_unit_id_fkey (name)
        `)
        .eq('company_id', companyId)
        .order('name');

      if (error) {
        console.error('Failed to load store items:', error);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: `Failed to load store items: ${error.message}`,
        });
        return;
      }

      setStoreItems(
        (data || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          barcode: item.barcode,
          category_name: item.item_categories?.name || null,
          unit_name: item.measure_units?.name || null,
        }))
      );
    } catch (err) {
      console.error('Error loading store items:', err);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: 'Failed to load store items',
      });
    } finally {
      setIsLoadingItems(false);
    }
  };

  const loadLocations = async () => {
    if (!companyId) return;

    try {
      setIsLoadingSites(true);
      const isAdminOrOwner = userRole === 'owner' || userRole === 'admin';

      let allowedTypeIds: string[] = [];

      if (!isAdminOrOwner && workerCategoryId) {
        const { data: allowedTypes, error: typesError } = await (supabase as any)
          .from('worker_category_location_types')
          .select('location_type_id')
          .eq('worker_category_id', workerCategoryId);

        if (!typesError && allowedTypes && allowedTypes.length > 0) {
          allowedTypeIds = allowedTypes.map((t: { location_type_id: string }) => t.location_type_id);
        }
      }

      let query = (supabase as any)
        .from('locations')
        .select(`
          id,
          name,
          location_type_id,
          location_types!inner(name)
        `)
        .eq('company_id', companyId)
        .eq('is_active', true);

      if (!isAdminOrOwner && allowedTypeIds.length > 0) {
        query = query.in('location_type_id', allowedTypeIds);
      }

      const { data, error } = await query.order('name');

      if (error) {
        console.error('Failed to load locations:', error);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: `Failed to load locations: ${error.message}`,
        });
        return;
      }

      setLocations(
        (data || []).map((loc: any) => ({
          id: loc.id,
          name: loc.name,
          location_type_id: loc.location_type_id,
          location_type_name: loc.location_types?.name || null,
        }))
      );
    } catch (err) {
      console.error('Error loading locations:', err);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: 'Failed to load locations',
      });
    } finally {
      setIsLoadingSites(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedItemId || !selectedSiteId || !quantity || !priority || !neededByDate || !title) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('materialRequest.fillRequired'),
      });
      return;
    }

    if (!companyId) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('materialRequest.companyNotFound'),
      });
      return;
    }

    if (!user?.id) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('materialRequest.userNotAuth'),
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await (supabase as any).from('material_requests').insert({
        company_id: companyId,
        user_id: user.id,
        store_item_id: selectedItemId,
        location_id: selectedSiteId,
        quantity: parseFloat(quantity),
        priority: priority,
        needed_by_date: neededByDate.toISOString(),
        title: title,
        description: description || null,
        notes: notes || null,
      });

      if (error) throw error;

      Toast.show({
        type: 'success',
        text1: t('common.success'),
        text2: t('materialRequest.success'),
      });

      navigation.goBack();
    } catch (error: any) {
      console.error('Error submitting material request:', error);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: error.message || t('materialRequest.failed'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const itemOptions: SelectOption[] = storeItems.map((item) => ({
    label: item.name + (item.unit_name ? ` (${item.unit_name})` : ''),
    value: item.id,
  }));

  const locationOptions: SelectOption[] = locations.map((loc) => ({
    label: loc.name + (loc.location_type_name ? ` - ${loc.location_type_name}` : ''),
    value: loc.id,
  }));

  const priorityOptions: SelectOption[] = [
    { label: t('materialRequest.low'), value: 'low' },
    { label: t('materialRequest.normal'), value: 'normal' },
    { label: t('materialRequest.high'), value: 'high' },
    { label: t('materialRequest.urgent'), value: 'urgent' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.foreground} />
        </Pressable>
        <TextComponent variant="h2" style={styles.headerTitle}>
          {t('materialRequest.title')}
        </TextComponent>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <CardContent style={styles.form}>
            <Select
              label={t('materialRequest.storeItem')}
              placeholder={t('materialRequest.selectItem')}
              value={selectedItemId}
              onValueChange={setSelectedItemId}
              options={itemOptions}
              searchable
              disabled={isLoadingItems}
            />
            {isLoadingItems && (
              <TextComponent variant="caption" style={styles.loadingText}>
                {t('materialRequest.loadingItems')}
              </TextComponent>
            )}
            {!isLoadingItems && itemOptions.length === 0 && (
              <TextComponent variant="caption" style={styles.emptyText}>
                {t('materialRequest.noItems')}
              </TextComponent>
            )}

            <Input
              label={t('materialRequest.requestTitle')}
              placeholder={t('materialRequest.requestTitlePlaceholder')}
              value={title}
              onChangeText={setTitle}
            />

            <Input
              label={t('materialRequest.quantity')}
              placeholder={t('materialRequest.enterQuantity')}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="decimal-pad"
            />

            <Select
              label={t('materialRequest.location')}
              placeholder={t('materialRequest.selectLocation')}
              value={selectedSiteId}
              onValueChange={setSelectedSiteId}
              options={locationOptions}
              searchable
              disabled={isLoadingSites}
            />
            {isLoadingSites && (
              <TextComponent variant="caption" style={styles.loadingText}>
                {t('materialRequest.loadingLocations')}
              </TextComponent>
            )}

            <Select
              label={t('materialRequest.priority')}
              placeholder={t('materialRequest.selectPriority')}
              value={priority}
              onValueChange={setPriority}
              options={priorityOptions}
            />

            <DatePicker
              label={t('materialRequest.neededByDate')}
              placeholder={t('materialRequest.pickDate')}
              value={neededByDate}
              onValueChange={setNeededByDate}
              minimumDate={new Date()}
            />

            <Textarea
              label={t('materialRequest.description')}
              placeholder={t('materialRequest.descriptionPlaceholder')}
              value={description}
              onChangeText={setDescription}
              rows={3}
            />

            <Textarea
              label={t('materialRequest.additionalNotes')}
              placeholder={t('materialRequest.notesPlaceholder')}
              value={notes}
              onChangeText={setNotes}
              rows={3}
            />

            <Button
              onPress={handleSubmit}
              loading={isSubmitting}
              style={styles.submitButton}
              size="lg"
            >
              {isSubmitting ? t('common.submitting') : t('materialRequest.submitRequest')}
            </Button>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  },
  card: {
    marginBottom: spacing.lg,
  },
  form: {
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
  submitButton: {
    marginTop: spacing.md,
  },
});
