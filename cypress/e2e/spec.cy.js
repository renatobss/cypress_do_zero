describe('Teste de Login', () => {
  it('Login com sucesso', () => {
    cy.visit('https://front.serverest.dev/login')
    cy.get('[data-testid="email"]').type('renato@teste.com.br')
    cy.get('[data-testid="senha"]').type('123')
    cy.get('[data-testid="entrar"]').click()

    cy.get('a[data-testid="listarProdutos"]').click()
    cy.get('h1').contains('Lista dos Produtos')

  })

  it('Login com falha', () => {
    cy.visit('https://front.serverest.dev/login')
    cy.get('[data-testid="email"]').type('renato@teste.com.br')
    cy.get('[data-testid="senha"]').type('12345')
    cy.get('[data-testid="entrar"]').click()

    //cy.get('.alert')
    //  .should('be.visible')
    //  .and('contain', 'Email e/ou senha inválidos')

    cy.get('.alert').contains('Email e/ou senha inválidos')
  })

  it('Validando campos obrigatórios', () => {
    cy.visit('https://front.serverest.dev/login')

    cy.get('[data-testid="entrar"]').click()

    cy.get('.alert').contains('Email é obrigatório')
    cy.get('.alert').contains('Password é obrigatório')
  })

})