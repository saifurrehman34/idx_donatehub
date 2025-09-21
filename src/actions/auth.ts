"use server";

import { z } from "zod";
import { getUserByEmail, createUser, User } from '@/lib/users';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "@/lib/session";

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
}

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
    const passwordsMatch = password === user.password;

    if (!passwordsMatch) {
      return 'Invalid email or password.';
    }
    
    const session = await getSession();
    session.isLoggedIn = true;
    session.userId = user.id;
    await session.save();
    
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'Invalid credentials.';
    }
    console.error(error);
    return 'An unexpected error occurred.';
  }

  // Redirect to dashboard after successful login.
  redirect('/dashboard');
}

const RegisterSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    role: z.enum(['donor', 'ngo']),
});

export async function registerUser(
  prevState: string | undefined,
  formData: FormData,
) {
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    return validatedFields.error.flatten().fieldErrors.password?.[0]
      || validatedFields.error.flatten().fieldErrors.email?.[0]
      || validatedFields.error.flatten().fieldErrors.name?.[0]
      || 'Invalid fields.';
  }

  try {
    const { name, email, password, role } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return "An account with this email already exists.";
    }

    const newUser: Omit<User, 'id'> = {
        name,
        email,
        password, // In a real app, this should be hashed
        role: role as 'donor' | 'ngo',
    };

    const createdUser = await createUser(newUser);

    const session = await getSession();
    session.isLoggedIn = true;
    session.userId = createdUser.id;
    await session.save();

  } catch (error) {
    console.error(error);
    return 'An unexpected error occurred during registration.';
  }

  revalidatePath('/');
  redirect('/dashboard');
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/login');
}
