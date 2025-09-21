import type { User } from "@/types";
import usersData from "./data/users.json";

// Simulate an async data fetch
export async function getUsers(): Promise<User[]> {
  return Promise.resolve(usersData as User[]);
}

export async function getUserById(id: string): Promise<User | undefined> {
  const users = await getUsers();
  return Promise.resolve(users.find((user) => user.id === id));
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return Promise.resolve(users.find((user) => user.email === email));
}
