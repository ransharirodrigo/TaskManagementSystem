import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const AUTH_COOKIE_NAME = 'auth_token';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

/* ================= JWT ================= */

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

/* ================= PASSWORD ================= */

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

/* ================= COOKIES ================= */

export async function setAuthCookie(token: string) {
  const cookieStore = cookies();

  (await cookieStore).set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function removeAuthCookie() {
  const cookieStore = cookies();

  (await cookieStore).delete(AUTH_COOKIE_NAME);
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = cookies();
  return (await cookieStore).get(AUTH_COOKIE_NAME)?.value || null;
}
