import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { logout } from '#/services/api/authApi';
import { ConfirmationDialog } from '#/components/shared/ConfirmationDialog';
import { AvatarActions } from '#/components/profile/AvatarActions';
import { ProfileFields } from '#/components/profile/ProfileFields';
import { useUserInfo } from '#/providers/UserInfoProvider';
import type { UserInfo } from '#/types/userInfo';

type ProfilePageProps = {
  userInfo: UserInfo;
};

export function ProfilePage({ userInfo }: ProfilePageProps) {
  const navigate = useNavigate();
  const { clearUserInfo } = useUserInfo();
  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);

  async function handleSignOut(): Promise<void> {
    const success = await logout();
    if (!success) {
      return;
    }

    clearUserInfo();
    navigate({ to: '/login' });
  }

  return (
    <Box sx={{ maxWidth: 480 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Profile
      </Typography>
      <ProfileFields userInfo={userInfo} />
      <AvatarActions />
      <Button
        variant="outlined"
        color="error"
        onClick={() => setSignOutDialogOpen(true)}
        sx={{ mt: 8 }}
      >
        Sign out
      </Button>
      <ConfirmationDialog
        open={signOutDialogOpen}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        confirmLabel="Sign out"
        onClose={() => setSignOutDialogOpen(false)}
        onConfirm={handleSignOut}
      />
    </Box>
  );
}
