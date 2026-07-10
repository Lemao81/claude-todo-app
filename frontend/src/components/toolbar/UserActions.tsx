import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from '@tanstack/react-router';
import { useUserInfo } from '#/components/provider/UserInfoProvider';
import { UserAvatar } from '#/components/toolbar/UserAvatar';

export function UserActions() {
  const { userInfo } = useUserInfo();

  if (!userInfo) {
    return (
      <Button
        color="inherit"
        variant="contained"
        component={Link}
        to="/login"
        sx={{
          ml: 4,
          bgcolor: 'rgba(255, 255, 255, 0.15)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' },
        }}
      >
        Sign in
      </Button>
    );
  }

  return (
    <IconButton component={Link} to="/profile" sx={{ ml: 4, p: 0 }}>
      <UserAvatar key={userInfo.userName} alt={userInfo.userName} />
    </IconButton>
  );
}
