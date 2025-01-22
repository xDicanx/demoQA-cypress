describe('Login and Logout testing', () => {
  //Login constants
  const username = Cypress.env('username');
  const password = Cypress.env('password');
  beforeEach(()=>{
    cy.goToEcommerceSection();
  });
  //Login test
  it('login', () => {
    cy.login(username,password);
    cy.contains('SHOPPING CART').should('be.visible'); //if this text is visible means that the login was succeful
    cy.screenshot('login-screenshot');
  });

  it('Invalid credentials',()=>{
    cy.get("#email").type("username");
    cy.get("#password").type("password");
    cy.get("#submitLoginBtn").click();
    cy.get(".alert").should('have.css', 'display', 'block').and('be.visible');
    cy.screenshot('invalid credentials')
  });

  it('blank credentials',()=>{
    cy.get("#submitLoginBtn").click();
    cy.get(".alert").should('have.css', 'display', 'block').and('be.visible');
    cy.screenshot('blank credentials')
  });

  it('logout', () => {
    cy.login(username, password);
    cy.get('#logout').click();
    cy.contains('Login').should('be.visible'); //if this text is visible means that the logout was succeful
    cy.screenshot('logout-screenshot');
  });

});
