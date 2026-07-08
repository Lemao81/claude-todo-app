import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { deleteAvatar, hasAvatar, uploadAvatar } from '#/api/userApi';
import { DeleteAvatarDialog } from '#/components/profile/DeleteAvatarDialog';
import { ProfileField } from '#/components/profile/ProfileField';
import { useAvatar } from '#/components/provider/AvatarProvider';
import { useUserInfo } from '#/components/provider/UserInfoProvider';

export const Route = createLazyFileRoute('/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const { refreshAvatar } = useAvatar();
  const [avatarExists, setAvatarExists] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate({ to: '/login' });
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    hasAvatar().then(setAvatarExists);
  }, []);

  if (!userInfo) {
    return null;
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const success = await uploadAvatar(file);
    if (success) {
      setAvatarExists(true);
      refreshAvatar();
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
  }

  return (
    <Box sx={{ maxWidth: 480 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Profile
      </Typography>
      <Stack spacing={2} divider={<Divider />}>
        <ProfileField label="Username" value={userInfo.userName} />
        <ProfileField label="Email" value={userInfo.email} />
        <ProfileField label="First name" value={userInfo.firstName} />
        <ProfileField label="Last name" value={userInfo.lastName} />
      </Stack>
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
      <DeleteAvatarDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onDelete={handleAvatarDelete}
      />
    </Box>
  );
}
