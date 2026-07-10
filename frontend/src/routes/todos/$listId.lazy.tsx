import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router';
import { TodoListPage } from '#/components/page/TodoListPage';
import { TodoListProvider } from '#/components/provider/TodoListProvider';
import { TodosProvider } from '#/components/provider/TodosProvider';

export const Route = createLazyFileRoute('/todos/$listId')({
  component: RouteComponent,
});

const routeApi = getRouteApi('/todos/$listId');

function RouteComponent() {
  const { listId } = routeApi.useParams();
  const { list, todos: loadedTodos } = routeApi.useLoaderData();

  return (
    <TodosProvider listId={Number(listId)} initialTodos={loadedTodos}>
      <TodoListProvider key={list.id} list={list}>
        <TodoListPage />
      </TodoListProvider>
    </TodosProvider>
  );
}
