import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteAvatar, hasAvatarQueryOptions, uploadAvatar } from '#/api/userApi';
import { AvatarPlaceholder } from '#/components/profile/AvatarPlaceholder';
import { AvatarWithDelete } from '#/components/profile/AvatarWithDelete';
import { useAvatar } from '#/components/provider/AvatarProvider';
import { useSnackbar } from '#/components/provider/SnackbarProvider';

export function AvatarActions() {
  const { refreshAvatar } = useAvatar();
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { data: avatarExists = false } = useQuery(hasAvatarQueryOptions);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const success = await uploadAvatar(file);
    if (success) {
      queryClient.setQueryData(hasAvatarQueryOptions.queryKey, true);
      refreshAvatar();
      showSnackbar('Avatar uploaded successfully');
    }

    e.target.value = '';
  }

  async function handleAvatarDelete() {
    const success = await deleteAvatar();
    if (!success) {
      showSnackbar('Failed to delete avatar', 'error');

      return;
    }

    queryClient.setQueryData(hasAvatarQueryOptions.queryKey, false);
    refreshAvatar();
    showSnackbar('Avatar deleted successfully');
  }

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" component="label">
          Upload Avatar
          <input type="file" hidden accept="image/jpeg,image/png" onChange={handleAvatarChange} />
        </Button>
      </Stack>
      {avatarExists ? <AvatarWithDelete onDelete={handleAvatarDelete} /> : <AvatarPlaceholder />}
    </>
  );
}
