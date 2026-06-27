import ChecklistIcon from '@mui/icons-material/Checklist';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { type ReactNode, useEffect, useState } from 'react';
import { ToolbarActions } from '#/components/ToolbarActions';
import { useUserInfo } from '#/components/UserInfoProvider';
import type { TodoListDto } from '#/types/todoList';
import { apiFetch } from '#/utils/apiClient';
import { logFetchError } from '#/utils/logHelper';

const DRAWER_WIDTH = 240;

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const matchRoute = useMatchRoute();
  const { userInfo } = useUserInfo();
  const [todoLists, setTodoLists] = useState<TodoListDto[]>([]);
  const [todosOpen, setTodosOpen] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      setTodoLists([]);

      return;
    }

    async function loadTodoLists() {
      const res = await apiFetch('/api/todolists');
      if (!res.ok) {
        await logFetchError(res, 'Failed to fetch todo lists');

        return;
      }

      setTodoLists(await res.json());
    }

    loadTodoLists();
  }, [userInfo]);

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
          <ToolbarActions />
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
              <ListItemButton onClick={() => setTodosOpen((open) => !open)}>
                <ListItemIcon>
                  <ChecklistIcon />
                </ListItemIcon>
                <ListItemText primary="Todos" />
                {todosOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
            </ListItem>
            <Collapse in={todosOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                {todoLists.map((list) => (
                  <ListItem key={list.id} disablePadding>
                    <ListItemButton
                      component={Link}
                      to="/todos/$listId"
                      params={{ listId: String(list.id) }}
                      selected={
                        !!matchRoute({ to: '/todos/$listId', params: { listId: String(list.id) } })
                      }
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={list.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
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
