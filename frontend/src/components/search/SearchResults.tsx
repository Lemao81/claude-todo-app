import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { SearchResultList } from '#/components/search/SearchResultList';
import { useSearch } from '#/providers/SearchProvider';
import { useTodoLists } from '#/providers/TodoListsProvider';
import { allTodosQueryOptions } from '#/services/api/todoApi';
import { CONTENT_MAX_WIDTH } from '#/utils/constants';

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
    <Box sx={{ maxWidth: CONTENT_MAX_WIDTH }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Search Results
      </Typography>
      {results.length === 0 ? (
        <Typography color="text.secondary">No todos found.</Typography>
      ) : (
        <SearchResultList todos={results} listNames={listNames} />
      )}
    </Box>
  );
}
