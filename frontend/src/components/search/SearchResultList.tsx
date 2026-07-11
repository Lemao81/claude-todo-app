import List from '@mui/material/List';
import { SearchResultItem } from '#/components/search/SearchResultItem';
import type { TodoDto } from '#/types/todo';

type SearchResultListProps = {
  todos: TodoDto[];
  listNames: Map<number, string>;
};

export function SearchResultList({ todos, listNames }: SearchResultListProps) {
  return (
    <List disablePadding>
      {todos.map((todo) => (
        <SearchResultItem
          key={todo.id}
          todo={todo}
          listName={listNames.get(todo.todoListId) ?? 'Unknown list'}
        />
      ))}
    </List>
  );
}
