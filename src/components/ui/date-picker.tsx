import React, { useState } from 'react';
import { View, StyleSheet, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { ModalComponent } from './modal';
import { Button } from './button';
import { TextComponent } from './text';
import { colors, spacing, borderRadius } from '@/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface DatePickerProps {
  value?: Date;
  onValueChange: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onValueChange,
  placeholder = 'Pick a date',
  label,
  minimumDate,
  maximumDate,
  disabled = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date());

  const handleConfirm = () => {
    onValueChange(tempDate);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setTempDate(value || new Date());
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {label && (
        <TextComponent variant="label" style={styles.label}>
          {label}
        </TextComponent>
      )}
      <Pressable
        style={[styles.picker, disabled && styles.disabled]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <View style={styles.pickerContent}>
          <Icon name="calendar-outline" size={20} color={value ? colors.gold : colors.mutedForeground} />
          <TextComponent
            variant="body"
            style={[styles.pickerText, !value && styles.placeholder]}
          >
            {value ? format(value, 'PPP') : placeholder}
          </TextComponent>
        </View>
      </Pressable>

      {Platform.OS === 'ios' ? (
        <ModalComponent visible={modalVisible} onClose={handleCancel}>
          <View style={styles.modalContent}>
            <TextComponent variant="h3" style={styles.modalTitle}>
              {label || 'Select Date'}
            </TextComponent>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setTempDate(selectedDate);
                }
              }}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              style={styles.datePicker}
            />
            <View style={styles.modalButtons}>
              <Button variant="outline" onPress={handleCancel} style={styles.modalButton}>
                Cancel
              </Button>
              <Button onPress={handleConfirm} style={styles.modalButton}>
                Confirm
              </Button>
            </View>
          </View>
        </ModalComponent>
      ) : (
        modalVisible && (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setModalVisible(false);
              if (event.type === 'set' && selectedDate) {
                onValueChange(selectedDate);
              }
            }}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    color: colors.foreground,
  },
  picker: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.input,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 48,
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  pickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pickerText: {
    flex: 1,
    color: colors.foreground,
  },
  placeholder: {
    color: colors.mutedForeground,
  },
  modalContent: {
    padding: spacing.lg,
    minWidth: 300,
  },
  modalTitle: {
    color: colors.gold,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  datePicker: {
    height: 200,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  modalButton: {
    flex: 1,
  },
});
