import collection from "../fixtures/collection";
import collectionWithDeletedDisc from "../fixtures/collectionWithDeletedDisc";
import editedCollection from "../fixtures/editedCollection";

describe("Collection Test", function() {
  it("renders collection from path param correctly", function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection/2",
      response: collection
    });
    cy.visit("http://localhost:3000/collection/2");

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

  it("deletes a disc successfully", function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection/2",
      response: collection
    });
    cy.route({
      method: "DELETE",
      url: "/discatalog/collection/2/4",
      response: {}
    });

    cy.visit("http://localhost:3000/collection/2");
    cy.get("#discs > li")
      .eq(0)
      .should("contain", "The Bodyguard");

    cy.route({
      method: "GET",
      url: "/discatalog/collection/2",
      response: collectionWithDeletedDisc
    });

    cy.get("#delete-4").click();

    cy.get("#discs > li")
      .eq(0)
      .should("contain", "Bat Out of Hell");
  });

  it("edits a disc successfully", function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection/2",
      response: collection
    });

    cy.route({
      method: "PUT",
      url: "/discatalog/collection/2/4",
      response: {}
    });

    cy.visit("http://localhost:3000/collection/2");
    cy.get("#edit-4").click();

    cy.get("#editName").should("have.value", "The Bodyguard");
    cy.get("#editArtist").should("have.value", "Whitney Houston");
    cy.get("#editReleaseYear").should("have.value", "1992");
    cy.get("#editGenre").should("have.value", "R&B, soul, pop, soundtrack");

    cy.route({
      method: "GET",
      url: "/discatalog/collection/2",
      response: editedCollection
    });

    cy.get("#editName")
      .clear()
      .type("My edited name");
    cy.get("#editArtist")
      .clear()
      .type("My edited artist");
    cy.get("#editGenre")
      .clear()
      .type("My edited genre");

    cy.get("#sendEdit").click();

    cy.get("#discs > li")
      .eq(0)
      .should("contain", "My edited name");
    cy.get("#discs > li")
      .eq(1)
      .should("contain", "Bat Out of Hell");
    cy.get("#discs > li")
      .eq(2)
      .should("contain", "Their Greatest Hits (1971–1975)");
  });
});
