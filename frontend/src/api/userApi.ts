import { apiFetch } from '#/utils/apiClient';
import { logFetchError } from '#/utils/logHelper';

export async function hasAvatar(): Promise<boolean> {
  const res = await apiFetch('/api/users/avatar');

  return res.ok;
}

export async function deleteAvatar(): Promise<boolean> {
  const res = await apiFetch('/api/users/avatar', { method: 'DELETE' });
  if (!res.ok) {
    await logFetchError(res, 'Failed to delete avatar');

    return false;
  }

  return true;
}

export async function uploadAvatar(file: File): Promise<boolean> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await apiFetch('/api/users/avatar', { method: 'POST', body: formData });
  if (!res.ok) {
    await logFetchError(res, 'Failed to upload avatar');

    return false;
  }

  return true;
}
