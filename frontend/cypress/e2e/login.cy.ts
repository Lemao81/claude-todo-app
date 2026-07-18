describe("login navigation", () => {
	it("shows the login form", () => {
		cy.visit("/");

		cy.contains("a", "Sign in").click();

		cy.location("pathname").should("eq", "/login");
		cy.contains("h5", "Sign In").should("be.visible");
		cy.contains("label", "Username").should("be.visible");
		cy.contains("label", "Password").should("be.visible");
		cy.contains("button", "Sign in").should("be.visible");
		cy.focused().should("have.attr", "autocomplete", "username");
	});
});
