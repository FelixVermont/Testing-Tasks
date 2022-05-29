describe('Invity task', () => {
    beforeEach(() => {
        cy.visit('https://invity.io/')
    });

    it('Checks the URL', () => {
        cy.url().should('contain', 'invity.io');
    )
};

it('Searching the deal', () => {
    //Accessing the 'Exchange crypto' page, filling in 10LTC 
    cy.get('.fw-normal nav-link active').click();
    cy.get('.border-radius-right-zero form-control form-control-lg').within(() => {
        cy.get('input:first').should('have.attr', 'placeholder', '0.00')
            .type('10');
    })

    //Checking whether the currencies are LTC and BTC
    cy.get('.react-select pointer crypto-currency-picker border-radius-left-zero react-select__large css-2b097c-container')
        .contains('.picker-coin-code me-4').should('have.class', 'LTC');
    cy.get('.react-select pointer crypto-currency-picker react-select__large css-2b097c-container')
        .contains('.picker-coin-code me-4').should('have.class', 'BTC');

    //Pressing search
    cy.get('.text-nowrap btn-md-down-fluid btn btn-primary btn-lg').click();
    cy.wait(4000);
});

it('Here\'s the deal', () => {
    //Displaying and verifying the best deal. Here I am trying to click on the 'Get this deal' button only in the case it contains the 'Best offer' badge. The logic is flawed though.
    cy.get('.g-0 row')
        .contains('.align-super ms-3 position-absolute mt-1 badge bg-success')
        .should('contain', 'Best offer');
          .within(() => {
            cy.get('.w-100 btn btn-primary').click();
        })
    cy.wait(4000);
    cy.get('.pb-0 modal-body').within('mt-2 btn btn-primary').click();
    cy.wait(4000);
})

it('Results verification', () => {
    //Verifying the correct page and the amount of LTC
    cy.should('have.text', 'So here\'s the deal...');
    cy.url().should('eq', 'http://localhost:https://invity.io/exchange-crypto/transact#step1/users/1/edit');
    cy.get('.card border-card p-4 p-sm-5 mt-n11 mx-0').contains('LTC 10.0000');
})

);


