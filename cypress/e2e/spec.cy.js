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

    //clicar para cadastrar o usuário
    cy.get('[data-testid="cadastrarUsuarios"]').click()
    cy.get('h1').contains('Cadastro de usuários')

    //informar os dados do novo usuário
    cy.get('[data-testid="nome"]').type('juca')
    cy.get('[data-testid="email"]').type('juca@teste.com.br')
    cy.get('[data-testid="password"]').type('123')
    cy.get('[data-testid="cadastrarUsuario"]').click()
    cy.wait(5000)
    cy.get('h1').contains('Lista dos usuários')

    //próximo dia verificar quando não consegue cadastrar o usuário, pois dá erro quando tento listar os usuários (Inserir verificação para garantir)
    //que somente tente listar os usuário quando conseguir cadastrar.

  })

})