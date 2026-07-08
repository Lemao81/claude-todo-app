import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { deleteAvatar, hasAvatar, uploadAvatar } from '#/api/userApi';
import { DeleteAvatarConfirmationDialog } from '#/components/profile/DeleteAvatarConfirmationDialog';
import { useAvatar } from '#/components/provider/AvatarProvider';
import { useSnackbar } from '#/components/provider/SnackbarProvider';

export function AvatarActions() {
  const { avatarVersion, refreshAvatar } = useAvatar();
  const { showSnackbar } = useSnackbar();
  const [avatarExists, setAvatarExists] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    hasAvatar().then(setAvatarExists);
  }, []);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const success = await uploadAvatar(file);
    if (success) {
      setAvatarExists(true);
      refreshAvatar();
      showSnackbar('Avatar uploaded successfully');
    }

    e.target.value = '';
  }

  async function handleAvatarDelete() {
    const success = await deleteAvatar();
    if (!success) {
      return;
    }

    setAvatarExists(false);
    setConfirmOpen(false);
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
        {avatarExists && (
          <Button variant="outlined" color="error" onClick={() => setConfirmOpen(true)}>
            Delete Avatar
          </Button>
        )}
      </Stack>
      {avatarExists && (
        <Avatar
          src={`/api/users/avatar?v=${avatarVersion}`}
          alt="Avatar"
          sx={{ width: 160, height: 160, mt: 4 }}
        />
      )}
      <DeleteAvatarConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onDelete={handleAvatarDelete}
      />
    </>
  );
}
