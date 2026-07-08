import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { AvatarActions } from '#/components/profile/AvatarActions';
import { ProfileFields } from '#/components/profile/ProfileFields';
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

  return (
    <Box sx={{ maxWidth: 480 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Profile
      </Typography>
      <ProfileFields userInfo={userInfo} />
      <AvatarActions />
    </Box>
  );
}
