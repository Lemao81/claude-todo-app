import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { uploadAvatar } from '#/api/userApi';
import { useUserInfo } from '#/components/provider/UserInfoProvider';

export const Route = createLazyFileRoute('/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (!userInfo) {
      navigate({ to: '/login' });
    }
  }, [userInfo, navigate]);

  if (!userInfo) {
    return null;
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    await uploadAvatar(file);
    e.target.value = '';
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
      <Button variant="contained" component="label" sx={{ mt: 4 }}>
        Upload Avatar
        <input type="file" hidden accept="image/jpeg,image/png" onChange={handleAvatarChange} />
      </Button>
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
