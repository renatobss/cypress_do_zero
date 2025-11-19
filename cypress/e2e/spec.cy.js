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

  it.only('Cadastrando usuário', () => {
    cy.visit('https://front.serverest.dev/login')
    cy.get('[data-testid="email"]').type('renato@teste.com.br')
    cy.get('[data-testid="senha"]').type('123')
    cy.get('[data-testid="entrar"]').click()

// aguarda a UI renderizar alerta OU redirecionar
  cy.wait(3000)

  // valida erro de login
  cy.get('body').then($body => {
    if ($body.find('.alert').length) {
      throw new Error('Login inválido — encerrando o teste')
    }
  })
    cy.contains('h1', 'Bem Vindo').should('be.visible')

    //clicar para cadastrar o usuário
      cy.get('[data-testid="cadastrarUsuarios"]').click()
      cy.get('h1').contains('Cadastro de usuários')

    //informar os dados do novo usuário
      cy.get('[data-testid="nome"]').type('juca1')
      cy.get('[data-testid="email"]').type('juca@teste1.com.br')
      cy.get('[data-testid="password"]').type('123')
      cy.get('[data-testid="cadastrarUsuario"]').click()
      cy.wait(5000)

    //valida erro ao cadastrar usuário
    cy.get('body').then($body => {
      if($body.find('.alert').length){
        throw new Error('Erro ao cadastrar usuário - encerrando o teste')
      }
    })    

    cy.contains('h1', 'Lista dos usuários').should('be.visible')

  })

})