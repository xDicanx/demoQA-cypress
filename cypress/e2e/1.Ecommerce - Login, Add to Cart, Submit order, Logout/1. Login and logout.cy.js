describe('Login and Logout testing', () => {
  //Login constants
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  //Login test
  it('login', () => {
    cy.login(username,password);
    cy.contains('SHOPPING CART').should('be.visible'); //if this text is visible means that the login was succeful
  });

  it('logout', () => {
    cy.login(username, password);
    cy.get('#logout').click();
    cy.contains('Login').should('be.visible'); //if this text is visible means that the logout was succeful
  });

});
