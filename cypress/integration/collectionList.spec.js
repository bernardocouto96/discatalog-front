import collectionList from "../fixtures/collectionList";

describe("Collection List Test", function() {
  it("renders every collections correctly", function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection",
      response: collectionList
    });
    cy.visit("http://localhost:3000");

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

  it("redirects to the correct collection path with the collection data", function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection",
      response: collectionList
    });
    cy.visit("http://localhost:3000");

    cy.get("#collections > li")
      .eq(0)
      .click();

    cy.location("pathname").should("eq", "/collection/1");

    cy.get("#discs > li").should("have.length", 3);

    cy.get("#discs > li")
      .eq(0)
      .should("contain", "Thriller");
    cy.get("#discs > li")
      .eq(1)
      .should("contain", "Back in Black");
    cy.get("#discs > li")
      .eq(2)
      .should("contain", "The Dark Side of the Moon");
  });
});
