/**
 * Password strength rules used by both the Sign-Up Zod schema and the
 * <PasswordStrength /> checklist, so the two always match.
 *
 * In a Zod schema:
 *   password: passwordRules.reduce(
 *     (schema, rule) => schema.regex(rule.regex, rule.message),
 *     z.string().min(1, 'Password is required').max(64, 'Password must be 64 characters or fewer'),
 *   ),
 */
export const passwordRules = [
  { label: 'At least 8 characters', regex: /.{8,}/, message: 'Password must be at least 8 characters' },
  { label: 'One uppercase letter', regex: /[A-Z]/, message: 'Password needs an uppercase letter' },
  { label: 'One lowercase letter', regex: /[a-z]/, message: 'Password needs a lowercase letter' },
  { label: 'One number', regex: /[0-9]/, message: 'Password needs a number' },
  { label: 'One special character', regex: /[^A-Za-z0-9]/, message: 'Password needs a special character' },
] as const;
