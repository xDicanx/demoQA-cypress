// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://qa-practice.netlify.app/');
    cy.get('#ul-menu-items > :nth-child(1)').click();
    cy.get('#email').type(username);
    cy.get('#password').type(password);
    cy.get('#submitLoginBtn').click();
});

Cypress.Commands.add("addToCart", () => {
    cy.get('.shop-items').children().each(($shopItem) => {
        // Obtener el título del artículo de la tienda
        const shopItemTitle = $shopItem.find('.shop-item-title').text();
        const shopItemPrice = $shopItem.find('.shop-item-price').text();

        // Añadir el artículo al carrito
        cy.wrap($shopItem).find('button[type="button"]').click();

        // Verificar que el último artículo añadido al carrito tiene el mismo título
        cy.get('.cart-items')
            .find('.cart-row')
            .last()
            .find('.cart-item-title')
            .should('have.text', shopItemTitle);

        //Verify if the last item added to the cart has the same price
        cy.get('.cart-items')
            .find('.cart-row')
            .last()
            .find('.cart-price.cart-column')
            .should('have.text', shopItemPrice);
    });
    // Desplazar al tope de la página después de añadir los elementos
    cy.scrollTo('top');

});

Cypress.Commands.add("verifyCartSum", () => {
    cy.get('.cart-items').children().then($cartItems => {
        let grandTotal = 0;
        cy.wrap($cartItems).each($item => {
            cy.wrap($item)
                .find('.cart-price.cart-column')
                .invoke('text')
                .then((priceText) => {
                    const price = parseFloat(priceText.replace('$', '').trim()); // Convertir precio a número
                    // Obtener la cantidad
                    cy.wrap($item)
                        .find('.cart-quantity-input')
                        .invoke('val') // Obtener el valor del input
                        .then((quantityText) => {
                            const quantity = parseInt(quantityText.trim(), 10); // Convertir cantidad a número
                            // Multiplicar cantidad por precio
                            const total = price * quantity;
                            grandTotal += total;
                        });
                });
        }).then(() => {
            cy.get('.cart-total-price').invoke('text').then(cartTotalSum => {
                const rounded = parseFloat(grandTotal.toFixed(2));
                expect('$' + rounded).to.eq(cartTotalSum);
                return rounded;
            });
        });
    });
});
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })