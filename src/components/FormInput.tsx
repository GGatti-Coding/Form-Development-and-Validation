import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { Colors } from "../constants/colors";

export type IconName = React.ComponentProps<typeof Ionicons>["name"];
/** The TextInput instance type (has .focus(), .blur(), .clear()) */
export type TextInputRef = React.ComponentRef<typeof TextInput>;

export type FormInputProps<T extends FieldValues> = Omit<
  TextInputProps,
  "value" | "onChangeText" | "defaultValue"
> & {
  /** 'control' from useForm() */
  control: Control<T>;
  /** Field name, must match a key in the Zod schema */
  name: Path<T>;
  label: string;
  /** Ionicons name shown on the left: "mail-outline" */
  icon?: IconName;
  /** Grey helper text shown under the input when there is no error */
  hint?: string;
  /** Adds a red * after the label */
  required?: boolean;
  /** Hides the text and adds a show/hide eye button */
  password?: boolean;
  /** Optional ref: to focus this input from the previous field */
  ref?: React.Ref<TextInputRef>;
};

/**
 * Text input connected to React Hook Form. Error messages come from the Zod
 * schema through zodResolver, so this component only displays them.
 *
 * States: default, focused (indigo border), error (red border, red tint, message),
 * valid (green check once the field has a value and no error).
 */
export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  icon,
  hint,
  required,
  password,
  onFocus,
  onBlur,
  editable = true,
  style,
  ref,
  ...rest
}: FormInputProps<T>) {
  const {
    field,
    fieldState: { error, isDirty },
  } = useController({ control, name });

  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  const value = field.value == null ? "" : String(field.value);
  const hasError = !!error;
  const isValid = !hasError && isDirty && value.length > 0;

  const iconColor = hasError
    ? Colors.error
    : focused
      ? Colors.primary
      : Colors.textMuted;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <View
        style={[
          styles.inputRow,
          focused && styles.inputFocused,
          hasError && styles.inputError,
          !editable && styles.inputDisabled,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={iconColor}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          ref={(el) => {
            // Give the input to React Hook Form (so it can focus the first error)
            // and to the caller's ref, if one was passed.
            field.ref(el);
            if (typeof ref === "function") ref(el);
            else if (ref)
              (ref as React.RefObject<TextInputRef | null>).current = el;
          }}
          value={value}
          onChangeText={field.onChange}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            field.onBlur();
            onBlur?.(e);
          }}
          secureTextEntry={password && hidden}
          autoCapitalize={password ? "none" : rest.autoCapitalize}
          autoCorrect={password ? false : rest.autoCorrect}
          placeholderTextColor={Colors.placeholder}
          editable={editable}
          accessibilityLabel={label}
          accessibilityHint={error?.message ?? hint}
          {...rest}
          style={[styles.input, style]}
        />

        {password ? (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
          >
            <Ionicons
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={Colors.textMuted}
            />
          </Pressable>
        ) : hasError ? (
          <Ionicons name="alert-circle" size={20} color={Colors.error} />
        ) : isValid ? (
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
        ) : null}
      </View>

      {hasError ? (
        <View style={styles.messageRow} accessibilityLiveRegion="polite">
          <Ionicons name="warning-outline" size={14} color={Colors.error} />
          <Text style={styles.errorText}>{error?.message}</Text>
        </View>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 6,
  },
  required: { color: Colors.error },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 50,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },
  inputFocused: {
    borderColor: Colors.borderFocus,
    backgroundColor: Colors.primarySoft,
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBackground,
  },
  inputDisabled: { backgroundColor: Colors.track },
  leftIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, color: Colors.text, paddingVertical: 12 },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  errorText: { flex: 1, fontSize: 13, color: Colors.error },
  hintText: { marginTop: 6, fontSize: 13, color: Colors.textMuted },
});
