describe("Venda", () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce', {timeout:8000})
        cy.AdicionarItem('backpack')
        cy.AdicionarItem('bolt-t-shirt')
        //cy.wait(8000)
    })

    it.only('Validação Tela de Checkout', () => {
        cy.AcessarCarrinho()
        cy.AcessarCheckout()
        cy.PreencheFormulario('Juca', 'Bala', '85515000')
        cy.AcessarPagamento()

        cy.ValidaSubTotal()

        cy.ValidaTotal()
        
    })

    it('Verificação de campos obrigatórios através da função do commands', () => {
        cy.AcessarCarrinho()
        cy.AcessarCheckout()
        cy.url().should('equal','https://www.saucedemo.com/checkout-step-one.html')
        cy.location('pathname').should('equal', '/checkout-step-one.html')
        cy.VerificaCampoObrigatorio('firstName', 'Error: First Name is required')
    })

    it('Remover itens do carrinho', () => {
        cy.AcessarCarrinho()      
        cy.RemoverItemCarrinho('backpack')
        cy.RemoverItemCarrinho('bolt-t-shirt')     
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
    })

    it('Verificação de campos obrigatórios', () => {
        cy.AcessarCarrinho()
        cy.AcessarCheckout()
        cy.location('pathname').should('equal', '/checkout-step-one.html')
        cy.url().should('equal', 'https://www.saucedemo.com/checkout-step-one.html')
        
        cy.get('[data-test="firstName"]').clear()
        cy.AcessarPagamento()
        cy.get('[data-test="error"]').should('contain.text', 'Error: First Name is required')

        //cy.PreencheFormulario('renato', 'groff', '')
        cy.get('[data-test="firstName"]').type('renato')
        cy.get('[data-test="lastName"]').clear()
        cy.AcessarPagamento()
        cy.get('[data-test="error"]').should('contain.text', 'Error: Last Name is required')

        cy.get('[data-test="lastName"]').type('Groff')
        cy.get('[data-test="postalCode"]').clear()
        cy.AcessarPagamento()
        cy.get('[data-test="error"]').should('contain.text', 'Error: Postal Code is required')
    })

    it("Venda completa", () => {

        cy.AcessarCarrinho()

        //validando se tem itens no carrinho
        cy.get('[data-test="shopping-cart-badge"]').should('not.have.text', '0')
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible')

        //validando se o usuário foi direcionado pra página do carrinho
        cy.location('pathname').should('equal', '/cart.html')

        cy.AcessarCheckout()

        //validando se o usuário foi direcionado pra página correta
        cy.url().should('equal','https://www.saucedemo.com/checkout-step-one.html')
        cy.location('pathname').should('equal', '/checkout-step-one.html')

        //preenchendo dados do usuário pra finalizar a venda
        cy.PreencheFormulario('Juca', 'Bala', '85515000')

        cy.AcessarPagamento()

        //finalizar a compra
        cy.FinalizarCompra()

        cy.get('[data-test="complete-header"]').should('contain.text', 'Thank you for your order!')
        cy.location('pathname').should('equal', '/checkout-complete.html')
    })
})
