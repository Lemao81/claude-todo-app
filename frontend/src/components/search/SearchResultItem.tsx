import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { TodoText } from '#/components/shared/TodoText';
import type { TodoDto } from '#/types/todo';

type SearchResultItemProps = {
  todo: TodoDto;
  listName: string;
};

export function SearchResultItem({ todo, listName }: SearchResultItemProps) {
  return (
    <ListItem divider sx={{ display: 'block', px: 1 }} data-cy="search-result-item">
      <Typography variant="caption" color="text.secondary">
        {listName}
      </Typography>
      <TodoText done={todo.done} data-cy="search-result-text">
        {todo.text}
      </TodoText>
    </ListItem>
  );
}
