describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    // 1. visit web server root
    cy.visit("/");

    // 2. Find list item that contained text "tuesday" and click it
    // 3. use css color class "day-list__item--selected" to confirm li element selected contains "Tuesday"
    cy.contains("[data-testid=day]", "Tuesday")
      .click()      
      .should("have.class", "day-list__item--selected");
  });

});