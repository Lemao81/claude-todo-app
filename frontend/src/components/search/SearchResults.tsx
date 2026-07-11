import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { fetchAllTodos } from '#/api/todoApi';
import { useSearch } from '#/components/provider/SearchProvider';
import { useSnackbar } from '#/components/provider/SnackbarProvider';
import { useTodoLists } from '#/components/provider/TodoListsProvider';
import { SearchResultList } from '#/components/search/SearchResultList';
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
        <SearchResultList todos={results} listNames={listNames} />
      )}
    </div>
  );
}
