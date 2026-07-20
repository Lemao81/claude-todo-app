export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const next = array.slice();
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);

  return next;
}

export async function logFetchError(res: Response, failureText: string): Promise<void> {
  const body = await res.text();
  console.error(`${failureText}: ${res.status} ${res.statusText}`, body);
}
