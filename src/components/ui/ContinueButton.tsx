import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '../../constants/colors';

interface Props {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
  style?: ViewStyle;
}
export default function ContinueButton({ onPress, title = 'Tiếp tục →', disabled, style }: Props) {
  return (
    <View style={[styles.wrapper, style]}>
      <TouchableOpacity
        style={[styles.button, disabled && { opacity: 0.5 }]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    padding: 16,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 