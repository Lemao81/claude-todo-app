import ChecklistIcon from '@mui/icons-material/Checklist';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import InfoIcon from '@mui/icons-material/Info';
import LightModeIcon from '@mui/icons-material/LightMode';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useColorMode } from '#/components/AppThemeProvider';
import { usePersistedState } from '#/hooks/usePersistedState';
import type { UserInfo } from '#/types/userInfo';
import { apiFetch } from '#/utils/apiClient';
import { logFetchError } from '#/utils/logHelper';

const DRAWER_WIDTH = 240;

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { mode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { clear: clearUserInfo } = usePersistedState<UserInfo>('userInfo');

  async function handleLogout() {
    const res = await apiFetch('/api/auth/logout', { method: 'POST' });

    if (!res.ok) {
      await logFetchError(res, 'Failed to log out');

      return;
    }

    clearUserInfo();
    navigate({ to: '/login' });
  }

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
          >
            Claude Todo App
          </Typography>
          <IconButton color="inherit" onClick={toggleColorMode}>
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          <Button color="inherit" component={Link} to="/login" sx={{ ml: 2 }}>
            Login
          </Button>
          <Button color="inherit" onClick={handleLogout} sx={{ ml: 1 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/todos">
                <ListItemIcon>
                  <ChecklistIcon />
                </ListItemIcon>
                <ListItemText primary="Todos" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/about">
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </>
  );
}
