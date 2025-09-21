"use server";

import { getUserByEmail } from '@/lib/users';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const user = await getUserByEmail(email);

    if (!user) {
      return 'Invalid email or password.';
    }

    // In a real app, you'd compare a hashed password.
    // For this mock version, we'll do a simple string comparison.
    const passwordsMatch = password === user.password;

    if (!passwordsMatch) {
      return 'Invalid email or password.';
    }
    
    // Here we would typically create a session and set a cookie.
    // We will implement this in the next steps.
    console.log("User authenticated:", user.email);

    // Redirect will be handled in the next steps. For now, we'll just log.
    
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'Invalid credentials.';
    }
    console.error(error);
    return 'An unexpected error occurred.';
  }
}
