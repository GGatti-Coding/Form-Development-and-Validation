import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../constants/colors';

type Props = {
  type: 'success' | 'error';
  message: string;
};

/**
 * Message box for the result of a submit:
 * {done && <FormBanner type="success" message="Employee saved!" />}
 */
export function FormBanner({ type, message }: Props) {
  const ok = type === 'success';
  const color = ok ? Colors.success : Colors.error;

  return (
    <View
      style={[styles.box, { borderColor: color, backgroundColor: ok ? '#F0FDF4' : Colors.errorBackground }]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <Ionicons name={ok ? 'checkmark-circle' : 'close-circle'} size={20} color={color} />
      <Text style={[styles.text, { color }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
  },
  text: { flex: 1, fontSize: 14, fontWeight: '600' },
});
