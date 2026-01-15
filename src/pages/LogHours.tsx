import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectOption } from '@/components/ui/select';
import { SwitchComponent as Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { TextComponent } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Toast from 'react-native-toast-message';
import { colors, spacing, borderRadius, goldGlow } from '@/theme';

interface WorkEntry {
  id: string;
  macroCategoryId: string;
  macroCategoryName: string;
  categoryId: string;
  categoryName: string;
  costCenterSupId: string;
  costCenterSupName: string;
  costCenterCatId: string;
  costCenterCatName: string;
  costCenterSubId: string;
  costCenterSubName: string;
  hours: string;
  didRain: boolean;
  rainHours: string;
}

interface Location {
  id: string;
  name: string;
  location_type_id: string;
  location_type_name: string;
  reference_type: string | null;
  reference_id: string | null;
  project_id: string | null;
}

interface WorkHourCategory {
  id: string;
  name: string;
  level: number;
  parent_id: string | null;
}

interface IndustryWorkType {
  id: string;
  name: string;
  display_name_en: string;
  display_name_it: string;
  is_overtime: boolean;
  overtime_multiplier: number;
}

interface CostCenter {
  id: string;
  code: string;
  name: string;
  description: string | null;
  hierarchy_level: number;
  parent_ids: string[] | null;
}

type TrackingMode = 'MAPPED_CATEGORIES' | 'DIRECT_COST_CENTER';

interface TodayLoggedHour {
  hours: number;
  location_name: string;
  macro_category_name: string | null;
  category_name: string | null;
  cost_center_sup_name: string | null;
  cost_center_cat_name: string | null;
  cost_center_sub_name: string | null;
}

export default function LogHours() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [site, setSite] = useState('');
  const [workEntries, setWorkEntries] = useState<WorkEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSites, setIsLoadingSites] = useState(false);
  const [isLoadingMacroCategories, setIsLoadingMacroCategories] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [workerCategoryId, setWorkerCategoryId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [macroCategories, setMacroCategories] = useState<WorkHourCategory[]>([]);
  const [categories, setCategories] = useState<Record<string, WorkHourCategory[]>>({});
  const [workTypes, setWorkTypes] = useState<IndustryWorkType[]>([]);
  const [presentWorkStatusId, setPresentWorkStatusId] = useState<string | null>(null);
  const [costCenters, setCostCenters] = useState<CostCenter[]>([]);
  const [trackingMode, setTrackingMode] = useState<TrackingMode>('MAPPED_CATEGORIES');
  const [contractedDailyHours, setContractedDailyHours] = useState<number>(8.0);
  const [maxHierarchyLevel, setMaxHierarchyLevel] = useState<number>(3);
  const [todayLoggedHours, setTodayLoggedHours] = useState<TodayLoggedHour[]>([]);
  const [totalLoggedHours, setTotalLoggedHours] = useState<number>(0);

  useEffect(() => {
    if (user?.id) {
      loadUserCompany();
      loadTodayLoggedHours();
    }
  }, [user]);

  useEffect(() => {
    if (companyId) {
      loadLocations();
      loadMacroCategories();
      loadPresentWorkStatus();
      loadCostCenters();
      loadWorkTypes();
    }
  }, [companyId, workerCategoryId, userRole]);

  useEffect(() => {
    if (site) {
      loadTrackingMode();
      loadCostCenters();
    }
  }, [site]);

  const loadTodayLoggedHours = async () => {
    if (!user?.id) return;

    try {
      const { data: totalData } = await (supabase as any)
        .from('v_workers_total_hours_today')
        .select('total_hours')
        .eq('user_id', user.id)
        .single();

      setTotalLoggedHours(totalData?.total_hours || 0);

      const { data: hoursData } = await (supabase as any)
        .from('work_hours')
        .select(`
          hours,
          locations(name),
          work_hours_categories!work_hours_work_hour_macro_category_id_fkey(name),
          work_hours_categories_category:work_hours_categories!work_hours_work_hour_category_id_fkey(name),
          construction_work_hours_details(
            cost_centers_sup:cost_centers!construction_work_hours_details_cost_center_sup_id_fkey(name),
            cost_centers_cat:cost_centers!construction_work_hours_details_cost_center_cat_id_fkey(name),
            cost_centers_sub:cost_centers!construction_work_hours_details_cost_center_sub_id_fkey(name)
          )
        `)
        .eq('user_id', user.id)
        .eq('work_date', new Date().toISOString().split('T')[0])
        .order('created_at', { ascending: false });

      if (hoursData) {
        const formatted = hoursData.map((entry: any) => ({
          hours: parseFloat(entry.hours),
          location_name: entry.locations?.name || 'N/A',
          macro_category_name: entry.work_hours_categories?.name || null,
          category_name: entry.work_hours_categories_category?.name || null,
          cost_center_sup_name: entry.construction_work_hours_details?.[0]?.cost_centers_sup?.name || null,
          cost_center_cat_name: entry.construction_work_hours_details?.[0]?.cost_centers_cat?.name || null,
          cost_center_sub_name: entry.construction_work_hours_details?.[0]?.cost_centers_sub?.name || null,
        }));
        setTodayLoggedHours(formatted);
      }
    } catch (error) {
      console.error('Error loading today logged hours:', error);
    }
  };

  const loadUserCompany = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await (supabase as any)
        .from('user_companies')
        .select('company_id, contracted_daily_hours, worker_category_id, roles(name)')
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
      setContractedDailyHours(data?.contracted_daily_hours || 8.0);
      setWorkerCategoryId(data?.worker_category_id || null);
      setUserRole(data?.roles?.name || null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loadWorkTypes = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('industry_work_types')
        .select('id, name, display_name_en, display_name_it, is_overtime, overtime_multiplier')
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Error loading work types:', error);
        return;
      }

      setWorkTypes((data as any) || []);
    } catch (err) {
      console.error('Error loading work types:', err);
    }
  };

  const loadPresentWorkStatus = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('work_status_types')
        .select('id')
        .eq('code', 'present')
        .single();

      if (error) {
        console.error('Error loading present work status:', error);
        return;
      }

      setPresentWorkStatusId(data?.id || null);
    } catch (err) {
      console.error('Error loading present work status:', err);
    }
  };

  const loadTrackingMode = async () => {
    if (!site) return;

    try {
      const selectedSite = locations.find((s) => s.id === site);
      if (!selectedSite?.project_id) return;

      const { data, error } = await (supabase as any)
        .from('projects')
        .select('work_hour_tracking_mode')
        .eq('id', selectedSite.project_id)
        .single();

      if (error) {
        console.error('Error loading tracking mode:', error);
        return;
      }

      setTrackingMode(data?.work_hour_tracking_mode || 'MAPPED_CATEGORIES');
    } catch (err) {
      console.error('Error loading tracking mode:', err);
    }
  };

  const loadCostCenters = async () => {
    if (!companyId) return;

    try {
      const selectedSite = locations.find((s) => s.id === site);
      if (!selectedSite?.project_id) {
        const { data, error } = await (supabase as any)
          .from('cost_centers')
          .select('id, code, name, description, hierarchy_level, parent_ids')
          .eq('company_id', companyId)
          .eq('is_active', true)
          .order('code');

        if (error) {
          console.error('Error loading cost centers:', error);
          return;
        }

        setCostCenters((data as any) || []);
        return;
      }

      const { data, error } = await (supabase as any)
        .from('cost_centers')
        .select('id, code, name, description, hierarchy_level, parent_ids')
        .eq('project_id', selectedSite.project_id)
        .eq('is_active', true)
        .order('hierarchy_level', { ascending: true })
        .order('code');

      if (error) {
        console.error('Error loading cost centers:', error);
        return;
      }

      const costCenterData = (data as any) || [];
      setCostCenters(costCenterData);

      const maxLevel = costCenterData.reduce(
        (max: number, cc: CostCenter) => Math.max(max, cc.hierarchy_level),
        0
      );
      setMaxHierarchyLevel(maxLevel);
    } catch (err) {
      console.error('Error loading cost centers:', err);
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

        if (typesError) {
          console.error('Error loading allowed location types:', typesError);
          Toast.show({
            type: 'error',
            text1: t('common.error'),
            text2: 'Failed to load location types',
          });
          return;
        }

        allowedTypeIds = (allowedTypes || []).map((t: any) => t.location_type_id);

        if (allowedTypeIds.length === 0) {
          setLocations([]);
          return;
        }
      }

      let query = (supabase as any)
        .from('locations')
        .select(`
          id,
          name,
          location_type_id,
          reference_type,
          reference_id,
          location_types!inner(name)
        `)
        .eq('company_id', companyId)
        .eq('is_active', true)
        .order('name');

      if (!isAdminOrOwner && workerCategoryId && allowedTypeIds.length > 0) {
        query = query.in('location_type_id', allowedTypeIds);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading locations:', error);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: 'Failed to load locations',
        });
        return;
      }

      const locationsData = (data as any) || [];

      const constructionSiteReferenceIds = locationsData
        .filter((loc: any) => loc.reference_type === 'construction_site' && loc.reference_id)
        .map((loc: any) => loc.reference_id);

      let projectIdMap: Record<string, string> = {};
      if (constructionSiteReferenceIds.length > 0) {
        const { data: csData } = await (supabase as any)
          .from('construction_sites')
          .select('id, project_id')
          .in('id', constructionSiteReferenceIds);

        if (csData) {
          projectIdMap = csData.reduce((acc: Record<string, string>, cs: any) => {
            if (cs.project_id) acc[cs.id] = cs.project_id;
            return acc;
          }, {});
        }
      }

      const formattedLocations: Location[] = locationsData.map((loc: any) => ({
        id: loc.id,
        name: loc.name,
        location_type_id: loc.location_type_id,
        location_type_name: loc.location_types?.name || '',
        reference_type: loc.reference_type,
        reference_id: loc.reference_id,
        project_id: loc.reference_id ? projectIdMap[loc.reference_id] || null : null,
      }));

      setLocations(formattedLocations);
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

  const loadMacroCategories = async () => {
    if (!companyId) return;

    try {
      setIsLoadingMacroCategories(true);
      const { data, error } = await (supabase as any)
        .from('work_hours_categories')
        .select('id, name, level, parent_id')
        .eq('company_id', companyId)
        .eq('level', 0)
        .order('name');

      if (error) {
        console.error('Error loading macro categories:', error);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: 'Failed to load work categories',
        });
        return;
      }

      setMacroCategories((data as any) || []);
    } catch (err) {
      console.error('Error loading macro categories:', err);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: 'Failed to load work categories',
      });
    } finally {
      setIsLoadingMacroCategories(false);
    }
  };

  const loadCategories = async (macroCategoryId: string) => {
    if (!companyId) return;

    if (categories[macroCategoryId]) {
      return categories[macroCategoryId];
    }

    try {
      const { data, error } = await (supabase as any)
        .from('work_hours_categories')
        .select('id, name, level, parent_id')
        .eq('company_id', companyId)
        .eq('parent_id', macroCategoryId)
        .eq('level', 1)
        .order('name');

      if (error) {
        console.error('Error loading categories:', error);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: 'Failed to load work sub-categories',
        });
        return [];
      }

      const loadedCategories = (data as any) || [];
      setCategories((prev) => ({ ...prev, [macroCategoryId]: loadedCategories }));
      return loadedCategories;
    } catch (err) {
      console.error('Error loading categories:', err);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: 'Failed to load work sub-categories',
      });
      return [];
    }
  };

  const addWorkEntry = () => {
    const newEntry: WorkEntry = {
      id: Math.random().toString(36).substring(2, 9),
      macroCategoryId: '',
      macroCategoryName: '',
      categoryId: '',
      categoryName: '',
      costCenterSupId: '',
      costCenterSupName: '',
      costCenterCatId: '',
      costCenterCatName: '',
      costCenterSubId: '',
      costCenterSubName: '',
      hours: '',
      didRain: false,
      rainHours: '',
    };
    setWorkEntries([...workEntries, newEntry]);
  };

  const updateWorkEntry = (id: string, updates: Partial<WorkEntry>) => {
    setWorkEntries(
      workEntries.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry))
    );
  };

  const handleMacroCategoryChange = async (entryId: string, macroCategoryId: string) => {
    const macro = macroCategories.find((m) => m.id === macroCategoryId);
    if (!macro) return;

    updateWorkEntry(entryId, {
      macroCategoryId,
      macroCategoryName: macro.name,
      categoryId: '',
      categoryName: '',
    });

    await loadCategories(macroCategoryId);
  };

  const handleCategoryChange = (entryId: string, categoryId: string, macroCategoryId: string) => {
    const categoryList = categories[macroCategoryId] || [];
    const category = categoryList.find((c) => c.id === categoryId);
    if (!category) return;

    updateWorkEntry(entryId, {
      categoryId,
      categoryName: category.name,
    });
  };

  const getCostCentersByLevel = (level: number): CostCenter[] => {
    return costCenters.filter((cc) => cc.hierarchy_level === level);
  };

  const getCostCentersByParent = (parentId: string, level: number): CostCenter[] => {
    return costCenters.filter(
      (cc) =>
        cc.hierarchy_level === level &&
        cc.parent_ids &&
        cc.parent_ids.includes(parentId)
    );
  };

  const handleSupCostCenterChange = (entryId: string, supId: string) => {
    const costCenter = costCenters.find((cc) => cc.id === supId);
    if (!costCenter) return;

    updateWorkEntry(entryId, {
      costCenterSupId: supId,
      costCenterSupName: `${costCenter.code} - ${costCenter.name}`,
      costCenterCatId: '',
      costCenterCatName: '',
      costCenterSubId: '',
      costCenterSubName: '',
    });
  };

  const handleCatCostCenterChange = (entryId: string, catId: string) => {
    const costCenter = costCenters.find((cc) => cc.id === catId);
    if (!costCenter) return;

    updateWorkEntry(entryId, {
      costCenterCatId: catId,
      costCenterCatName: `${costCenter.code} - ${costCenter.name}`,
      costCenterSubId: '',
      costCenterSubName: '',
    });
  };

  const handleSubCostCenterChange = (entryId: string, subId: string) => {
    const costCenter = costCenters.find((cc) => cc.id === subId);
    if (!costCenter) return;

    updateWorkEntry(entryId, {
      costCenterSubId: subId,
      costCenterSubName: `${costCenter.code} - ${costCenter.name}`,
    });
  };

  const removeWorkEntry = (id: string) => {
    setWorkEntries(workEntries.filter((e) => e.id !== id));
  };

  const getTotalHours = () => {
    return workEntries.reduce((sum, entry) => sum + (parseFloat(entry.hours) || 0), 0);
  };

  const isOvertime = () => getTotalHours() > contractedDailyHours;

  const getRegularAndOvertimeHours = () => {
    const total = getTotalHours();
    const regular = Math.min(total, contractedDailyHours);
    const overtime = Math.max(0, total - contractedDailyHours);
    return { regular, overtime };
  };

  const validateRainHours = (entry: WorkEntry) => {
    if (entry.didRain && entry.rainHours && entry.hours) {
      const rain = parseFloat(entry.rainHours);
      const total = parseFloat(entry.hours);
      return rain <= total;
    }
    return true;
  };

  const isSunday = (date: Date): boolean => {
    return date.getDay() === 0;
  };

  const isHoliday = (_date: Date): boolean => {
    return false;
  };

  const getDayTypeLabel = (): string => {
    const today = new Date();
    if (isHoliday(today)) return t('logHours.holiday');
    if (isSunday(today)) return t('logHours.sunday');
    return '';
  };

  const getDayTypeMultiplier = (): string => {
    const today = new Date();
    if (isHoliday(today)) return '2.0x';
    if (isSunday(today)) return '1.5x';
    return '';
  };

  const handleSubmit = async () => {
    if (!site) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('logHours.pleaseSelectSite'),
      });
      return;
    }

    if (workEntries.length === 0) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('logHours.pleaseAddWorkType'),
      });
      return;
    }

    for (const entry of workEntries) {
      if (trackingMode === 'MAPPED_CATEGORIES') {
        if (!entry.macroCategoryId || !entry.categoryId) {
          Toast.show({
            type: 'error',
            text1: t('common.error'),
            text2: 'Please select both macro category and category for all entries',
          });
          return;
        }
      } else if (trackingMode === 'DIRECT_COST_CENTER') {
        if (!entry.costCenterSupId) {
          Toast.show({
            type: 'error',
            text1: t('common.error'),
            text2: 'Please select SUP cost center for all entries',
          });
          return;
        }
        if (maxHierarchyLevel >= 2 && !entry.costCenterCatId) {
          Toast.show({
            type: 'error',
            text1: t('common.error'),
            text2: 'Please select CAT cost center for all entries',
          });
          return;
        }
        if (maxHierarchyLevel >= 3 && !entry.costCenterSubId) {
          Toast.show({
            type: 'error',
            text1: t('common.error'),
            text2: 'Please select SUB cost center for all entries',
          });
          return;
        }
      }

      if (!entry.hours || parseFloat(entry.hours) <= 0) {
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: t('logHours.pleaseFillHours'),
        });
        return;
      }

      if (!validateRainHours(entry)) {
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: t('logHours.rainHoursError'),
        });
        return;
      }
    }

    if (!companyId || !user?.id || !presentWorkStatusId) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: 'Missing required information',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const newHoursTotal = workEntries.reduce((sum, entry) => {
        return sum + (parseFloat(entry.hours) || 0);
      }, 0);

      const { data: existingHours } = await (supabase as any)
        .from('v_workers_total_hours_today')
        .select('total_hours')
        .eq('user_id', user.id)
        .single();

      const alreadyLoggedHours = existingHours?.total_hours || 0;
      const totalHoursIncludingNew = alreadyLoggedHours + newHoursTotal;

      if (totalHoursIncludingNew > 24) {
        setIsSubmitting(false);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: t('logHours.maxHoursExceeded'),
        });
        return;
      }

      const selectedLocation = locations.find((s) => s.id === site);
      if (!selectedLocation) {
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: 'Location not found',
        });
        return;
      }

      const { data: userCompany } = await (supabase as any)
        .from('user_companies')
        .select('hourly_rate')
        .eq('user_id', user.id)
        .eq('company_id', companyId)
        .single();

      const hourlyRate = userCompany?.hourly_rate || 0;

      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      const isSundayToday = isSunday(today);
      const isHolidayToday = isHoliday(today);

      for (const entry of workEntries) {
        const totalHours = parseFloat(entry.hours);
        const rainHours = entry.didRain ? parseFloat(entry.rainHours) || 0 : 0;

        const regularHours = Math.min(totalHours, contractedDailyHours);
        const overtimeHours = Math.max(0, totalHours - contractedDailyHours);

        const createWorkHoursRecord = async (hours: number, workTypeId: string) => {
          if (hours <= 0) return null;

          const workHoursRecord: any = {
            user_id: user.id,
            company_id: companyId,
            project_id: selectedLocation.project_id,
            location_id: selectedLocation.id,
            work_date: todayString,
            work_type_id: workTypeId,
            work_status_type_id: presentWorkStatusId,
            hours: hours,
            hourly_rate: hourlyRate,
            regular_hours: 0,
            overtime_hours: 0,
            holiday_hours: 0,
            night_hours: 0,
            sunday_hours: 0,
          };

          const workType = workTypes.find((wt) => wt.id === workTypeId);
          if (workType) {
            switch (workType.name) {
              case 'regular':
                workHoursRecord.regular_hours = hours;
                break;
              case 'overtime':
                workHoursRecord.overtime_hours = hours;
                break;
              case 'holiday':
                workHoursRecord.holiday_hours = hours;
                break;
              case 'sunday':
                workHoursRecord.sunday_hours = hours;
                break;
              case 'night':
                workHoursRecord.night_hours = hours;
                break;
              default:
                workHoursRecord.regular_hours = hours;
            }
          }

          if (trackingMode === 'MAPPED_CATEGORIES') {
            workHoursRecord.work_hour_macro_category_id = entry.macroCategoryId;
            workHoursRecord.work_hour_category_id = entry.categoryId;
            workHoursRecord.description = entry.categoryName;
          }

          if (trackingMode === 'DIRECT_COST_CENTER') {
            workHoursRecord.cost_center_sup_id = entry.costCenterSupId || null;
            workHoursRecord.cost_center_cat_id = entry.costCenterCatId || null;
            workHoursRecord.cost_center_sub_id = entry.costCenterSubId || null;
          }

          const { data: workHoursData, error: workHoursError } = await (supabase as any)
            .from('work_hours')
            .insert(workHoursRecord)
            .select()
            .single();

          if (workHoursError) {
            console.error('Error logging hours:', workHoursError);
            throw new Error(`Failed to log hours: ${workHoursError.message}`);
          }

          return workHoursData;
        };

        const insertConstructionDetails = async (workHoursId: string, includeRain: boolean = false) => {
          if (!trackingMode || (trackingMode !== 'DIRECT_COST_CENTER' && !includeRain)) {
            return;
          }

          const detailsRecord: any = {
            work_hours_id: workHoursId,
          };

          if (includeRain && rainHours > 0) {
            detailsRecord.rain_hours = rainHours;
          }

          if (trackingMode === 'DIRECT_COST_CENTER') {
            const finalCostCenterId = entry.costCenterSubId || entry.costCenterCatId || entry.costCenterSupId;
            detailsRecord.cost_center_id = finalCostCenterId;
          }

          const { error: detailsError } = await (supabase as any)
            .from('construction_work_hours_details')
            .insert(detailsRecord);

          if (detailsError) {
            console.error('Error logging details:', detailsError);
          }
        };

        let regularWorkTypeId: string;
        let overtimeWorkTypeId: string;

        if (isHolidayToday) {
          regularWorkTypeId = workTypes.find((wt) => wt.name === 'holiday')?.id || '';
          overtimeWorkTypeId = workTypes.find((wt) => wt.name === 'holiday')?.id || '';
        } else if (isSundayToday) {
          regularWorkTypeId = workTypes.find((wt) => wt.name === 'sunday')?.id || '';
          overtimeWorkTypeId = workTypes.find((wt) => wt.name === 'sunday')?.id || '';
        } else {
          regularWorkTypeId = workTypes.find((wt) => wt.name === 'regular')?.id || '';
          overtimeWorkTypeId = workTypes.find((wt) => wt.name === 'overtime')?.id || '';
        }

        const regularWorkHoursData = await createWorkHoursRecord(regularHours, regularWorkTypeId);
        if (regularWorkHoursData) {
          await insertConstructionDetails(regularWorkHoursData.id, true);
        }

        if (overtimeHours > 0) {
          const overtimeWorkHoursData = await createWorkHoursRecord(overtimeHours, overtimeWorkTypeId);
          if (overtimeWorkHoursData) {
            await insertConstructionDetails(overtimeWorkHoursData.id, false);
          }
        }
      }

      const successMessage = isOvertime()
        ? t('logHours.confirmed')
        : t('logHours.entriesLogged', { count: workEntries.length });

      await loadTodayLoggedHours();

      Toast.show({
        type: 'success',
        text1: t('common.success'),
        text2: successMessage,
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error:', error);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: error instanceof Error ? error.message : t('materialRequest.failed'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const locationOptions: SelectOption[] = locations.map((loc) => ({
    label: loc.name,
    value: loc.id,
  }));

  const macroCategoryOptions: SelectOption[] = macroCategories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  const renderWorkEntry = (entry: WorkEntry) => {
    const categoryOptions: SelectOption[] = (categories[entry.macroCategoryId] || []).map((cat) => ({
      label: cat.name,
      value: cat.id,
    }));

    const supOptions: SelectOption[] = getCostCentersByLevel(1).map((cc) => ({
      label: `${cc.code} - ${cc.name}`,
      value: cc.id,
    }));

    const catOptions: SelectOption[] = entry.costCenterSupId
      ? getCostCentersByParent(entry.costCenterSupId, 2).map((cc) => ({
          label: `${cc.code} - ${cc.name}`,
          value: cc.id,
        }))
      : [];

    const subOptions: SelectOption[] = entry.costCenterCatId
      ? getCostCentersByParent(entry.costCenterCatId, 3).map((cc) => ({
          label: `${cc.code} - ${cc.name}`,
          value: cc.id,
        }))
      : [];

    return (
      <Card key={entry.id} style={[styles.workEntryCard, goldGlow]}>
        <CardContent style={styles.workEntryContent}>
          <View style={styles.workEntryHeader}>
            <TextComponent variant="h4" style={styles.workEntryTitle}>
              {t('logHours.workEntry')}
            </TextComponent>
            <Pressable onPress={() => removeWorkEntry(entry.id)} style={styles.removeButton}>
              <Icon name="close" size={20} color={colors.mutedForeground} />
            </Pressable>
          </View>

          {trackingMode === 'MAPPED_CATEGORIES' && (
            <>
              <Select
                label={t('logHours.macroCategory')}
                placeholder={isLoadingMacroCategories ? t('common.loading') : t('logHours.selectMacroCategory')}
                value={entry.macroCategoryId}
                onValueChange={(value) => handleMacroCategoryChange(entry.id, value)}
                options={macroCategoryOptions}
                disabled={isLoadingMacroCategories}
              />
              {entry.macroCategoryId && (
                <Select
                  label={t('logHours.category')}
                  placeholder={t('logHours.selectCategory')}
                  value={entry.categoryId}
                  onValueChange={(value) => handleCategoryChange(entry.id, value, entry.macroCategoryId)}
                  options={categoryOptions}
                />
              )}
            </>
          )}

          {trackingMode === 'DIRECT_COST_CENTER' && (
            <>
              <Select
                label={t('logHours.supCostCenter')}
                placeholder={t('logHours.selectSup')}
                value={entry.costCenterSupId}
                onValueChange={(value) => handleSupCostCenterChange(entry.id, value)}
                options={supOptions}
              />
              {maxHierarchyLevel >= 2 && entry.costCenterSupId && (
                <Select
                  label={t('logHours.catCostCenter')}
                  placeholder={t('logHours.selectCat')}
                  value={entry.costCenterCatId}
                  onValueChange={(value) => handleCatCostCenterChange(entry.id, value)}
                  options={catOptions}
                />
              )}
              {maxHierarchyLevel >= 3 && entry.costCenterCatId && (
                <Select
                  label={t('logHours.subCostCenter')}
                  placeholder={t('logHours.selectSub')}
                  value={entry.costCenterSubId}
                  onValueChange={(value) => handleSubCostCenterChange(entry.id, value)}
                  options={subOptions}
                />
              )}
            </>
          )}

          <Input
            label={t('logHours.hoursWorked')}
            placeholder="8.0"
            value={entry.hours}
            onChangeText={(value) => updateWorkEntry(entry.id, { hours: value })}
            keyboardType="decimal-pad"
          />

          <View style={styles.rainSection}>
            <View style={styles.rainHeader}>
              <View>
                <TextComponent variant="label" style={styles.rainLabel}>
                  {t('logHours.didItRain')}
                </TextComponent>
                <TextComponent variant="caption" style={styles.rainDescription}>
                  {t('logHours.trackWeather')}
                </TextComponent>
              </View>
              <Switch
                value={entry.didRain}
                onValueChange={(value) => updateWorkEntry(entry.id, { didRain: value })}
              />
            </View>

            {entry.didRain && (
              <View style={styles.rainInputContainer}>
                <Input
                  label={t('logHours.rainHours')}
                  placeholder="2.0"
                  value={entry.rainHours}
                  onChangeText={(value) => updateWorkEntry(entry.id, { rainHours: value })}
                  keyboardType="decimal-pad"
                />
                {entry.rainHours &&
                  parseFloat(entry.rainHours) > parseFloat(entry.hours || '0') && (
                    <TextComponent variant="caption" style={styles.errorText}>
                      {t('logHours.rainHoursError')}
                    </TextComponent>
                  )}
              </View>
            )}
          </View>
        </CardContent>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.foreground} />
        </Pressable>
        <TextComponent variant="h2" style={styles.headerTitle}>
          {t('logHours.title')}
        </TextComponent>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.badgesContainer}>
        {site && (
          <Badge variant="outline">
            {trackingMode === 'MAPPED_CATEGORIES'
              ? t('logHours.categoryBasedTracking')
              : t('logHours.costCenterTracking')}
          </Badge>
        )}
        {getDayTypeLabel() && (
          <Badge variant="default">
            {getDayTypeLabel()} {getDayTypeMultiplier()}
          </Badge>
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <CardContent style={styles.cardContent}>
            <Select
              label={t('logHours.location')}
              placeholder={isLoadingSites ? t('logHours.loadingLocations') : t('logHours.selectLocation')}
              value={site}
              onValueChange={setSite}
              options={locationOptions}
              searchable
              disabled={isLoadingSites}
            />
            {!isLoadingSites && locations.length === 0 && (
              <TextComponent variant="caption" style={styles.errorText}>
                {t('logHours.noLocationsMessage')}
              </TextComponent>
            )}
          </CardContent>
        </Card>

        <Pressable onPress={addWorkEntry} style={styles.addWorkEntryButton}>
          <View style={styles.addWorkEntryIconContainer}>
            <Icon name="plus" size={28} color={colors.gold} />
          </View>
          <TextComponent variant="h4" style={styles.addWorkEntryText}>
            {t('logHours.addWorkEntry')}
          </TextComponent>
        </Pressable>

        {workEntries.map(renderWorkEntry)}

        {workEntries.length > 0 && (
          <Card style={styles.card}>
            <CardContent style={styles.cardContent}>
              {totalLoggedHours > 0 && (
                <View style={styles.loggedHoursContainer}>
                  <View style={styles.loggedHoursHeader}>
                    <TextComponent variant="body" style={styles.loggedHoursLabel}>
                      {t('logHours.alreadyLoggedToday')}
                    </TextComponent>
                    <TextComponent variant="h3" style={styles.loggedHoursTotal}>
                      {' '}{totalLoggedHours.toFixed(1)}h
                    </TextComponent>
                  </View>
                  {todayLoggedHours.map((entry, index) => (
                    <View key={index} style={styles.loggedHourItem}>
                      <View style={styles.loggedHourInfo}>
                        <TextComponent variant="body" style={styles.loggedHourLocation}>
                          {entry.location_name}
                        </TextComponent>
                        <TextComponent variant="caption" style={styles.loggedHourCategory}>
                          {entry.macro_category_name && entry.category_name && (
                            <>{entry.macro_category_name} → {entry.category_name}</>
                          )}
                          {entry.cost_center_sup_name && (
                            <>
                              {entry.cost_center_sup_name}
                              {entry.cost_center_cat_name && ` → ${entry.cost_center_cat_name}`}
                              {entry.cost_center_sub_name && ` → ${entry.cost_center_sub_name}`}
                            </>
                          )}
                        </TextComponent>
                      </View>
                      <TextComponent variant="body" style={styles.loggedHourHours}>
                        {entry.hours.toFixed(1)}h
                      </TextComponent>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.summaryHeader}>
                <TextComponent variant="h4" style={styles.summaryTitle}>
                  {totalLoggedHours > 0 ? t('logHours.addingNow') : t('logHours.totalHours')}
                </TextComponent>
                <View style={styles.summaryTotal}>
                  <TextComponent variant="h1" style={styles.summaryTotalValue}>
                    {getTotalHours().toFixed(1)}
                  </TextComponent>
                  <TextComponent variant="body" style={styles.summaryTotalUnit}>
                    {t('logHours.hours')}
                  </TextComponent>
                </View>
              </View>

              {totalLoggedHours > 0 && (
                <View style={styles.totalAfterContainer}>
                  <TextComponent variant="body" style={styles.totalAfterLabel}>
                    {t('logHours.totalAfterSubmission')}
                  </TextComponent>
                  <TextComponent variant="h2" style={styles.totalAfterValue}>
                    {' '}{(totalLoggedHours + getTotalHours()).toFixed(1)}h
                  </TextComponent>
                </View>
              )}

              <View style={styles.breakdownContainer}>
                <View style={styles.breakdownItem}>
                  <TextComponent variant="caption" style={styles.breakdownLabel}>
                    {t('logHours.contractedDailyHours')}
                  </TextComponent>
                  <TextComponent variant="h4" style={styles.breakdownValue}>
                    {contractedDailyHours.toFixed(1)}h
                  </TextComponent>
                </View>
                <View style={styles.breakdownItem}>
                  <TextComponent variant="caption" style={styles.breakdownLabel}>
                    {t('logHours.regularHours')}
                  </TextComponent>
                  <TextComponent variant="h4" style={styles.breakdownValue}>
                    {getRegularAndOvertimeHours().regular.toFixed(1)}h
                  </TextComponent>
                </View>
                {isOvertime() && (
                  <View style={styles.breakdownItemFull}>
                    <TextComponent variant="caption" style={styles.breakdownLabel}>
                      {t('logHours.overtimeHours')}
                    </TextComponent>
                    <TextComponent variant="h4" style={styles.overtimeValue}>
                      {getRegularAndOvertimeHours().overtime.toFixed(1)}h
                    </TextComponent>
                  </View>
                )}
              </View>

              {isOvertime() && (
                <View style={styles.overtimeWarning}>
                  <Badge variant="secondary">
                    {t('logHours.overtime')}
                  </Badge>
                  <TextComponent variant="caption" style={styles.overtimeWarningText}>
                    Hours exceeding {contractedDailyHours}h will be logged as overtime
                  </TextComponent>
                </View>
              )}

              <Button
                onPress={handleSubmit}
                loading={isSubmitting}
                disabled={isSubmitting || workEntries.length === 0}
                style={styles.submitButton}
                size="lg"
              >
                {isSubmitting ? t('common.submitting') : t('logHours.submitHours')}
              </Button>
            </CardContent>
          </Card>
        )}
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
  badgesContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardContent: {
    padding: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
  addWorkEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.gold,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  addWorkEntryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gold + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addWorkEntryText: {
    color: colors.gold,
    flex: 1,
  },
  workEntryCard: {
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: spacing.md,
  },
  workEntryContent: {
    padding: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    gap: spacing.md,
  },
  workEntryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workEntryTitle: {
    color: colors.gold,
    fontSize: 18,
    fontWeight: '600',
  },
  removeButton: {
    padding: spacing.xs,
  },
  rainSection: {
    gap: spacing.md,
  },
  rainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rainLabel: {
    color: colors.foreground,
  },
  rainDescription: {
    color: colors.mutedForeground,
    marginTop: spacing.xs,
  },
  rainInputContainer: {
    gap: spacing.xs,
  },
  errorText: {
    color: colors.destructive,
  },
  loggedHoursContainer: {
    backgroundColor: colors.background + '80',
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gold + '30',
    marginBottom: spacing.xl,
  },
  loggedHoursHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  loggedHoursLabel: {
    color: colors.mutedForeground,
    fontWeight: '500',
  },
  loggedHoursTotal: {
    color: colors.gold,
    fontWeight: 'bold',
  },
  loggedHourItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  loggedHourInfo: {
    flex: 1,
  },
  loggedHourLocation: {
    color: colors.foreground,
    fontWeight: '500',
  },
  loggedHourCategory: {
    color: colors.mutedForeground,
    marginTop: spacing.xs,
  },
  loggedHourHours: {
    color: colors.foreground,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    color: colors.foreground,
    fontSize: 18,
    fontWeight: '600',
  },
  summaryTotal: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  summaryTotalValue: {
    color: colors.gold,
    fontWeight: 'bold',
    fontSize: 32,
  },
  summaryTotalUnit: {
    color: colors.mutedForeground,
  },
  totalAfterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    backgroundColor: colors.gold + '20',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gold + '50',
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  totalAfterLabel: {
    color: colors.foreground,
    fontWeight: '600',
    fontSize: 16,
  },
  totalAfterValue: {
    color: colors.gold,
    fontWeight: 'bold',
    fontSize: 24,
  },
  breakdownContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    padding: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    backgroundColor: colors.background + '80',
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  breakdownItem: {
    flex: 1,
    minWidth: '45%',
    gap: spacing.xs,
  },
  breakdownItemFull: {
    width: '100%',
    gap: spacing.xs,
  },
  breakdownLabel: {
    color: colors.mutedForeground,
  },
  breakdownValue: {
    color: colors.foreground,
    fontWeight: '600',
  },
  overtimeValue: {
    color: colors.gold,
    fontWeight: '600',
  },
  overtimeWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    backgroundColor: colors.gold + '20',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gold + '50',
    marginBottom: spacing.md,
  },
  overtimeWarningText: {
    color: colors.mutedForeground,
    flex: 1,
  },
  submitButton: {
    marginTop: spacing.md,
  },
});
