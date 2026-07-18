import { queryOptions } from '@tanstack/react-query';
import { apiFetch, apiSend, shouldRetryQuery } from '#/utils/apiClient';

async function hasAvatar(): Promise<boolean> {
  const res = await apiFetch('/api/users/avatar');

  return res.ok;
}

export const hasAvatarQueryOptions = queryOptions({
  queryKey: ['avatar'],
  queryFn: hasAvatar,
  retry: shouldRetryQuery,
});

export function deleteAvatar(): Promise<boolean> {
  return apiSend('/api/users/avatar', 'Failed to delete avatar', { method: 'DELETE' });
}

export function uploadAvatar(file: File): Promise<boolean> {
  const formData = new FormData();
  formData.append('file', file);

  return apiSend('/api/users/avatar', 'Failed to upload avatar', {
    method: 'POST',
    body: formData,
  });
}
