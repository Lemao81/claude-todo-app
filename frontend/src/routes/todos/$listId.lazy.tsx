import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router';
import { todosQueryOptions } from '#/api/todoApi';
import { todoListQueryOptions } from '#/api/todoListApi';
import { TodoListPage } from '#/components/pages/TodoListPage';
import { TodoListProvider } from '#/components/providers/TodoListProvider';
import { TodosProvider } from '#/components/providers/TodosProvider';

export const Route = createLazyFileRoute('/todos/$listId')({
  component: RouteComponent,
});

const routeApi = getRouteApi('/todos/$listId');

function RouteComponent() {
  const { listId } = routeApi.useParams();
  const listIdNumber = Number(listId);
  const { data: list } = useSuspenseQuery(todoListQueryOptions(listIdNumber));
  const { data: todos } = useSuspenseQuery(todosQueryOptions(listIdNumber));

  return (
    <TodoListProvider key={list.id} list={list}>
      <TodosProvider listId={listIdNumber} initialTodos={todos}>
        <TodoListPage />
      </TodosProvider>
    </TodoListProvider>
  );
}
