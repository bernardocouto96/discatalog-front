import collection from "../fixtures/collection";
import collectionWithDeletedDisc from "../fixtures/collectionWithDeletedDisc";
import editedCollection from "../fixtures/editedCollection";
import collectionWithNewDisc from "../fixtures/collectionWithNewDisc";
describe("Collection Test", function() {
  it("renders collection from path param correctly", function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection/2",
      response: collection
    });
    cy.visit("http://localhost:3000/collection/2");

    cy.get("#discs > li").should("have.length", 4);

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

    cy.get("#formDiscName").should("have.value", "The Bodyguard");
    cy.get("#formDiscArtist").should("have.value", "Whitney Houston");
    cy.get("#formDiscReleaseYear").should("have.value", "1992");
    cy.get("#formDiscGenre").should("have.value", "R&B, soul, pop, soundtrack");

    cy.route({
      method: "GET",
      url: "/discatalog/collection/2",
      response: editedCollection
    });

    cy.get("#formDiscName")
      .clear()
      .type("My edited name");
    cy.get("#formDiscArtist")
      .clear()
      .type("My edited artist");
    cy.get("#formDiscGenre")
      .clear()
      .type("My edited genre");

    cy.get("#sendDisc").click();

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

  it("creates a disc successfully", function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection/2",
      response: collection
    });

    cy.route({
      method: "POST",
      url: "/discatalog/collection/2",
      response: {}
    });

    cy.visit("http://localhost:3000/collection/2");
    cy.get("#createDisc").click();

    cy.get("#formDiscName").should("have.value", "");
    cy.get("#formDiscArtist").should("have.value", "");
    cy.get("#formDiscReleaseYear").should("have.value", "");
    cy.get("#formDiscGenre").should("have.value", "");

    cy.route({
      method: "GET",
      url: "/discatalog/collection/2",
      response: collectionWithNewDisc
    });

    cy.get("#formDiscName")
      .clear()
      .type("My new disc name");
    cy.get("#formDiscArtist")
      .clear()
      .type("My new disc artist");
    cy.get("#formDiscGenre")
      .clear()
      .type("My new disc genre");
    cy.get("#formDiscReleaseYear")
      .clear()
      .type("1980");

    cy.get("#sendDisc").click();

    cy.get("#discs > li")
      .eq(0)
      .should("contain", "The Bodyguard");
    cy.get("#discs > li")
      .eq(1)
      .should("contain", "Bat Out of Hell");
    cy.get("#discs > li")
      .eq(2)
      .should("contain", "Their Greatest Hits (1971–1975)");
    cy.get("#discs > li")
      .eq(3)
      .should("contain", "My new disc name");
  });
});
