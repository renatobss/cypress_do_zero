it("Verificar se elemento existe no DOM", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('[data-test="username"]').should('exist');
}
)

it("Verificar texto no DOM", () => {
    cy.visit("https://www.saucedemo.com");
    cy.contains(' username').should('be.visible');
}
)

it("Verificar texto dentro de um elemento:", () => {
    cy.visit("https://www.saucedemo.com");

    cy.contains('h4', 'Password').should('be.visible');
}
)

it("Forçando erro para verificar o retry", () => {
    cy.visit("https://www.saucedemo.com");

    cy.title().should('equal', 'Swag Lab');
})

it("Explorar mudança do DOM depois do click", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('[data-test="login-button"]').click();

    cy.get('input').should('be.visible'); // verificando a tag input do html (como existe, o teste passa)
    cy.get('.alert').should('be.visible'); // verificando se a classe .alert está vísivel (como não existe, o teste vai falhar)
})


it("Verificando conteúdo do Body", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('body').then($body => {
        //cy.log($body.text())

        if ($body.find('.alert').length){
            cy.log('O alerta existe!')
        } else {
            cy.log('O alerta não existe');
        }
    })
})

it.only("Realizando validação de usuário / senha não informado com o IF", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('[data-test="username"]').type('teste');
    cy.get('[data-test="password"]').type('47879');
    cy.get('[data-test="login-button"]').click();

    cy.get('body').then($body => {

    const senha = $body.find('[data-test="password"]').val();

    //cy.pause();
    
    cy.get('[data-test="username"]').debug()

    //cy.log('A senha.:', senha);

    if (senha == '') {
        cy.log('A senha não foi informada!');
    }else{
        cy.log('Senha informada.:', senha);
    }

    })

})
