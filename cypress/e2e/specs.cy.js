describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

cy.get('.category-cards > :first-child', { timeout: 15000 }).should('be.visible').click();
