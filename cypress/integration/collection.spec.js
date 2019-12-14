import collection from "../fixtures/collection";

describe("Collection Test", function() {
  it("renders collection from path param correctly", function() {
    cy.visit("http://localhost:3000/collection/2");
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection/2",
      response: collection
    });

    cy.get("#discs > li").should("have.length", 3);

    cy.get("#discs > li")
      .eq(0)
      .should("contain", "The Bodyguard");
    cy.get("#discs > li")
      .eq(1)
      .should("contain", "Bat Out of Hell");
    cy.get("#discs > li")
      .eq(2)
      .should("contain", "Their Greatest Hits (1971–1975)");
  });

  it("renders not found page when path param does not exists", function() {
    cy.visit("http://localhost:3000/collection/123");
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection/123",
      status: 404,
      response: collection
    });

    cy.get("#discs").should("not", "exists");

    cy.get("#error > p").should(
      "contain",
      "Ops! A coleção que tentou acessar não existe"
    );
  });
});
