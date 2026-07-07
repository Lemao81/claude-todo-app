import type { UserInfo } from '#/types/userInfo';
import { apiFetch } from '#/utils/apiClient';
import { logFetchError } from '#/utils/logHelper';

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

export async function logout(): Promise<boolean> {
  const res = await apiFetch('/api/auth/logout', { method: 'POST' });
  if (!res.ok) {
    await logFetchError(res, 'Failed to log out');

    return false;
  }

  return true;
}
