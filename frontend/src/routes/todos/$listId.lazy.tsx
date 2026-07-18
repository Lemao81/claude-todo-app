import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router';
import { todosQueryOptions } from '#/api/todoApi';
import { todoListQueryOptions } from '#/api/todoListApi';
import { TodoListPage } from '#/components/page/TodoListPage';
import { TodoListProvider } from '#/components/provider/TodoListProvider';
import { TodosProvider } from '#/components/provider/TodosProvider';

export const Route = createLazyFileRoute('/todos/$listId')({
  component: RouteComponent,
});

const routeApi = getRouteApi('/todos/$listId');

function RouteComponent() {
  const { listId } = routeApi.useParams();
  const { data: list } = useSuspenseQuery(todoListQueryOptions(Number(listId)));
  const { data: todos } = useSuspenseQuery(todosQueryOptions(Number(listId)));

  return (
    <TodosProvider listId={Number(listId)} initialTodos={todos}>
      <TodoListProvider key={list.id} list={list}>
        <TodoListPage />
      </TodoListProvider>
    </TodosProvider>
  );
}
