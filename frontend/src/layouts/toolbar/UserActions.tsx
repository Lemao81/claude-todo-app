import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Link } from '@tanstack/react-router';
import { UserAvatar } from '#/layouts/toolbar/UserAvatar';
import { useUserInfo } from '#/providers/UserInfoProvider';

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
        >
          Sign in
        </Button>
        <Button color="inherit" variant="outlined" component={Link} to="/register">
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
