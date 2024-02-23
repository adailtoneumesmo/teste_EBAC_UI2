/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

context('Efetuar login', (() => {

    beforeEach(() => {
        cy.visit('minha-conta')

    })

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer o login com sucesso', () => {

        cy.get('#username').type('adailtoneumesmo@gmail.com')
        cy.get('#password').type('Eumesmo@11060')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, adailtoneumesmo')

    })

    it('Deve fazer login com sucesso - Usando arquivo de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()

        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it('Deve fazer login com sucesso - Usando Fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario, {log:false})
            cy.get('#password').type(dados.senha , {log:false})

            cy.get('.page-title').should('contain', 'Minha conta')
        })
    });

    it('Deve exibir uma mensagem de erro ao inserir usuario invalido', () => {

        cy.get('#username').type('adailtoneumes@gmail.com')
        cy.get('#password').type('Eumesmo@11060')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido')
    })

    it('Deve exibir uma mensagem de erro ao inserir senha invalida', () => {

        cy.get('#username').type('adailtoneumesmo@gmail.com')
        cy.get('#password').type('teste@teste')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail adailtoneumesmo@gmail.com está incorreta')

    })

    it('Deve fazer Login com sucesso - usando comando customizados', () => {
        cy.login('adailtoneumesmo@gmail.com' ,'Eumesmo@11060')

        cy.get('.page-title').should('contain', 'Minha conta')
        });

}))