describe("Testing website functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("contains the HTML elements", () => {
    cy.get("main").should("exist");
    cy.get("h1").should("have.text", "Daily Exchange Rates");
    cy.get("form").should("exist");
    cy.get("tbody")
      .should("exist")
      .find("td")
      .should("have.text", "No data available");
  });

  it("prevents empty form submission", () => {
    cy.get("button").click();
    cy.get("tbody")
      .should("exist")
      .find("td")
      .should("have.text", "No data available");
  });

  it("contains all the country codes available on the API", () => {
    const minAmount = 20;
    cy.get("select").find("option").should("have.length.gt", minAmount);
  });

  it("fetches the data successfully", () => {
    const minAmount = 20;
    cy.get("select").select(1);
    cy.get("button").click();
    cy.get("tbody").find("tr").should("have.length.gt", minAmount);
  });
});
