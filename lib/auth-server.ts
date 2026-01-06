import { TokenPayload, getAuthToken, verifyToken } from './auth';

export async function getCurrentUser(): Promise<TokenPayload | null> {
  const token = await getAuthToken();

  if (!token) {
    return null;
  }

  return verifyToken(token);
}
