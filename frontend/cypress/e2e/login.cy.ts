describe("login navigation", () => {
	it("shows the login form", () => {
		cy.visit("/");

		cy.get("[data-cy=sign-in-link]").click();

		cy.location("pathname").should("eq", "/login");
		cy.get("[data-cy=login-heading]").should("be.visible").and("have.text", "Sign In");
		cy.get("[data-cy=login-username]").should("be.visible").and("contain.text", "Username");
		cy.get("[data-cy=login-password]").should("be.visible").and("contain.text", "Password");
		cy.get("[data-cy=login-submit]").should("be.visible").and("have.text", "Sign in");
		cy.focused().should("have.attr", "autocomplete", "username");
	});

	it("performs login with valid credentials", () => {
		cy.visit("/");

		cy.get("[data-cy=sign-in-link]").click();
		cy.get("[data-cy=login-username-input]").type("cypress");
		cy.get("[data-cy=login-password-input]").type("password");
		cy.get("[data-cy=login-submit]").click();

		cy.location("pathname").should("match", /^\/todos\/\d+$/);
		cy.get("[data-cy=todo-list-heading]")
			.should("be.visible")
			.and("contain.text", "My Todos - Cypress List");
		cy.get("[data-cy=sidebar-todo-list-item]").first().should("have.class", "Mui-selected");
	});
});
