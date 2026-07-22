describe("avatar", () => {
	beforeEach(() => {
		cy.login();
		cy.request({
			method: "DELETE",
			url: "/api/users/avatar",
			failOnStatusCode: false,
		});
	});

	it("uploads an avatar", () => {
		cy.intercept("POST", "/api/users/avatar").as("uploadAvatar");
		cy.visit("/profile");

		cy.get("[data-cy=avatar-placeholder]").should("be.visible");

		cy.get("[data-cy=avatar-upload-input]").selectFile("cypress/fixtures/avatar.jpg", {
			force: true,
		});

		cy.wait("@uploadAvatar").its("response.statusCode").should("eq", 204);
		cy.get("[data-cy=avatar-placeholder]").should("not.exist");
		cy.get("[data-cy=avatar-image]").should("be.visible");
	});

	it("removes the avatar", () => {
		cy.intercept("POST", "/api/users/avatar").as("uploadAvatar");
		cy.intercept("DELETE", "/api/users/avatar").as("deleteAvatar");
		cy.visit("/profile");

		cy.get("[data-cy=avatar-upload-input]").selectFile("cypress/fixtures/avatar.jpg", {
			force: true,
		});
		cy.wait("@uploadAvatar").its("response.statusCode").should("eq", 204);
		cy.get("[data-cy=avatar-image]").should("be.visible");

		cy.get("[data-cy=avatar-delete-button]").click();
		cy.get("[data-cy=confirmation-dialog]").should("be.visible");
		cy.get("[data-cy=confirmation-dialog-confirm]").click();

		cy.wait("@deleteAvatar").its("response.statusCode").should("eq", 204);
		cy.get("[data-cy=confirmation-dialog]").should("not.exist");
		cy.get("[data-cy=avatar-image]").should("not.exist");
		cy.get("[data-cy=avatar-placeholder]").should("be.visible");
	});
});
