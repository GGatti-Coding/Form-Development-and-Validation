import { z } from 'zod';

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

// ---------- Sign Up (Member 3) ----------
// Add signUpSchema and SignUpFormData below.
// Use passwordRules from './passwordRules' for the strength rules and
// .refine() to check that confirmPassword matches password.
