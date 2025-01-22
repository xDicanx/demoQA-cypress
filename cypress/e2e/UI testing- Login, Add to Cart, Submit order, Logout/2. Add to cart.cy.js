describe('Add to cart testing', () => {
  //Login constants
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  //Add to cart 
  it('Add to cart', () => {
    cy.goToEcommerceSection();
    cy.login(username,password);
    cy.addToCart();
    cy.verifyCartSum();
  });
});
