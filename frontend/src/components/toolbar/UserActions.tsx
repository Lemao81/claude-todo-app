import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Link } from '@tanstack/react-router';
import { useUserInfo } from '#/providers/UserInfoProvider';
import { UserAvatar } from '#/components/toolbar/UserAvatar';

export function UserActions() {
  const { userInfo } = useUserInfo();

  if (!userInfo) {
    return (
      <Stack direction="row" spacing={1} sx={{ ml: 4 }}>
        <Button
          color="inherit"
          variant="contained"
          component={Link}
          to="/login"
          data-cy="sign-in-link"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' },
          }}
        >
          Sign in
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          component={Link}
          to="/register"
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.4)',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.7)',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Sign up
        </Button>
      </Stack>
    );
  }

  return (
    <IconButton component={Link} to="/profile" sx={{ ml: 4, p: 0 }}>
      <UserAvatar key={userInfo.userName} alt={userInfo.userName} />
    </IconButton>
  );
}
