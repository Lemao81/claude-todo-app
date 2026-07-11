import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { useEffect, useState } from 'react';
import { SidebarAboutItem } from '#/components/sidebar/SidebarAboutItem';
import { SidebarSearch } from '#/components/sidebar/SidebarSearch';
import { SidebarTodoLists } from '#/components/sidebar/SidebarTodoLists';
import { SidebarTodosItem } from '#/components/sidebar/SidebarTodosItem';
import { useTodoLists } from '#/components/provider/TodoListsProvider';
import { useUserInfo } from '#/components/provider/UserInfoProvider';

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
