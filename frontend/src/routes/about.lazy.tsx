import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/about')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>This ToDo app is done via Claude Code prompting</div>;
}
