import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { createLink, useMatchRoute } from '@tanstack/react-router';
import type { TodoListDto } from '#/types/todoList';

const ListItemButtonLink = createLink(ListItemButton);

type SidebarTodoListItemProps = {
  todoList: TodoListDto;
};

export function SidebarTodoListItem({ todoList }: SidebarTodoListItemProps) {
  const matchRoute = useMatchRoute();

  return (
    <ListItem disablePadding>
      <ListItemButtonLink
        to="/todos/$listId"
        params={{ listId: String(todoList.id) }}
        selected={!!matchRoute({ to: '/todos/$listId', params: { listId: String(todoList.id) } })}
        sx={{ pl: 4 }}
        data-cy="sidebar-todo-list-item"
      >
        <ListItemText primary={todoList.name} />
      </ListItemButtonLink>
    </ListItem>
  );
}
