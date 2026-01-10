it("Exercício 1: Verificando se o título da página existe", () => {
    cy.visit("https://front.serverest.dev");

    //cy.pause();

    cy.title().should('contain', 'Front - ServeRest');
    cy.title().should('exist');
    cy.title().should('not.be.empty');
})

it.only("Exercício 2: Verificando se existe um texto específico em um h1", () => {
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

    //abertura da página "About"
    cy.get('[data-test="about-sidebar-link"]').click();

    //validando se a tela foi aberta corretamente
    cy.url().should('eq', 'https://saucelabs.com/');

    //resolução do exercício 02
    cy.contains('h1', 'Build apps users love with AI-driven quality').should('be.visible');
})

//próximo exercício é o 03