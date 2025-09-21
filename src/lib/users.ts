import type { User } from "@/types";
import usersData from "./data/users.json";

// This is a mock implementation. In a real app, you'd interact with a database.
let users: User[] = [...usersData as User[]];

export async function getUsers(): Promise<User[]> {
  return Promise.resolve(users);
}

export async function getUserById(id: string): Promise<User | undefined> {
  return Promise.resolve(users.find((user) => user.id === id));
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return Promise.resolve(users.find((user) => user.email === email));
}

export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
  const newUser: User = {
    id: `user-${Date.now()}`,
    ...userData
  };
  users.push(newUser);
  // In a real app, you would write this back to the database.
  // Here we are just modifying the in-memory array.
  console.log("New user created:", newUser);
  console.log("Current users:", users);
  return Promise.resolve(newUser);
}
