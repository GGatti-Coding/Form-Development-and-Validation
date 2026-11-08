import { z } from 'zod';
import { passwordRules } from './passwordRules';

// ---------- Sign In (Ahmed Yassine Messaoudi) ----------

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .pipe(z.email('Enter a valid email address')),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(50, 'Full name must be 50 characters or fewer')
      .regex(
        /^[A-Za-z][A-Za-z\s'-]*$/,
        'Full name can only contain letters, spaces, hyphens and apostrophes'
      ),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .pipe(z.email('Enter a valid email address')),
    // Starts with required + max length, then adds each strength rule
    password: passwordRules.reduce(
      (schema, rule) => schema.regex(rule.regex, rule.message),
      z
        .string()
        .min(1, 'Password is required')
        .max(64, 'Password must be 64 characters or fewer')
    ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // shows the error under the confirm field
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;