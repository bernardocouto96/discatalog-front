import collectionList from "../fixtures/collectionList";
import collectionListWithCreatedOne from "../fixtures/collectionListWithCreatedOne";

describe("Collection List Test", function() {
  it("renders every collections correctly", function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection",
      response: collectionList
    });
    cy.visit("http://localhost:3000");

    cy.get("#collections > li").should("have.length", 4);

    cy.get("#collections > li")
      .eq(0)
      .should("contain", "Top 1 - 3");
    cy.get("#collections > li")
      .eq(1)
      .should("contain", "Top 4 - 6");
    cy.get("#collections > li")
      .eq(2)
      .should("contain", "Top 7 - 9");
    cy.get("#collections > li")
      .eq(3)
      .should("contain", "Criar nova coleção");
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

  it("creates a new collection", function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection",
      response: collectionList
    });
    cy.route({
      method: "POST",
      url: "/discatalog/collection",
      response: {}
    });
    cy.visit("http://localhost:3000");

    cy.get("#collections > li").should("have.length", 4);

    cy.route({
      method: "GET",
      url: "/discatalog/collection",
      response: collectionListWithCreatedOne
    });

    cy.get("#addCollection").click();
    cy.get("#newCollectionName").type("My new collection");
    cy.get("#createCollection").click();

    cy.get("#collections > li").should("have.length", 5);

    cy.get("#collections > li")
      .eq(0)
      .should("contain", "Top 1 - 3");
    cy.get("#collections > li")
      .eq(1)
      .should("contain", "Top 4 - 6");
    cy.get("#collections > li")
      .eq(2)
      .should("contain", "Top 7 - 9");
    cy.get("#collections > li")
      .eq(3)
      .should("contain", "My new collection");
    cy.get("#collections > li")
      .eq(4)
      .should("contain", "Criar nova coleção");
  });
});
