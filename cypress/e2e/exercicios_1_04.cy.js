it("Exercício 1: Verificando se o título da página existe", () => {
    cy.visit("https://front.serverest.dev");

    //cy.pause();

    cy.title().should('contain', 'Front - ServeRest');
    cy.title().should('exist');
    cy.title().should('not.be.empty');
})

it("Exercício 2: Verificando se existe um texto específico em um h1", () => {
    cy.visit("https://www.saucedemo.com");
    cy.login('standard_user', 'secret_sauce')

    cy.url().should('include', '/inventory.html');
    //cy.location();
    
    cy.location().then(teste => {
        cy.log(teste.pathname)
    })

    cy.location('pathname').should('eq', '/inventory.html')

    //abertura do menu (Utilizado o ID para abrir)
    cy.get('#react-burger-menu-btn').click();

    //validando se o menu está aberto através do data-test
    cy.get('[data-test="inventory-sidebar-link"]')
    .should('exist')
    .and('be.visible');

    cy.get('[data-test="about-sidebar-link"]')
    .should('have.attr', 'href')
    .and('include', 'saucelabs.com/');    

     //abertura da página "About"
    cy.get('[data-test="about-sidebar-link"]').click();

    //validando se a tela foi aberta corretamente
    cy.url().should('eq', 'https://saucelabs.com/');

    //resolução do exercício 02
    cy.contains('h1', 'Build apps users love with AI-driven quality').should('be.visible');
})

it("Exercício 03: Validar campo obrigatório", () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');

    cy.contains('button', 'Login').click();
    cy.url().should('include', 'dashboard/index');

    cy.contains('.oxd-main-menu-item--name', 'Recruitment').click();
    cy.location('pathname').should('eq', '/web/index.php/recruitment/viewCandidates');

    cy.contains('button', 'Add').click();


    //salvar cadastro de requirimento sem campos obrigatórios
    cy.contains('button', 'Save').click();

    //validando campo obrigatório
    cy.get('input[name="firstName"]')
    .parents('.oxd-input-group')
    .find('.oxd-input-field-error-message')
    .should('contain.text', 'Required');
})

it('Resolvendo exercício 3 em outro server de teste.', () => {
    cy.visit('https://front.serverest.dev/login');

    cy.get('[data-testid="entrar"]').click();

    cy.contains('.alert', 'Email é obrigatório');
    cy.get('span')
    .should('contain.text', 'Email é obrigatório')
    .and('contain.text', 'Password é obrigatório');
})

it.only("Exercício 04: Verificar se botão está visível e habilitado", () => {
    cy.visit('https://www.saucedemo.com');

    cy.get('[data-test="login-button"]').click();

    //verificando se o botão está visível e habilitado
    cy.get('[data-test="login-button"]')
    .should('be.visible')
    .and('be.enabled')

    cy.get('h3')
    .find('[class="error-button"]')//
    //.should('contain.text', 'Epic sadface: Username is required');
})