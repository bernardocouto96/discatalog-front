import collectionList from "../fixtures/collectionList";

describe("Collection List Test", function() {
  it("renders every collections correctly", function() {
    cy.visit("http://localhost:3000");
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection",
      response: collectionList
    });

    cy.get("#collections > li").should("have.length", 3);

    cy.get("#collections > li")
      .eq(0)
      .should("contain", "Top 1 - 3");
    cy.get("#collections > li")
      .eq(1)
      .should("contain", "Top 4 - 6");
    cy.get("#collections > li")
      .eq(2)
      .should("contain", "Top 7 - 9");
  });

  it("redirects to the correct collection", function() {
    cy.get("#collections > li")
      .eq(1)
      .click();

    cy.location("pathname").should("eq", "/collection/2");
  });
});
