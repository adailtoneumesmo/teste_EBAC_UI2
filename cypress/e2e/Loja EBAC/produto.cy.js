/// <reference types="cypress" />
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade Pagina de produto', () => {

    beforeEach(() => {
        produtosPage.visitarUrl()
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block')
            //.first()
            //.last()
            //.eq(3)
            .contains('Ariel Roll Sleeve Sweatshirt')
            .click()
    });

    it('Deve adicionar um produto ao carrinho', () => {
        var quantidade = 8

        cy.get('.product-block')
            .contains('Ariel Roll Sleeve Sweatshirt')
            .click()
            cy.get('.button-variable-item-XS').click()
            cy.get('.button-variable-item-Green').click()
            cy.get('.input-text').clear().type(quantidade)
            cy.get('.single_add_to_cart_button').click()

            cy.get('.dropdown-toggle > .mini-cart-items').should('contain' , quantidade)
            cy.get('.woocommerce-message').should('contain' , quantidade +' × “Ariel Roll Sleeve Sweatshirt” foram adicionados no seu carrinho.')


    });

    it('Deve selecionar um produto da lista com sucesso', () => {
        produtosPage.buscarProdutoLista('Aether Gym Pant')
        cy.get('.product_title').should('contain' , 'Aether Gym Pant')
    });    
    
    it('Deve Buscar um produto com sucesso', () => {
        let produto ='Apollo Running Short'

        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain' , produto)
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('Apollo Running Short')
        cy.get('.product_title').should('contain' , 'Apollo Running Short')
    });

    
    it('Deve adcionar produto ao carrinho', () => {
        let qtd = 6
        produtosPage.buscarProduto('Chaz Kangeroo Hoodie')
        produtosPage.addProdutoCarrinho('XL', 'Orange', qtd)
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain' , qtd)
    });

    it.only('Deve adcionar produto ao carrinho usando massa de dados', () => {
        cy.fixture('produtos').then(dados =>{

            produtosPage.buscarProduto(dados[3].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[3].tamanho,
                dados[3].cor,
                dados[3].quantidade)
            cy.get('.dropdown-toggle > .mini-cart-items').should('contain' , dados[3].quantidade)


        })
     
    });

});