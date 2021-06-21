/// <reference types="Cypress" />

describe('App', () => {
  it('should select the 50 minutes timer, stop after four seconds, navigate to the HistoryScreen and back to the StartScreen', () => {
    cy.viewport('iphone-8')
    cy.visit('/')
    cy.get('h1').contains('teal')
    cy.get('button[name="loginButton"]').contains("Let's get started").click()
    cy.get('svg[name="GTD"]').should('exist')
    cy.get('button[name="longButton"]').click()
    cy.get('button[name="startButton"]').click()
    cy.wait(1000)
    cy.get('span[name="displayTimer"]').contains('49:59')
    cy.wait(3000)
    cy.get('span[name="displayTimer"]').contains('49:56')
    cy.get('span[name="displayTimerEnd"]').should('exist')
    cy.get('section[name="activeConfig"]').contains('50:00')
    cy.get('button[name="stopButton"]').click()
    cy.get('button[name="historyButton"]').click()
    cy.get('h1').contains('Productive history')
    cy.get('svg[name="returnButton"]').click()
    cy.get('h1').contains('Let’s get things done')
    cy.get('svg[name="GTD"]').should('exist')
  })

  it('should use the 25 minutes timer by default, stop after two seconds, navigate to the HistoryScreen and back to the StartScreen', () => {
    cy.viewport('iphone-8')
    cy.visit('/')
    cy.get('h1').contains('teal')
    cy.get('button[name="loginButton"]').contains("Let's get started").click()
    cy.get('svg[name="GTD"]').should('exist')
    cy.get('button[name="startButton"]').click()
    cy.wait(1000)
    cy.get('span[name="displayTimer"]').contains('24:59')
    cy.wait(1000)
    cy.get('span[name="displayTimer"]').contains('24:58')
    cy.get('span[name="displayTimerEnd"]').should('exist')
    cy.get('section[name="activeConfig"]').contains('25:00')
    cy.get('button[name="stopButton"]').click()
    cy.get('button[name="historyButton"]').click()
    cy.get('h1').contains('Productive history')
    cy.get('svg[name="returnButton"]').click()
    cy.get('h1').contains('Let’s get things done')
    cy.get('svg[name="GTD"]').should('exist')
  })
})