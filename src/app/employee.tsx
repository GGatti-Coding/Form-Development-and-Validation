import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";

import { FormButton } from "../components/FormButton";
import { FormInput, TextInputRef } from "../components/FormInput";
import { Colors } from "../constants/colors";
import { EmployeeFormData, employeeSchema } from "../schemas/employeeSchema";

export default function EmployeeScreen() {
  const router = useRouter();

  // Setup React Hook Form with Zod validation
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    mode: "onTouched", // Validates fields when the user clicks away
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      postalCode: "",
    },
  });

  // Refs to allow the "Next" button on the keyboard to jump to the next input
  const lastNameRef = useRef<TextInputRef>(null);
  const emailRef = useRef<TextInputRef>(null);
  const phoneRef = useRef<TextInputRef>(null);
  const postalCodeRef = useRef<TextInputRef>(null);

  const onSubmit = (data: EmployeeFormData) => {
    // In a real app, you would POST this to an API
    console.log("Valid Employee Data Submitted:", data);
    Alert.alert(
      "Success",
      `Employee profile for ${data.firstName} ${data.lastName} created!`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <FormInput
            control={control}
            name="firstName"
            label="First Name"
            icon="person-outline"
            placeholder="Jane"
            required
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current?.focus()}
          />

          <FormInput
            control={control}
            name="lastName"
            label="Last Name"
            icon="people-outline"
            placeholder="Doe"
            required
            autoCapitalize="words"
            returnKeyType="next"
            ref={lastNameRef}
            onSubmitEditing={() => emailRef.current?.focus()}
          />

          <FormInput
            control={control}
            name="email"
            label="Work Email"
            icon="mail-outline"
            placeholder="jane.doe@company.com"
            required
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => phoneRef.current?.focus()}
          />

          <FormInput
            control={control}
            name="phone"
            label="Phone Number"
            icon="call-outline"
            placeholder="403-555-0198"
            required
            keyboardType="phone-pad"
            returnKeyType="next"
            ref={phoneRef}
            onSubmitEditing={() => postalCodeRef.current?.focus()}
          />

          <FormInput
            control={control}
            name="postalCode"
            label="Postal Code"
            icon="map-outline"
            placeholder="T2M 4L8"
            required
            autoCapitalize="characters"
            returnKeyType="done"
            ref={postalCodeRef}
            onSubmitEditing={handleSubmit(onSubmit)}
          />

          <FormButton
            title="Save Employee"
            icon="save-outline"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
            loading={isSubmitting}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 40 },
  formContainer: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 16,
  },
});