import { db } from '~/db';
import { users } from '~/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type { User } from '~/types/user';

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function createUser(email: string, password: string, name?: string): Promise<User> {
  const hashedPassword = await hashPassword(password);
  
  try {
    const result = await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
    }).returning();

    const user = result[0];
    if (!user) throw new Error('User creation failed');

    return user;
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      throw new AuthError('A user with this email already exists');
    }
    throw new AuthError('Failed to create user');
  }
}

export async function verifyLogin(email: string, password: string): Promise<User> {
  try {
    const user = await db.select().from(users).where(eq(users.email, email)).get();
    
    if (!user) {
      throw new AuthError('Invalid email or password');
    }
    
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new AuthError('Invalid email or password');
    }
    
    return user;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Login verification failed');
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).get();
    return user;
  } catch {
    return null;
  }
} 