type TodoResponse = {
	id: number;
	text: string;
	done: boolean;
};

describe("todos", () => {
	beforeEach(() => {
		cy.login();
		cy.request("GET", "/api/todos").then((response: Cypress.Response<TodoResponse[]>) => {
			const openTodo = response.body.find((todo) => todo.text === "Open todo");
			if (openTodo?.done) {
				cy.request("PATCH", `/api/todos/${openTodo.id}`, { done: false });
			}
		});
	});

	it("marks not-done todo as done on click", () => {
		cy.intercept("PATCH", "/api/todos/*").as("updateTodoDone");
		cy.visit("/todos");

		cy.get("[data-cy=todo-card]")
			.first()
			.within(() => {
				cy.get("[data-cy=todo-card-checkbox]").should("not.be.checked");
				cy.get("[data-cy=todo-card-toggle]").click();
				cy.get("[data-cy=todo-card-checkbox]").should("be.checked");
			});
		cy.wait("@updateTodoDone").its("response.statusCode").should("be.oneOf", [200, 204]);
	});
});
