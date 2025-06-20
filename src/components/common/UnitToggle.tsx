import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS } from '../../constants/colors';

interface UnitToggleProps {
  options: [string, string];
  selected: string;
  onSelect: (unit: string) => void;
  style?: ViewStyle;
}

export default function UnitToggle({ options, selected, onSelect, style }: UnitToggleProps) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.unitButton, selected === options[0] && styles.unitButtonActive]}
        onPress={() => onSelect(options[0])}
      >
        <Text style={[styles.unitButtonText, selected === options[0] && styles.unitButtonTextActive]}>
          {options[0]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.unitButton, selected === options[1] && styles.unitButtonActive]}
        onPress={() => onSelect(options[1])}
      >
        <Text style={[styles.unitButtonText, selected === options[1] && styles.unitButtonTextActive]}>
          {options[1]}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  unitButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: COLORS.overlay,
  },
  unitButtonActive: {
    backgroundColor: COLORS.background,
  },
  unitButtonText: {
    fontSize: 18,
    color: COLORS.text,
  },
  unitButtonTextActive: {
    color: COLORS.primary,
  },
}); 