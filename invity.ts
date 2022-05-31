/// <reference types="cypress" />

/*
Steps:
1. navigate to the Invity web
2. verify that you’re indeed on a correct url (https://invity.io/)
3. navigate to `Exchange crypto` page
4. fill in the exchange form in order to change `10 LTC` to `BTC`
5. click on `Compare offers`
6. wait for the offers to appear
7. select the row containing `Best deal` label and click on `Get this deal`
8. verify that you’re on the page containing `So here's the deal`
9. verify that the `LTC` amount in the header of the page is indeed set to `10`
---

- Projekt nesel spustit sam o sobe (neobsahoval package.json ani cypress strukturu), takze hodnotim pouze logiku.
- Code review poznamky v kodu zacinaji vzdy "CR: "
- selektory by se obecne daly napsat elegantnej, mnohoclenne classy se vetsinou meni, a selektory by se tak rozbily

1. OK
2. OK
3. OK -> nefunkcni selektor (ale myslim ze se zmenil frontend, takze tady bych to jako chybu nebral)
4. OK
5. OK
6. OK
7. OK
8. OK 
9. OK
*/


describe('Invity task', () => {
    beforeEach(() => {
        cy.visit('https://invity.io/')
    });

    it('Checks the URL', () => {
        cy.url().should('contain', 'invity.io');
    });

    it('Searching the deal', () => {
        //Accessing the 'Exchange crypto' page, filling in 10LTC 
        // CR: uvital bych spis pouziti cy.contains() + zobrazeny text "Exchange crypto"
        cy.get('.fw-normal nav-link active').click();
        // CR: .within se hodi v situaci, kdy se pracuje s vetsim mnozstvim elementu. V tomto pripade (pouze jeden element)
        // se mnohem vice hodi obycejne .find
        cy.get('.border-radius-right-zero form-control form-control-lg').within(() => {
            // CR: pseudo-class ":first" se takto pouzit neda, v teto situaci (pri nutnosti pouziti CSS) 
            // by daval smysl spise ":first-child". Cypress ma nicmene command ".fist()", ktery by byl uplne nejlepsi.
            cy.get('input:first').should('have.attr', 'placeholder', '0.00')
                .type('10');
        });

        //Checking whether the currencies are LTC and BTC
        // CR: velmi nestabilni selektor, tento krok take nebyl v zadani
        cy.get('.react-select pointer crypto-currency-picker border-radius-left-zero react-select__large css-2b097c-container')
            .contains('.picker-coin-code me-4').should('have.class', 'LTC');
        cy.get('.react-select pointer crypto-currency-picker react-select__large css-2b097c-container')
            .contains('.picker-coin-code me-4').should('have.class', 'BTC');

        //Pressing search
        // CR: tady bych zase uvital spise vyuziti zobrazeneho textu
        cy.get('.text-nowrap btn-md-down-fluid btn btn-primary btn-lg').click();
        // CR: tady by se mel pouzit nejaky dynamicky wait, napr. pockani na to, az se objevi nejaky element z nove stranky
        cy.wait(4000);
    });

    it('Here\'s the deal', () => {
        //Displaying and verifying the best deal. Here I am trying to click on the 'Get this deal' button only in the case it contains the 'Best offer' badge. The logic is flawed though.
        cy.get('.g-0 row')
            .contains('.align-super ms-3 position-absolute mt-1 badge bg-success')
            .should('contain', 'Best offer')
            // CR: to same jako u .within komentare vyse, stacilo by pouziti .find
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
        // CR: tady nejspis omylem zustal nejaky localhost
        cy.url().should('eq', 'http://localhost:https://invity.io/exchange-crypto/transact#step1/users/1/edit');
        cy.get('.card border-card p-4 p-sm-5 mt-n11 mx-0').contains('LTC 10.0000');
    })

});


