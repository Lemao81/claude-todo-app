import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteAvatar, hasAvatarQueryOptions, uploadAvatar } from '#/api/userApi';
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
      {avatarExists ? (
        <AvatarWithDelete onDelete={handleAvatarDelete} />
      ) : (
        <Box
          sx={{
            width: 160,
            height: 160,
            mt: 4,
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No avatar
          </Typography>
        </Box>
      )}
    </>
  );
}
