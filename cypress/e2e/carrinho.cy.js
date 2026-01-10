import Carrinho from '../support/pages/carrinho/index.js';

describe('Carrinho', () => {

    //it.only('debug', () =>{
    //    cy.log(JSON.stringify(Car))
    //    console.log(Car);
    //})

    it('Adicionar produto ao carrinho com sucesso', () => {

        Carrinho.acessarLogin();

        Carrinho.preencherLogin();

        Carrinho.adicionarItem();

        Carrinho.validarCarrinho(); 

    })
})