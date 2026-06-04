import { createLazyFileRoute, getRouteApi } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/todos/")({
	component: RouteComponent,
});

const routeApi = getRouteApi("/todos/");

function RouteComponent() {
	const todos = routeApi.useLoaderData();

	return (
		<div>
			<h1>My Todos</h1>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.text}</li>
				))}
			</ul>
		</div>
	);
}
