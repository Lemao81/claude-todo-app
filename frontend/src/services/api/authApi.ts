import { queryOptions } from '@tanstack/react-query';
import type { UserInfo } from '#/types/userInfo';
import { apiSend, jsonBody } from '#/utils/apiClient';
import { logFetchError } from '#/utils/helpers';

export type RegisterData = {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export async function register(data: RegisterData): Promise<string | null> {
  const res = await fetch('/api/auth/register', jsonBody('POST', data));

  if (res.status === 409) {
    return 'Username or email is already taken';
  }

  if (!res.ok) {
    await logFetchError(res, 'Failed to register');

    return 'Registration failed';
  }

  return null;
}

export async function login(
  usernameOrEmail: string,
  password: string,
): Promise<[UserInfo, null] | [null, string]> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usernameOrEmail, password }),
  });

  if (!res.ok) {
    await logFetchError(res, 'Failed to log in');

    return [null, 'Invalid username or password'];
  }

  const userInfo: UserInfo = await res.json();

  return [userInfo, null];
}

export function logout(): Promise<boolean> {
  return apiSend('/api/auth/logout', 'Failed to log out', { method: 'POST' });
}

async function isSessionExpired(): Promise<boolean> {
  try {
    const res = await fetch('/api/auth/me');

    return res.status === 401;
  } catch {
    return false;
  }
}

export const sessionExpiredQueryOptions = queryOptions({
  queryKey: ['sessionExpired'],
  queryFn: isSessionExpired,
  staleTime: Infinity,
});
