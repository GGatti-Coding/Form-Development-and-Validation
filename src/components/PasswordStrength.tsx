import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/colors";
import { passwordRules } from "../schemas/passwordRules";

const levels = [
  { label: "Too weak", color: Colors.error },
  { label: "Weak", color: Colors.error },
  { label: "Fair", color: Colors.warning },
  { label: "Good", color: Colors.primary },
  { label: "Strong", color: Colors.success },
];

/**
 * Strength meter and live checklist for the Sign-Up form.
 *   const password = useWatch({ control, name: 'password' });
 *   <PasswordStrength password={password} />
 */
export function PasswordStrength({ password = "" }: { password?: string }) {
  if (!password) return null;

  const results = passwordRules.map((rule) => rule.regex.test(password));
  const passed = results.filter(Boolean).length;
  const level = levels[Math.max(0, passed - 1)];

  return (
    <View style={styles.wrapper}>
      <View style={styles.barRow}>
        {passwordRules.map((rule, i) => (
          <View
            key={rule.label}
            style={[
              styles.segment,
              { backgroundColor: i < passed ? level.color : Colors.track },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.levelText, { color: level.color }]}>
        {level.label}
      </Text>

      {passwordRules.map((rule, i) => (
        <View key={rule.label} style={styles.ruleRow}>
          <Ionicons
            name={results[i] ? "checkmark-circle" : "ellipse-outline"}
            size={14}
            color={results[i] ? Colors.success : Colors.textMuted}
          />
          <Text
            style={[styles.ruleText, results[i] && { color: Colors.success }]}
          >
            {rule.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: -8, marginBottom: 16 },
  barRow: { flexDirection: "row", gap: 4 },
  segment: { flex: 1, height: 5, borderRadius: 3 },
  levelText: { fontSize: 12, fontWeight: "700", marginVertical: 4 },
  ruleRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  ruleText: { fontSize: 12, color: Colors.textMuted },
});
