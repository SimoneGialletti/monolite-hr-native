import React from 'react';
import { Switch, StyleSheet, View } from 'react-native';
import { colors } from '@/theme';
import { TextComponent } from './text';

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const SwitchComponent: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <TextComponent variant="body" style={styles.label}>
          {label}
        </TextComponent>
      )}
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: colors.muted,
          true: colors.gold,
        }}
        thumbColor={colors.foreground}
        ios_backgroundColor={colors.muted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    color: colors.foreground,
  },
});
