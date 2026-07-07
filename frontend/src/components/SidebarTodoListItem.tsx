import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link, useMatchRoute } from '@tanstack/react-router';
import type { TodoListDto } from '#/types/todoList';

type SidebarTodoListItemProps = {
  todoList: TodoListDto;
};

export function SidebarTodoListItem({ todoList }: SidebarTodoListItemProps) {
  const matchRoute = useMatchRoute();

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to="/todos/$listId"
        params={{ listId: String(todoList.id) }}
        selected={!!matchRoute({ to: '/todos/$listId', params: { listId: String(todoList.id) } })}
        sx={{ pl: 4 }}
      >
        <ListItemText primary={todoList.name} />
      </ListItemButton>
    </ListItem>
  );
}
