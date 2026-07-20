import { isRedirect, redirect } from '@tanstack/react-router';
import { router } from '#/router';
import { UnauthorizedError } from '#/utils/errors';
import { logFetchError } from '#/utils/helpers';

export function shouldRetryQuery(failureCount: number, error: Error): boolean {
  return !isRedirect(error) && !(error instanceof UnauthorizedError) && failureCount < 1;
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

export async function apiGetJson<T>(input: RequestInfo | URL, errorMessage: string): Promise<T> {
  const res = await fetch(input);
  if (res.status === 401) {
    throw redirect({ to: '/login' });
  }

  if (!res.ok) {
    await logFetchError(res, errorMessage);

    throw new Error(errorMessage);
  }

  const data: T = await res.json();

  return data;
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
