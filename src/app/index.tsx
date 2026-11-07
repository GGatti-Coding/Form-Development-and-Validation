import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../constants/colors';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const FORMS: {
  href: '/employee' | '/sign-in' | '/sign-up';
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    href: '/employee',
    title: 'Employee Information',
    description: 'Name, ID, email, phone, postal code and job title',
    icon: 'people-outline',
  },
  {
    href: '/sign-in',
    title: 'Sign In',
    description: 'Log in with your email and password',
    icon: 'log-in-outline',
  },
  {
    href: '/sign-up',
    title: 'Sign Up',
    description: 'Create an account with a strong password',
    icon: 'person-add-outline',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Ionicons name="document-text-outline" size={40} color={Colors.primary} />
        <Text style={styles.heading}>Advanced Forms</Text>
        <Text style={styles.subheading}>
          Built with React Hook Form and Zod validation. Choose a form to get started.
        </Text>
      </View>

      {FORMS.map((form) => (
        <Pressable
          key={form.href}
          onPress={() => router.push(form.href)}
          accessibilityRole="button"
          accessibilityLabel={form.title}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View style={styles.iconBubble}>
            <Ionicons name={form.icon} size={26} color={Colors.primary} />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{form.title}</Text>
            <Text style={styles.cardDescription}>{form.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={Colors.textMuted} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 40 },
  hero: { alignItems: 'center', marginVertical: 24, gap: 8 },
  heading: { fontSize: 26, fontWeight: '800', color: Colors.text },
  subheading: {
    fontSize: 15,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardPressed: { backgroundColor: Colors.primarySoft, borderColor: Colors.primary },
  iconBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: Colors.text },
  cardDescription: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
});