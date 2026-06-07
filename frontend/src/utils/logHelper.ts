export async function logFetchError(res: Response, failureText: string): Promise<void> {
  const body = await res.text();
  console.error(`${failureText}: ${res.status} ${res.statusText}`, body);
}
