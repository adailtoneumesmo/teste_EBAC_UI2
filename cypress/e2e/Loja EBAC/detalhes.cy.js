///<reference types="cypress" />

describe('Funcionalidade detalhes da conta', () => {

    beforeEach(() => {
        cy.visit('minha-conta/edit-account/')
        cy.login('adailtoneumesmo@gmail.com' , 'Eumesmo@11060')
    });
    
    it('Deve completar detalhes da conta com sucesso', () => {
        cy.detalhesConta('Adailton' ,'Alves', 'adailton.Qa' )
        cy.get('.woocommerce-message').should('contain' , 'Detalhes da conta modificados com sucesso.')
    });
});