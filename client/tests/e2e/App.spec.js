/// <reference types="Cypress" />

describe('App', () => {
  it('should render and start with the login screen', () => {
    cy.viewport('iphone-8')
    cy.visit('/')
    cy.get('h1').contains('teal')
    cy.get('button[name="loginButton"]').contains("Let's get started")
  })
})
