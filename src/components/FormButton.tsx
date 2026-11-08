import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "../constants/colors";
import type { IconName } from "./FormInput";

type Props = {
  title: string;
  onPress: () => void;
  /** Greyed out and not pressable: disabled={!isValid} */
  disabled?: boolean;
  /** Shows a spinner: loading={isSubmitting} */
  loading?: boolean;
  /** "primary" = filled, "secondary" = outlined (like a Reset button) */
  variant?: "primary" | "secondary";
  icon?: IconName;
};

/**
 * Button with enabled, pressed, disabled and loading states.
 * Usage: <FormButton title="Sign In" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
 */
export function FormButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  icon,
}: Props) {
  const isDisabled = disabled || loading;
  const primary = variant === "primary";
  const contentColor = primary
    ? "#FFFFFF"
    : isDisabled
      ? Colors.disabled
      : Colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        primary ? styles.primary : styles.secondary,
        pressed &&
          !isDisabled &&
          (primary ? styles.primaryPressed : styles.secondaryPressed),
        isDisabled &&
          (primary ? styles.primaryDisabled : styles.secondaryDisabled),
      ]}
    >
      {loading ? (
        <ActivityIndicator color={contentColor} />
      ) : (
        <View style={styles.content}>
          {icon && <Ionicons name={icon} size={18} color={contentColor} />}
          <Text style={[styles.text, { color: contentColor }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginTop: 8,
  },
  content: { flexDirection: "row", alignItems: "center", gap: 8 },
  text: { fontSize: 16, fontWeight: "700" },
  primary: { backgroundColor: Colors.primary },
  primaryPressed: {
    backgroundColor: Colors.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  primaryDisabled: { backgroundColor: Colors.disabled },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  secondaryPressed: { backgroundColor: Colors.primarySoft },
  secondaryDisabled: { borderColor: Colors.disabled },
});
