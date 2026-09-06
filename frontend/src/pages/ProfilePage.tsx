import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { AvatarActions } from '#/components/profile/AvatarActions';
import { ProfileFields } from '#/components/profile/ProfileFields';
import { ConfirmationDialog } from '#/components/shared/ConfirmationDialog';
import { useUserInfo } from '#/providers/UserInfoProvider';
import { logout } from '#/services/api/authApi';
import { deleteAccount } from '#/services/api/userApi';
import { showSnackbar } from '#/services/stores/snackbar';
import type { UserInfo } from '#/types/userInfo';

type ProfilePageProps = {
  userInfo: UserInfo;
};

export function ProfilePage({ userInfo }: ProfilePageProps) {
  const navigate = useNavigate();
  const { clearUserInfo } = useUserInfo();
  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);

  async function handleSignOut(): Promise<void> {
    const success = await logout();
    if (!success) {
      return;
    }

    clearUserInfo();
    navigate({ to: '/login' });
  }

  async function handleDeleteAccount(): Promise<void> {
    const success = await deleteAccount();
    if (!success) {
      showSnackbar('Failed to delete account', 'error');

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
      <Stack direction="row" sx={{ gap: 2, mt: 8 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setSignOutDialogOpen(true)}
          data-cy="sign-out-button"
        >
          Sign out
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => setDeleteAccountDialogOpen(true)}
          data-cy="delete-account-button"
        >
          Delete Account
        </Button>
      </Stack>
      <ConfirmationDialog
        open={signOutDialogOpen}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        confirmLabel="Sign out"
        onClose={() => setSignOutDialogOpen(false)}
        onConfirm={handleSignOut}
      />
      <ConfirmationDialog
        open={deleteAccountDialogOpen}
        title="Delete Account"
        message="This permanently deletes your account and all its todo lists and todos."
        confirmLabel="Delete account"
        onClose={() => setDeleteAccountDialogOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </Box>
  );
}
