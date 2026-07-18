describe("home", () => {
	it("shows the home screen", () => {
		cy.visit("/");

		cy.contains("h1", "Welcome to Claude ToDo App").should("be.visible");
	});
});
