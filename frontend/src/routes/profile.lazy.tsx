import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { deleteAvatar, hasAvatar, uploadAvatar } from '#/api/userApi';
import { useUserInfo } from '#/components/provider/UserInfoProvider';

export const Route = createLazyFileRoute('/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const [avatarExists, setAvatarExists] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
    }

    e.target.value = '';
  }

  async function handleAvatarDelete() {
    setDeleting(true);

    try {
      const success = await deleteAvatar();
      if (!success) {
        return;
      }

      setAvatarExists(false);
      setConfirmOpen(false);
    } finally {
      setDeleting(false);
    }
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
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Delete Avatar</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete your avatar?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleAvatarDelete} disabled={deleting}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

type ProfileFieldProps = {
  label: string;
  value: string;
};

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div>
      <Typography variant="h6" color="primary" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </div>
  );
}
