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
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { SidebarTodoLists } from '#/components/SidebarTodoLists';
import { useUserInfo } from '#/components/UserInfoProvider';
import type { TodoListDto } from '#/types/todoList';
import { apiFetch } from '#/utils/apiClient';
import { logFetchError } from '#/utils/logHelper';

export function Sidebar() {
  const { userInfo } = useUserInfo();
  const [todoLists, setTodoLists] = useState<TodoListDto[]>([]);
  const [todosOpen, setTodosOpen] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      setTodoLists([]);
      setTodosOpen(false);

      return;
    }

    setTodosOpen(true);

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
        <ListItemButton disabled={!userInfo} onClick={() => setTodosOpen((open) => !open)}>
          <ListItemIcon>
            <ChecklistIcon />
          </ListItemIcon>
          <ListItemText primary="Todos" />
          {todosOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={todosOpen} timeout="auto" unmountOnExit>
        <SidebarTodoLists todoLists={todoLists} />
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
