import Typography from '@mui/material/Typography';
import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router';
import { TodoCard } from '#/components/TodoCard';

export const Route = createLazyFileRoute('/todos/')({
  component: RouteComponent,
});

const routeApi = getRouteApi('/todos/');

function RouteComponent() {
  const todos = routeApi.useLoaderData();

  return (
    <div style={{ maxWidth: 640 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        My Todos
      </Typography>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
