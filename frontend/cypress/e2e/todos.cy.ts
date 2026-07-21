type TodoResponse = {
	id: number;
	text: string;
	done: boolean;
	description: string | null;
	todoListId: number;
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

	it("adds todo with description", () => {
		cy.request("GET", "/api/todos").then((response: Cypress.Response<TodoResponse[]>) => {
			for (const todo of response.body.filter((t) => t.text === "New todo")) {
				cy.request("DELETE", `/api/todos/${todo.id}`);
			}
		});
		cy.intercept("POST", "/api/todos").as("createTodo");
		cy.visit("/todos");

		cy.get("[data-cy=add-todo-button]").click();

		cy.get("[data-cy=add-todo-dialog]").should("be.visible");
		cy.get("[data-cy=add-todo-dialog-title]").should("be.visible").and("have.text", "Add ToDo");
		cy.get("[data-cy=add-todo-text-input]").should("be.visible");
		cy.get("[data-cy=add-todo-description-input]").should("be.visible");

		cy.get("[data-cy=add-todo-text-input]").type("New todo");
		cy.get("[data-cy=add-todo-description-input]").type("New todo description");
		cy.get("[data-cy=add-todo-submit]").click();

		cy.wait("@createTodo").its("response.statusCode").should("eq", 201);
		cy.get("[data-cy=add-todo-dialog]").should("not.exist");
		cy.get("[data-cy=todo-card]")
			.last()
			.within(() => {
				cy.get("[data-cy=todo-card-text]").should("have.text", "New todo");
				cy.get("[data-cy=todo-card-description]").should("have.text", "New todo description");
			});
	});

	it("edits todo text and description", () => {
		cy.request("GET", "/api/todos").then((response: Cypress.Response<TodoResponse[]>) => {
			for (const todo of response.body.filter(
				(t) => t.text === "Editable todo" || t.text === "Edited todo",
			)) {
				cy.request("DELETE", `/api/todos/${todo.id}`);
			}

			const seededTodo = response.body[0];
			cy.request("POST", "/api/todos", {
				text: "Editable todo",
				description: "Original description",
				todoListId: seededTodo.todoListId,
			});
		});
		cy.intercept("PATCH", "/api/todos/*").as("updateTodo");
		cy.visit("/todos");

		cy.get("[data-cy=todo-card]")
			.last()
			.within(() => {
				cy.get("[data-cy=todo-card-text]").should("have.text", "Editable todo");
				cy.get("[data-cy=todo-card-description]").should("have.text", "Original description");
				cy.get("[data-cy=todo-card-edit]").click();
			});

		cy.get("[data-cy=edit-todo-panel]").should("be.visible");
		cy.get("[data-cy=edit-todo-text-input]").should("have.value", "Editable todo");
		cy.get("[data-cy=edit-todo-description-input]").should("have.value", "Original description");

		cy.get("[data-cy=edit-todo-text-input]").clear().type("Edited todo");
		cy.get("[data-cy=edit-todo-description-input]").clear().type("Edited description");

		cy.wait("@updateTodo").its("response.statusCode").should("be.oneOf", [200, 204]);

		cy.get("[data-cy=todo-card]")
			.last()
			.within(() => {
				cy.get("[data-cy=todo-card-text]").should("have.text", "Edited todo");
				cy.get("[data-cy=todo-card-description]").should("have.text", "Edited description");
			});
	});

	it("deletes a todo", () => {
		cy.request("GET", "/api/todos").then((response: Cypress.Response<TodoResponse[]>) => {
			for (const todo of response.body.filter((t) => t.text === "Deletable todo")) {
				cy.request("DELETE", `/api/todos/${todo.id}`);
			}

			const seededTodo = response.body[0];
			cy.request("POST", "/api/todos", {
				text: "Deletable todo",
				description: null,
				todoListId: seededTodo.todoListId,
			});
		});
		cy.intercept("DELETE", "/api/todos/*").as("deleteTodo");
		cy.visit("/todos");

		cy.get("[data-cy=todo-card]").then(($cards) => {
			const initialCount = $cards.length;

			cy.get("[data-cy=todo-card]")
				.last()
				.within(() => {
					cy.get("[data-cy=todo-card-text]").should("have.text", "Deletable todo");
					cy.get("[data-cy=todo-card-delete]").click();
				});

			cy.wait("@deleteTodo").its("response.statusCode").should("be.oneOf", [200, 204]);

			cy.get("[data-cy=todo-card]").should("have.length", initialCount - 1);
			cy.get("[data-cy=todo-card-text]").should("not.contain", "Deletable todo");
		});
	});
});
