describe('proceed order', () => {
    //Login constants
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    it('submit', () => {
        cy.login(username, password);
        cy.addToCart();
        cy.verifyCartSum().as('cartTotal');
        cy.get('.btn-purchase').click();
        cy.scrollTo('top');

        //this was harcoded due the site has not starized the placeholders and has undesired commented code causing to broke while looping through all the input tags
        cy.get('input').then(($inputs) => {
            const firstThreeInputs = $inputs.slice(0, 3); // Seleccionar los primeros 3 elementos
            cy.wrap(firstThreeInputs).each(($input, index) => {
                let typeInput = '';
                switch (index) {
                    case 0:
                        typeInput = '0123456789'
                        break;
                    case 1:
                        typeInput = 'This is an street address'
                        break;
                    case 2:
                        typeInput = 'This is a city'
                        break;
                }
                cy.wrap($input).type(typeInput); // Realizar acciones sobre cada input
            });
        });
        let selectedCountry;
        selectRandomCountryFromDropDownList();
        cy.get('button[type="submit"]').should('be.visible').click();
        cy.scrollTo('top');
        verifyIfMessageContainImportantData(); //total, street address, city, country
    });
});

function verifyIfMessageContainImportantData() {
    cy.get('@cartTotal').then(total => {
        cy.get('#message').should('contain.text', '$' + total);
        cy.get('#message').should('contain.text', 'This is an street address');
        cy.get('#message').should('contain.text', 'This is a city');
    });
    cy.get('@selectedCountry').then(country =>{
        cy.get('#message').should('contain.text', country);
    });
}

function selectRandomCountryFromDropDownList() {
    cy.get('#countries_dropdown_menu').then(($dropdown) => {
        const options = $dropdown.children(); // Obtiene las opciones
        const randomIndex = randomNumber(options.length); // Genera índice aleatorio
        const selectedValue = options[randomIndex].value; // Obtiene el valor de la opción seleccionada
    
        // Guardar el valor como un alias
        cy.wrap(selectedValue).as('selectedCountry');
    
        // Seleccionar la opción en el dropdown
        cy.wrap($dropdown).select(selectedValue);
      });
}

function randomNumber(maxQuantity) {
    let randomQuantity;
    do {
        randomQuantity = Math.floor(Math.random() * maxQuantity); // Generar número entre 0 y 9
    } while (randomQuantity === 0);
    return randomQuantity;
}