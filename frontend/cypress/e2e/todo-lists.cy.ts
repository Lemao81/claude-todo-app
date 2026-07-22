type TodoListResponse = {
	id: number;
	name: string;
};

describe("todo lists", () => {
	const newListName = "Cypress New List";

	beforeEach(() => {
		cy.login();
		cy.request("GET", "/api/todolists").then(
			(response: Cypress.Response<TodoListResponse[]>) => {
				for (const list of response.body.filter((l) => l.name === newListName)) {
					cy.request("DELETE", `/api/todolists/${list.id}`);
				}
			},
		);
	});

	it("creates a new todo list", () => {
		cy.intercept("POST", "/api/todolists").as("createTodoList");
		cy.visit("/todos");

		cy.get("[data-cy=add-todo-list-button]").click();

		cy.get("[data-cy=add-todo-list-dialog]").should("be.visible");
		cy.get("[data-cy=add-todo-list-dialog-title]")
			.should("be.visible")
			.and("have.text", "New Todo List");
		cy.get("[data-cy=add-todo-list-name-input]").should("be.visible");

		cy.get("[data-cy=add-todo-list-name-input]").type(newListName);
		cy.get("[data-cy=add-todo-list-submit]").click();

		cy.wait("@createTodoList").its("response.statusCode").should("eq", 201);
		cy.get("[data-cy=add-todo-list-dialog]").should("not.exist");
		cy.get("[data-cy=todo-list-heading]").should("have.text", `My Todos - ${newListName}`);
		cy.get("[data-cy=sidebar-todo-list-item]").should("contain.text", newListName);
	});
});
