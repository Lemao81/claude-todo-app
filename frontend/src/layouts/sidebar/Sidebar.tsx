import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { useEffect, useState } from 'react';
import { SidebarAboutItem } from '#/layouts/sidebar/SidebarAboutItem';
import { SidebarSearch } from '#/layouts/sidebar/SidebarSearch';
import { SidebarTodoLists } from '#/layouts/sidebar/SidebarTodoLists';
import { SidebarTodosItem } from '#/layouts/sidebar/SidebarTodosItem';
import { useTodoLists } from '#/providers/TodoListsProvider';
import { useUserInfo } from '#/providers/UserInfoProvider';

export function Sidebar() {
  const { userInfo } = useUserInfo();
  const { todoLists } = useTodoLists();
  const [todosOpen, setTodosOpen] = useState(false);

  useEffect(() => {
    setTodosOpen(Boolean(userInfo));
  }, [userInfo]);

  return (
    <List>
      <SidebarSearch />
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
