import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { useEffect, useState } from 'react';
import { SidebarAboutItem } from '#/components/sidebar/SidebarAboutItem';
import { SidebarTodoLists } from '#/components/sidebar/SidebarTodoLists';
import { SidebarTodosItem } from '#/components/sidebar/SidebarTodosItem';
import { useUserInfo } from '#/components/provider/UserInfoProvider';
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
      <SidebarTodosItem
        open={todosOpen}
        disabled={!userInfo}
        onToggle={() => setTodosOpen((open) => !open)}
      />
      <Collapse in={todosOpen} timeout="auto" unmountOnExit>
        <SidebarTodoLists todoLists={todoLists} />
      </Collapse>
      <SidebarAboutItem />
    </List>
  );
}
