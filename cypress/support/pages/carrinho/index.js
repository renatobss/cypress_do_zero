const el = require('./elements').ELEMENTOS;

class Carrinho {
    acessarLogin(){
        cy.visit('https://www.saucedemo.com');
    }

    preencherLogin(){
        cy.get(el.usuario).type('standard_user');
        cy.get(el.senha).type('secret_sauce');
        cy.get(el.botaoLogin).click();
    }

    adicionarItem(){
        cy.get(el.botaoAdicionarItem).click();
    }

    validarCarrinho(){
        cy.get(el.vCarrinho)
         .should('be.visible')
         .and('have.text', '1')
    }
}

export default new Carrinho();