import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../constants/colors';
import type { IconName } from './FormInput';

type Props = {
  title?: string;
  subtitle?: string;
  icon?: IconName;
  children: React.ReactNode;
  /** Content under the card: "Don't have an account? Sign up" */
  footer?: React.ReactNode;
};

/**
 * Wrapper for every form screen: keyboard-aware scrolling, an optional header
 * with an icon, and a white card holding the fields.
 */
export function ScreenContainer({ title, subtitle, icon, children, footer }: Props) {
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {(title || icon) && (
          <View style={styles.header}>
            {icon && (
              <View style={styles.iconBubble}>
                <Ionicons name={icon} size={28} color={Colors.primary} />
              </View>
            )}
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        )}

        <View style={styles.card}>{children}</View>

        {footer && <View style={styles.footer}>{footer}</View>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 60 },
  header: { alignItems: 'center', marginVertical: 16, gap: 6 },
  iconBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: { fontSize: 24, fontWeight: '800', color: Colors.text },
  subtitle: { fontSize: 14, color: Colors.textMuted, textAlign: 'center' },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  footer: { marginTop: 20, alignItems: 'center' },
});
