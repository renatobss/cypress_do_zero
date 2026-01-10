describe('Login', () => {
    beforeEach(() => {
        cy.visit('/');
    })
  
    it.only("Realizar login com sucesso", () => {
            
        cy.login('standard_user', 'secret_sauce')
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');

        cy.location().then((loc) => {
            const u = loc.pathname
            //cy.log(u)
            expect(u).to.equal('/inventory.html');
        })

        //a ação com then acima não precisava, fiz para praticar e entender melhor, o correto é a verificação abaixo
        cy.location('pathname').should('eq', '/inventory.html');

        cy.location().then((ver) => {
            console.log(ver);
        })

    })

    it("Realizar teste de login com falha", () => {
        cy.visit('/');
        cy.login('aaaaa', '4d554545');

        cy.get('[data-test="error"]').should(
            'include.text',
            'Epic sadface: Username and password do not match any user in this service'
        );
    })

    it("Realizar teste de login, validando usuário / senha não informado", () => {
        cy.visit('/')
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]')
        .should('be.visible')
        .and('exist');
    })

})

