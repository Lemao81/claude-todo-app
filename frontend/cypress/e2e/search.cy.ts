describe("search", () => {
	beforeEach(() => {
		cy.login();
	});

	it("filters todos by search input", () => {
		cy.visit("/todos");

		cy.get("[data-cy=todo-list-heading]").should("be.visible");

		cy.get("[data-cy=sidebar-search-input]").type("without");

		cy.get("[data-cy=todo-list-heading]").should("not.exist");
		cy.get("[data-cy=search-result-item]").should("have.length", 2);
		cy.get("[data-cy=search-result-text]").each(($el) =>
			expect($el.text().toLowerCase()).to.include("without"),
		);
	});
});
