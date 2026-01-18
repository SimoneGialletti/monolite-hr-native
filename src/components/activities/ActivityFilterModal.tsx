import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ModalComponent } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectOption } from '@/components/ui/select';
import { TextComponent } from '@/components/ui/text';
import { colors, spacing, borderRadius } from '@/theme';

export interface ActivityFilters {
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  status: 'all' | 'pending' | 'approved' | 'rejected';
}

export const defaultFilters: ActivityFilters = {
  dateFrom: undefined,
  dateTo: undefined,
  status: 'all',
};

export interface ActivityFilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: ActivityFilters;
  onApply: (filters: ActivityFilters) => void;
  onReset: () => void;
  showStatusFilter: boolean;
}

export const ActivityFilterModal: React.FC<ActivityFilterModalProps> = ({
  visible,
  onClose,
  filters,
  onApply,
  onReset,
  showStatusFilter,
}) => {
  const { t } = useTranslation();
  const [localFilters, setLocalFilters] = useState<ActivityFilters>(filters);

  // Sync local filters when modal opens or external filters change
  useEffect(() => {
    if (visible) {
      setLocalFilters(filters);
    }
  }, [visible, filters]);

  const statusOptions: SelectOption[] = [
    { label: t('myActivities.filter.allStatuses'), value: 'all' },
    { label: t('myActivities.pending'), value: 'pending' },
    { label: t('myActivities.approved'), value: 'approved' },
    { label: t('myActivities.rejected'), value: 'rejected' },
  ];

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters(defaultFilters);
    onReset();
    onClose();
  };

  const handleDateFromChange = (date: Date | undefined) => {
    setLocalFilters((prev) => ({ ...prev, dateFrom: date }));
  };

  const handleDateToChange = (date: Date | undefined) => {
    setLocalFilters((prev) => ({ ...prev, dateTo: date }));
  };

  const handleStatusChange = (value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      status: value as ActivityFilters['status'],
    }));
  };

  return (
    <ModalComponent visible={visible} onClose={onClose} containerStyle={styles.modalContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TextComponent variant="h3" style={styles.title}>
            {t('myActivities.filter.title')}
          </TextComponent>
        </View>

        <View style={styles.content}>
          <DatePicker
            label={t('myActivities.filter.dateFrom')}
            value={localFilters.dateFrom}
            onValueChange={handleDateFromChange}
            placeholder={t('myActivities.filter.selectDate')}
            maximumDate={localFilters.dateTo}
          />

          <DatePicker
            label={t('myActivities.filter.dateTo')}
            value={localFilters.dateTo}
            onValueChange={handleDateToChange}
            placeholder={t('myActivities.filter.selectDate')}
            minimumDate={localFilters.dateFrom}
          />

          {showStatusFilter && (
            <Select
              label={t('myActivities.filter.status')}
              value={localFilters.status}
              onValueChange={handleStatusChange}
              options={statusOptions}
              placeholder={t('myActivities.filter.allStatuses')}
            />
          )}
        </View>

        <View style={styles.buttons}>
          <Button variant="outline" onPress={handleReset} style={styles.button}>
            {t('myActivities.filter.reset')}
          </Button>
          <Button onPress={handleApply} style={styles.button}>
            {t('myActivities.filter.apply')}
          </Button>
        </View>
      </ScrollView>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '90%',
    maxWidth: 400,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.gold,
    textAlign: 'center',
  },
  content: {
    marginBottom: spacing.lg,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});
