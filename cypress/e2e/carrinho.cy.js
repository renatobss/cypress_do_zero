describe('Carrinho', () => {
    it('Adicionar produto ao carrinho com sucesso', () => {
        cy.visit('https://www.saucedemo.com');
        cy.login('standard_user', 'secret_sauce');
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        cy.get('[data-test="shopping-cart-link"]')
         .should('be.visible')
         .and('have.text', '1')

    })
})