//const { createYield } = require("typescript")

context("Inserting zip code", () => {
  it("Enter the page", () => {
    cy.visit("localhost:3000");
    cy.viewport(1440, 900);
  });

  it("Tries to click without inserting a CEP", () => {
    cy.viewport(1440, 900);

    cy.get("button").should("be.disabled");
  });

  it("Tries to click inserting a CEP with letters", () => {
    cy.viewport(1440, 900);

    cy.get('[type="number"]').type("abracadabra");
    cy.get("button").should("be.disabled");
  });

  it("Tries to click inserting a incomplete CEP", () => {
    cy.viewport(1440, 900);

    cy.get('[type="number"]').type("6041");
    cy.get('[type="number"]').should("not.have.length", 8);
  });

  it("Tries to inserting a new CEP", () => {
    cy.viewport(1440, 900);

    cy.intercept("POST", {
      statusCode: 200,
      body: {
        complemento: "de 351/352 a 1298/1299",
        bairro: "Jardim América",
        cidade: "Fortaleza",
        logradouro: "Rua Júlio César",
        estado_info: {
          area_km2: "148.887,632",
          codigo_ibge: "23",
          nome: "Ceará",
        },
        cep: "60410505",
        cidade_info: {
          area_km2: "314,93",
          codigo_ibge: "2304400",
        },
        estado: "CE",
        id: 14,
      },
    }).as("new-CEP");

    cy.get('[type="number"]').clear();
    cy.get('[type="number"]').type("60410505");
    cy.get("button").click();
  });

  it("Trys type a new Complement", () => {
    cy.viewport(1440, 900);

    //cy.get('[type=text]').type("")
    cy.get('input[placeholder="Apartamento, bloco, ..."]').type("casa");
  });
});
