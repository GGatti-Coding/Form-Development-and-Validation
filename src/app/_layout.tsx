import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Colors } from '../constants/colors'

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Form Hub' }} />
        <Stack.Screen name="employee" options={{ title: 'Employee Information' }} />
        <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
        <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
      </Stack>
    </>
  );
}