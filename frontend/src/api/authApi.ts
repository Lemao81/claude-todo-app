import type { UserInfo } from '#/types/userInfo';
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
