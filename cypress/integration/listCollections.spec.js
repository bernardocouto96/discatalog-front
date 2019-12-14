import collectionList from "../fixtures/collectionList";

describe("List Collections Test", function() {
  it("renders every collections correctly", function() {
    cy.visit("http://localhost:3000");
    cy.server();
    cy.route({
      method: "GET",
      url: "/discatalog/collection",
      response: collectionList
    });

    cy.get("#collections > li").should("have.length", 3);
  });
});
