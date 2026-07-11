import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import type { TodoDto } from '#/types/todo';

type SearchResultItemProps = {
  todo: TodoDto;
  listName: string;
};

export function SearchResultItem({ todo, listName }: SearchResultItemProps) {
  return (
    <ListItem divider sx={{ display: 'block', px: 1 }}>
      <Typography variant="caption" color="text.secondary">
        {listName}
      </Typography>
      <Typography
        sx={{
          textDecoration: todo.done ? 'line-through' : 'none',
          opacity: todo.done ? 0.5 : 1,
        }}
      >
        {todo.text}
      </Typography>
    </ListItem>
  );
}
