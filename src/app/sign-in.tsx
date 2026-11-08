import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FormBanner } from '../components/FormBanner';
import { FormButton } from '../components/FormButton';
import { FormInput, TextInputRef } from '../components/FormInput';
import { ScreenContainer } from '../components/ScreenContainer';
import { Colors } from '../constants/colors';
import { SignInFormData, signInSchema } from '../schemas/authSchemas';

export default function SignInScreen() {
  const router = useRouter();
  const passwordRef = useRef<TextInputRef>(null);
  const [signedInAs, setSignedInAs] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: SignInFormData) => {
    // No backend for this assignment, so simulate a short network request.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSignedInAs(data.email);
    reset();
  };

  return (
    <ScreenContainer
      title="Welcome back"
      subtitle="Sign in with your email and password"
      icon="log-in-outline"
      footer={
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Pressable onPress={() => router.push('/sign-up')} accessibilityRole="link" hitSlop={8}>
            <Text style={styles.footerLink}>Sign up</Text>
          </Pressable>
        </View>
      }
    >
      {signedInAs && <FormBanner type="success" message={`Signed in as ${signedInAs}`} />}

      <FormInput
        control={control}
        name="email"
        label="Email"
        icon="mail-outline"
        required
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        onFocus={() => setSignedInAs(null)}
      />

      <FormInput
        control={control}
        name="password"
        label="Password"
        icon="lock-closed-outline"
        required
        password
        placeholder="Enter your password"
        autoComplete="password"
        textContentType="password"
        returnKeyType="go"
        ref={passwordRef}
        onSubmitEditing={() => isValid && handleSubmit(onSubmit)()}
      />

      <FormButton
        title="Sign In"
        icon="arrow-forward"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
        loading={isSubmitting}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerText: { fontSize: 14, color: Colors.textMuted },
  footerLink: { fontSize: 14, fontWeight: '700', color: Colors.primary },
});
