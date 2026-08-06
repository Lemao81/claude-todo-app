import List from '@mui/material/List';
import { SidebarAddTodoListItem } from '#/layouts/sidebar/SidebarAddTodoListItem';
import { SidebarTodoListItem } from '#/layouts/sidebar/SidebarTodoListItem';
import type { TodoListDto } from '#/types/todoList';

type SidebarTodoListsProps = {
  todoLists: TodoListDto[];
};

export function SidebarTodoLists({ todoLists }: SidebarTodoListsProps) {
  return (
    <List disablePadding>
      {todoLists.map((list) => (
        <SidebarTodoListItem key={list.id} todoList={list} />
      ))}
      <SidebarAddTodoListItem />
    </List>
  );
}
