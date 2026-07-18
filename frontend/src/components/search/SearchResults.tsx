import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { allTodosQueryOptions } from '#/api/todoApi';
import { useSearch } from '#/components/provider/SearchProvider';
import { useTodoLists } from '#/components/provider/TodoListsProvider';
import { SearchResultList } from '#/components/search/SearchResultList';

export function SearchResults() {
  const { activeSearchTerm } = useSearch();
  const { todoLists } = useTodoLists();
  const { data: allTodos } = useQuery(allTodosQueryOptions);
  const todos = allTodos ?? [];

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
