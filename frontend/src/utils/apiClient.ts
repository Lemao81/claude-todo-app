import { router } from '#/router';
import { logFetchError } from '#/utils/logHelper';

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const res = await fetch(input, init);
  if (res.status === 401) {
    router.navigate({ to: '/login' });

    throw new UnauthorizedError();
  }

  return res;
}

export function jsonBody(method: string, body: unknown): RequestInit {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export async function apiSend(
  input: RequestInfo | URL,
  errorMessage: string,
  init?: RequestInit,
): Promise<boolean> {
  const res = await apiFetch(input, init);
  if (!res.ok) {
    await logFetchError(res, errorMessage);

    return false;
  }

  return true;
}

export async function apiSendJson<T>(
  input: RequestInfo | URL,
  errorMessage: string,
  init?: RequestInit,
): Promise<T | null> {
  const res = await apiFetch(input, init);
  if (!res.ok) {
    await logFetchError(res, errorMessage);

    return null;
  }

  const data: T = await res.json();

  return data;
}
