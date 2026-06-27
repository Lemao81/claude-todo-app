import ChecklistIcon from '@mui/icons-material/Checklist';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useUserInfo } from '#/components/UserInfoProvider';
import type { TodoListDto } from '#/types/todoList';
import { apiFetch } from '#/utils/apiClient';
import { logFetchError } from '#/utils/logHelper';

export function Sidebar() {
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
  );
}
