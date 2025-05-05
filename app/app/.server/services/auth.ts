import bcrypt from "bcryptjs";
import type { User } from "~/types/user";
import { createUser as createUserDto, getUserByEmail } from "~/.server/dto/users";

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export async function createUser(email: string, password: string, name?: string): Promise<User> {
  const hashedPassword = await hashPassword(password);

  try {
    return createUserDto({ email, password: hashedPassword, name });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
      throw new AuthError("A user with this email already exists");
    }
    throw new AuthError("Failed to create user");
  }
}

export async function verifyLogin(email: string, password: string): Promise<User> {
  try {
    const user = getUserByEmail(email);
    if (!user) {
      throw new AuthError("Invalid email or password");
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new AuthError("Invalid email or password");
    }

    return user;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError("Login verification failed");
  }
}
