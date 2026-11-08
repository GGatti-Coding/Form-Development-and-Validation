import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FormBanner } from '../components/FormBanner';
import { FormButton } from '../components/FormButton';
import { FormInput, TextInputRef } from '../components/FormInput';
import { PasswordStrength } from '../components/PasswordStrength';
import { ScreenContainer } from '../components/ScreenContainer';
import { Colors } from '../constants/colors';
import { SignUpFormData, signUpSchema } from '../schemas/authSchemas';

export default function SignUpScreen() {
  const router = useRouter();
  const emailRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);
  const confirmRef = useRef<TextInputRef>(null);
  const [createdFor, setCreatedFor] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { isValid, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Watch the password so the strength meter updates as the user types
  const password = useWatch({ control, name: 'password' });

  // If the password changes after the user already typed a confirm password,
  // re-check the confirm field so the "do not match" message stays correct.
  useEffect(() => {
    if (getValues('confirmPassword')) {
      trigger('confirmPassword');
    }
  }, [password, getValues, trigger]);

  const onSubmit = async (data: SignUpFormData) => {
    // No backend for this assignment, so simulate a short network request.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setCreatedFor(data.fullName);
    reset();
  };

  return (
    <ScreenContainer
      title="Create your account"
      subtitle="Fill in your details to get started"
      icon="person-add-outline"
      footer={
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => router.push('/sign-in')} accessibilityRole="link" hitSlop={8}>
            <Text style={styles.footerLink}>Sign in</Text>
          </Pressable>
        </View>
      }
    >
      {createdFor && (
        <FormBanner type="success" message={`Account created for ${createdFor}`} />
      )}

      <FormInput
        control={control}
        name="fullName"
        label="Full name"
        icon="person-outline"
        required
        placeholder="Jane Doe"
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
        onFocus={() => setCreatedFor(null)}
      />

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
        ref={emailRef}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      <FormInput
        control={control}
        name="password"
        label="Password"
        icon="lock-closed-outline"
        required
        password
        placeholder="Create a password"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="next"
        ref={passwordRef}
        onSubmitEditing={() => confirmRef.current?.focus()}
      />

      <PasswordStrength password={password} />

      <FormInput
        control={control}
        name="confirmPassword"
        label="Confirm password"
        icon="shield-checkmark-outline"
        required
        password
        placeholder="Re-enter your password"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="go"
        ref={confirmRef}
        onSubmitEditing={() => isValid && handleSubmit(onSubmit)()}
      />

      <FormButton
        title="Create Account"
        icon="checkmark"
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