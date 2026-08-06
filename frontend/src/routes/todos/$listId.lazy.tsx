import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router';
import { TodoListPage } from '#/pages/TodoListPage';
import { TodoListProvider } from '#/providers/TodoListProvider';
import { TodosProvider } from '#/providers/TodosProvider';
import { createTodosQueryOptions } from '#/services/api/todoApi';
import { createTodoListQueryOptions } from '#/services/api/todoListApi';

export const Route = createLazyFileRoute('/todos/$listId')({
  component: RouteComponent,
});

const routeApi = getRouteApi('/todos/$listId');

function RouteComponent() {
  const { listId } = routeApi.useParams();
  const listIdNumber = Number(listId);
  const { data: list } = useSuspenseQuery(createTodoListQueryOptions(listIdNumber));
  const { data: todos } = useSuspenseQuery(createTodosQueryOptions(listIdNumber));

  return (
    <TodoListProvider key={list.id} list={list}>
      <TodosProvider listId={listIdNumber} initialTodos={todos}>
        <TodoListPage />
      </TodosProvider>
    </TodoListProvider>
  );
}
