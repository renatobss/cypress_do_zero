describe('Login', () => {
    it("Realizar login com sucesso", () => {
        cy.visit("https://www.saucedemo.com");

        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();

        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');

    })

    it("Realizar login com sucesso usando comandos personalizados", () => {
        cy.visit("https://www.saucedemo.com");
        cy.login('standard_user', 'secret_sauce');

        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');

    })

    it("Realizar teste de login com falha", () => {
        cy.visit("https://www.saucedemo.com");
        cy.login('aaaaa', '4d554545');

        cy.get('[data-test="error"]').should(
            'include.text',
            'Epic sadface: Username and password do not match any user in this service'
        );
    })

    it.only("Realizar teste de login, validando usuário / senha não informado", () => {
        cy.visit("https://www.saucedemo.com");
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]')
        .should('be.visible')
        .and('exist');
    })

})