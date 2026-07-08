import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from '@tanstack/react-router';
import { logout } from '#/api/authApi';
import { useColorMode } from '#/components/provider/AppThemeProvider';
import { useUserInfo } from '#/components/provider/UserInfoProvider';

export function ToolbarActions() {
  const { mode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { userInfo, clearUserInfo } = useUserInfo();

  async function handleLogout() {
    const success = await logout();
    if (!success) {
      return;
    }

    clearUserInfo();
    navigate({ to: '/login' });
  }

  return (
    <>
      <IconButton color="inherit" onClick={toggleColorMode}>
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      {userInfo ? (
        <>
          <IconButton component={Link} to="/profile" sx={{ ml: 4, p: 0 }}>
            <Avatar src="/default_avatar.jpg" alt={userInfo.userName} sx={{ width: 36, height: 36 }} />
          </IconButton>
          <Button
            color="inherit"
            variant="contained"
            onClick={handleLogout}
            sx={{
              ml: 3,
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' },
            }}
          >
            Logout
          </Button>
        </>
      ) : (
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
          Login
        </Button>
      )}
    </>
  );
}
