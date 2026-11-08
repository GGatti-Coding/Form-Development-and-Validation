# Advanced Forms with React Hook Form & Zod (Expo)

A React Native app built with **Expo** and **TypeScript** that demonstrates professional form development: state management with **React Hook Form**, schema validation with **Zod**, and a clean, consistent UI. Built as a group assignment for SAIT.

## Features

- **Employee Information form**: 7 fields with format, required and min/max length validation
- **Sign-In form**: email and password with validation
- **Sign-Up form**: full name, email, password, confirm password with strength rules and password matching
- **Stack navigation** with a home screen linking to all three forms
- Live validation (`mode: 'onChange'`), submit button disabled until the form is valid
- Input focus styling, error styling (red border, tinted background, icon and message), password show/hide toggle
- Icons from `@expo/vector-icons` (Ionicons)

## Tech Stack

| Purpose | Library |
| --- | --- |
| Framework | Expo (React Native) + TypeScript |
| Routing / navigation | Expo Router (Stack) |
| Form state | `react-hook-form` |
| Validation | `zod` |
| Zod to RHF bridge | `@hookform/resolvers` |
| Icons | `@expo/vector-icons` |

## Project Structure

```
.
├── src/
│   ├── app/                      # Screens (Expo Router file-based routes)
│   │   ├── _layout.tsx           # Root Stack navigator and header styling
│   │   ├── index.tsx             # Home screen linking to all forms
│   │   ├── employee.tsx          # Employee Information form
│   │   ├── sign-in.tsx           # Sign-In form
│   │   └── sign-up.tsx           # Sign-Up form
│   ├── components/               # Reusable UI shared by every form
│   │   ├── FormInput.tsx         # RHF-connected input with icon, focus, error and valid styles
│   │   ├── FormButton.tsx        # Button with enabled / pressed / disabled / loading states
│   │   ├── ScreenContainer.tsx   # Keyboard-aware scrolling wrapper with header and card
│   │   ├── FormBanner.tsx        # Success / error message shown after submitting
│   │   └── PasswordStrength.tsx  # Password strength meter and rule checklist
│   ├── schemas/                  # Zod schemas and inferred types
│   │   ├── employeeSchema.ts
│   │   ├── authSchemas.ts        # Sign-in and sign-up schemas
│   │   └── passwordRules.ts      # Password rules shared by the sign-up schema and checklist
│   └── constants/
│       └── colors.ts             # Colour palette
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- The **Expo Go** app on a phone (iOS / Android), or an iOS Simulator / Android Emulator

### Install and run

```bash
git clone <repository-url>
cd <project-name>
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for the Android emulator, or scan the QR code with Expo Go.

### How the project was created

```bash
npx create-expo-app@latest <project-name>
cd <project-name>
npm install react-hook-form zod @hookform/resolvers
```

## Validation Rules

### Employee Information

| Field | Rules |
| --- | --- |
| First name / Last name | Required, 2 to 30 characters, letters, spaces, hyphens and apostrophes only |
| Employee ID | Required, format `EMP-` followed by 4 to 6 digits (e.g. `EMP-1234`) |
| Email | Required, valid email format, max 80 characters |
| Phone | Required, valid 10-digit number (e.g. `403-555-1234`, `(403) 555-1234`) |
| Postal code | Required, valid Canadian postal code (e.g. `T2M 0L4`) |
| Job title | Required, 3 to 50 characters |

### Sign In

| Field | Rules |
| --- | --- |
| Email | Required, valid email format |
| Password | Required, at least 8 characters |

### Sign Up

| Field | Rules |
| --- | --- |
| Full name | Required, 2 to 50 characters, letters, spaces, hyphens and apostrophes only |
| Email | Required, valid email format |
| Password | Required, 8 to 64 characters, with an uppercase letter, a lowercase letter, a number and a special character |
| Confirm password | Required, must match password |

## Shared Components

All three forms are built from the same components in `src/components/`, so they look and behave the same.

| Component | Purpose | Key props |
| --- | --- | --- |
| `ScreenContainer` | Wraps each form screen: keyboard-aware scrolling (iOS and Android), optional header with icon, white card for the fields | `title`, `subtitle`, `icon`, `footer` |
| `FormInput` | Text input connected to React Hook Form. Indigo border on focus; red border, tinted background, icon and Zod message on error; green check when valid; show/hide toggle for passwords | `control`, `name`, `label`, `icon`, `required`, `password`, `hint`, plus any `TextInput` prop |
| `FormButton` | Submit button with pressed, disabled and loading states | `title`, `onPress`, `disabled`, `loading`, `variant`, `icon` |
| `FormBanner` | Success or error message after submitting | `type`, `message` |
| `PasswordStrength` | Strength bar and live checklist of password rules | `password` |

Example:

```tsx
<ScreenContainer title="Welcome back" icon="log-in-outline">
  <FormInput control={control} name="email" label="Email" icon="mail-outline" required
    keyboardType="email-address" autoCapitalize="none" />
  <FormButton title="Sign In" onPress={handleSubmit(onSubmit)} disabled={!isValid} loading={isSubmitting} />
</ScreenContainer>
```

## Design Decisions

- **Validation mode:** forms use `mode: 'onChange'`, so errors appear as the user types and `formState.isValid` keeps the submit button's state accurate.
- **Single reusable input:** `FormInput` connects to React Hook Form with `useController`, so every field shares the same focus, error and icon behaviour. It only displays errors; the rules live in the Zod schemas.
- **Shared password rules:** `passwordRules.ts` is used by both the sign-up schema and the `PasswordStrength` checklist, so what the checklist shows always matches what validation enforces.
- **Schemas separate from UI:** Zod schemas live in `schemas/` and TypeScript types are inferred from them with `z.infer`, so the validation rules and form types cannot drift apart.
- **Stack navigation:** a Stack fits a hub-and-spoke flow where the home screen opens each form and the header provides the back button.

## Team

| Member | GitHub | Responsibility |
| --- | --- | --- |
| Member 1 Guilherme Gatti | @GGatti-Coding | Project setup, navigation, home screen, GitHub repo admin, README |
| Member 2 (name) | @JonIbarlin | Employee Information form and Zod schema |
| Member 3 Jonah Rideout | @Agentjay2000 | Sign-Up form and Zod schema |
| Member 4 Ahmed Yassine Messaoudi | @YassineMe435 | Sign-In form and Zod schema; shared components (`FormInput`, `FormButton`, `ScreenContainer`, `FormBanner`, `PasswordStrength`) and shared password rules |
| Member 5 (name) | @username | Styling polish, iOS/Android testing, peer assessment and submission |

### Git workflow

- Work on feature branches (e.g. `feature/employee-form`, `feature/sign-up-form`) and merge into `main` through pull requests.
- Commit small and often with clear messages so each member's contribution is visible in the history.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run ios` | Open on iOS |
| `npm run android` | Open on Android |
