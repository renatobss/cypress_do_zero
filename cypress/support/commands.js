Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('[data-test="username"]').type(usuario);
    cy.get('[data-test="password"]').type(senha);
    cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('AdicionarItem', (produto) => {
    cy.get(`[data-test="add-to-cart-sauce-labs-${produto}"]`).click()
})

Cypress.Commands.add('RemoverItemCarrinho', (produto) => {
    cy.get(`[data-test="remove-sauce-labs-${produto}"]`).click()
})

Cypress.Commands.add('AcessarCarrinho', () => {
    cy.get('[data-test="shopping-cart-link"]').click()
})

Cypress.Commands.add('PreencheFormulario', (nome, sobrenome, cep) => {
    cy.get('[data-test="firstName"]').type(nome)
    cy.get('[data-test="lastName"]').type(sobrenome)
    cy.get('[data-test="postalCode"]').type(cep)
})

Cypress.Commands.add('AcessarPagamento', () => {
    cy.get('[data-test="continue"]').click()            
})

Cypress.Commands.add('AcessarCheckout', () => {
    cy.get('[data-test="checkout"]').click()
})

Cypress.Commands.add('FinalizarCompra', () => {
    cy.get('[data-test="finish"]').click()
})

Cypress.Commands.add('TransformaTextoNumero', (seletor) => {
    return cy.get(seletor).invoke('text').then(texto => {
        const numero = Number(texto.replace('$', '').trim())
        return numero
    })
})

Cypress.Commands.add('VerificaCampoObrigatorio', (campo, mensagem) => {
    cy.get(`[data-test="${campo}"]`).clear()
    cy.AcessarPagamento()
    cy.get('[data-test="error"]').should('contain.text', `${mensagem}`)
})

Cypress.Commands.add('CalculaSubTotal', () => {
    cy.get('body').then($body => {
        const itens = $body.find('[data-test="inventory-item-price"]')
        let soma = 0
        for (let i = 0; i < itens.length; i++) {
            const item = itens[i].innerText
            const valor = Number(item.replace('$', '').trim())
            soma = soma + valor            
        }
        return soma   
    })
})

Cypress.Commands.add('ValidaSubTotal', () => {
    cy.CalculaSubTotal().then(totalItens => {
            cy.get('[data-test="subtotal-label"]').invoke('text').then(valorSeletor => {
            const vSeletor = Number(valorSeletor.replace('Item total: $', '').trim())
            //return vSeletor
            expect(totalItens).to.equal(vSeletor)
        })
    })
})

Cypress.Commands.add('RetornaValorTaxa', () => {
    cy.get('[data-test="tax-label"]').invoke('text').then(texto => {
        const valorTaxa = Number(texto.replace('Tax: $', '').trim())
        return valorTaxa
    })
})

Cypress.Commands.add('ValidaTotal', () => {
    cy.RetornaValorTaxa().then(taxa => {
        cy.CalculaSubTotal().then(subtotal => {
            //const totalCompra = subtotal + taxa
            return subtotal + taxa
        })
    }).then((total) => {
        cy.get('[data-test="total-label"]').invoke('text').then(texto => {
            const vtotalCompra = Number(texto.replace('Total: $', '').trim())

            expect(total).to.equal(vtotalCompra)
        })
    })
})

Cypress.Commands.add('AdicionarItensFor', (produtos) => {
    for (let i = 0; i < produtos.length; i++) {
        //console.log(produtos[i])
        //const teste = produtos[i]
        //se colocar teste no lugar de produtos[i] também funciona
        cy.get(`[data-test="add-to-cart-sauce-labs-${produtos[i]}"]`).click()
    }
})

