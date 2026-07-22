describe("logout", () => {
	beforeEach(() => {
		cy.login();
	});

	it("logs out from the profile page", () => {
		cy.intercept("POST", "/api/auth/logout").as("logout");
		cy.visit("/profile");

		cy.get("[data-cy=sign-out-button]").click();
		cy.get("[data-cy=confirmation-dialog]").should("be.visible");
		cy.get("[data-cy=confirmation-dialog-confirm]").click();

		cy.wait("@logout").its("response.statusCode").should("eq", 200);
		cy.location("pathname").should("eq", "/login");
		cy.get("[data-cy=login-heading]").should("be.visible");
	});
});
