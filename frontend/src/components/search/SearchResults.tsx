import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { fetchAllTodos } from '#/api/todoApi';
import { useSearch } from '#/components/provider/SearchProvider';
import { useSnackbar } from '#/components/provider/SnackbarProvider';
import { useTodoLists } from '#/components/provider/TodoListsProvider';
import type { TodoDto } from '#/types/todo';

export function SearchResults() {
  const { activeSearchTerm } = useSearch();
  const { todoLists } = useTodoLists();
  const { showSnackbar } = useSnackbar();
  const [todos, setTodos] = useState<TodoDto[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchAllTodos().then((allTodos): void => {
      if (cancelled) {
        return;
      }

      if (!allTodos) {
        showSnackbar('Failed to search todos', 'error');

        return;
      }

      setTodos(allTodos);
    });

    return () => {
      cancelled = true;
    };
  }, [showSnackbar]);

  const term = activeSearchTerm.toLowerCase();
  const results = todos.filter(
    (todo) =>
      todo.text.toLowerCase().includes(term) ||
      (todo.description?.toLowerCase().includes(term) ?? false),
  );
  const listNames = new Map(todoLists.map((list) => [list.id, list.name]));

  return (
    <div style={{ maxWidth: 800 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Search Results
      </Typography>
      {results.length === 0 ? (
        <Typography color="text.secondary">No todos found.</Typography>
      ) : (
        <List disablePadding>
          {results.map((todo) => (
            <ListItem key={todo.id} divider sx={{ display: 'block', px: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {listNames.get(todo.todoListId) ?? 'Unknown list'}
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
          ))}
        </List>
      )}
    </div>
  );
}
