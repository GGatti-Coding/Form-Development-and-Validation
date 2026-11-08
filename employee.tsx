import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {Alert} from "react-native";
import {useRouter} from "expo-router";
 
import { FormBanner } from "../components/FormBanner";
import { FormButton } from "../components/FormButton";
import { FormInput, TextInputRef } from "../components/FormInput";
import { ScreenContainer } from "../components/ScreenContainer";
import { EmployeeFormData, employeeSchema } from "../schemas/employeeSchema";

export default function EmployeeScreen() {
  const [savedFor, setSavedFor] = useState<string | null>(null);
  const router = useRouter();

  // Setup React Hook Form with Zod validation
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    mode: "onChange", // Validates fields when the user clicks away
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

  const onSubmit = async (data: EmployeeFormData) => {
    // In a real app, you would POST this to an API
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Valid Employee Data Submitted:", data);
    setSavedFor(`${data.firstName} ${data.lastName}`);
    reset();
  };

  return (
    <ScreenContainer
      title="Employee details"
      subtitle="Enter the employee's contact information"
      icon="people-outline"
    >
      {savedFor && (
        <FormBanner type="success" message={`Employee profile saved for ${savedFor}`} />
      )}
 
      <FormInput
        control={control}
        name="firstName"
        label="First Name"
        icon="person-outline"
        placeholder="Jane"
        required
        autoCapitalize="words"
        autoComplete="given-name"
        textContentType="givenName"
        returnKeyType="next"
        onSubmitEditing={() => lastNameRef.current?.focus()}
        onFocus={() => setSavedFor(null)}
      />
 
      <FormInput
        control={control}
        name="lastName"
        label="Last Name"
        icon="people-outline"
        placeholder="Doe"
        required
        autoCapitalize="words"
        autoComplete="family-name"
        textContentType="familyName"
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
        autoComplete="email"
        textContentType="emailAddress"
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
        autoComplete="tel"
        textContentType="telephoneNumber"
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
        autoComplete="postal-code"
        textContentType="postalCode"
        returnKeyType="done"
        ref={postalCodeRef}
        onSubmitEditing={() => isValid && handleSubmit(onSubmit)()}
      />
 
      <FormButton
        title="Save Employee"
        icon="save-outline"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
        loading={isSubmitting}
      />
    </ScreenContainer>
  );
}