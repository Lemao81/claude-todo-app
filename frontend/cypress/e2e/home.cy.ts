describe("home", () => {
	it("shows the home screen", () => {
		cy.visit("/");

		cy.get("[data-cy=home-heading]")
			.should("be.visible")
			.and("contain.text", "Welcome to Claude ToDo App");
	});
});
