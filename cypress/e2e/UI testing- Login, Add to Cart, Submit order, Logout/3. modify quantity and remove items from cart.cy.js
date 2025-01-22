describe('Modify quantity and remove items from cart test', () => {
    //Login constants
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    beforeEach(() => {
        cy.goToEcommerceSection();
        cy.login(username, password);
        cy.addToCart();
    });

    it('modify quantity from a random item', () => {
        selectRandomProductInCart();//creates randomCartRow
        const randomQuantity = randomNumber(99);
        cy.get('@randomCartRow').find('.cart-quantity-input').clear().type(randomQuantity + '{enter}');
        cy.verifyCartSum();
    });

    it('remove random item from cart', () => {
        const numberOfItemsToDelete = randomNumber(5); // Selecciona un número aleatorio entre 2 y 5

        cy.get('.cart-items').find('.cart-row').then(($rows) => {
            let initialNumberOfItems = $rows.length;

            for (let i = 0; i < numberOfItemsToDelete; i++) {
                selectRandomProductInCart(); // Selecciona un producto al azar

                // Hacer clic en el botón de eliminar
                cy.get('@randomCartRow').find('.btn-danger').click();

                // Verificar que el número de elementos disminuyó
                cy.get('.cart-items')
                    .find('.cart-row')
                    .should('have.length', initialNumberOfItems - 1);

                // Actualizar el número inicial de elementos
                initialNumberOfItems--;
            }
        });
    });
});

function selectRandomProductInCart() {
    cy.get(".cart-items").find('.cart-row').then($rows => {
        const rowcount = $rows.length;
        const randomIndex = Math.floor(Math.random() * rowcount);
        cy.wrap($rows[randomIndex]).as('randomCartRow');
    });
}

//generates a random number between 2 and maxQuantity
//number one is avoided so the results can be randomly tested
function randomNumber(maxQuantity) {
    let randomQuantity;
    do {
        randomQuantity = Math.floor(Math.random() * maxQuantity); // Generar número entre 0 y 9
    } while (randomQuantity === 1 || randomQuantity === 0);
    return randomQuantity;
}