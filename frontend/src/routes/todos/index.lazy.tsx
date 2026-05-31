import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/todos/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<h1>My Todos</h1>
			<ul>
				<li>Buy groceries</li>
				<li>Walk the dog</li>
				<li>Read a book</li>
				<li>Write some code</li>
			</ul>
		</div>
	)
}
