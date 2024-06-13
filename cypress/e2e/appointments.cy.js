describe("Appointments", () => {
  //run before each test
  beforeEach(() => {
    //reset and re-run tests
    cy.request("GET", "/api/debug/reset");
    // 1. Visit root of web server
    cy.visit("/");
    //2. Confrim DOM contains text "Monday"
    cy.contains("Monday");
  });

  it("should should book an interview", () => {
    // 1. Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
      .first()
      .click();
    // 2. Enters name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    // 3. Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();
    // 4. Clicks the save button
    cy.contains("Save")
      .click();
    // 5. Sees the booked appointment had student and interviewer names
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    //1. Clicks edit
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
    //2. Clears entry for for interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    //3. Selects new interviewer
    cy.get("[alt='Tori Malcolm']")
      .click();
    //4. Clicks save
    cy.contains("Save").click();
    // 5. Sees the booked appointment had student and new interviewer names
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // 1. Clicks delete
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });
     // 2. Clicks confirm 
     cy.contains("Confirm")
     .click();
     //3. Check deleting indicator exists
     cy.contains("Deleting").should("exist");
     //4. Check deleting indicator no longer exists
     cy.contains("Deleting").should("not.exist");
     //5. Check that appointmet card "Archie Cohen" should not exist.
     cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });
});