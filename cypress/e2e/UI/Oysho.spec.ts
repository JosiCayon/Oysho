import { faker } from '@faker-js/faker'

describe('Test Oysho', () => {
  before(() => {
    cy.request('/') //making sure baseUrl is working and skip all tests if not
  })

  it('Visitar la pagina y verificar titulo', () => {
    cy.visit('oysho.com')
    cy.get('.header__item-container-oysho')
      .should('be.visible')
      .and('have.text', 'Oysho')
  })

  it('Visitar la pagina que se va a probar usando https://www.oysho.com', () => {
    cy.visit('https://www.oysho.com', { failOnStatusCode: false })
    cy.get('h1').should('have.text', 'Access Denied')
  })

  it('Verificar que la navegacion funcione correctamente', () => {
    const expectedLinks = 12
    cy.intercept('/itxrest/2/promotions/**/*').as('promotions')
    cy.visit('oysho.com')
    cy.wait('@promotions')

    cy.get('[data-piece="Slide ultima"]').should('be.visible')
    cy.get(
      '[data-testid="categories-menu-button"] > [data-testid="icon"]',
    ).click({multiple: true})

    cy.get('[data-testid="categories-menu"]')
      .find('[data-testid="toggle-subcategories"]:visible')
      .should('have.length', expectedLinks)
      .each((item, index) => {
        cy.wrap(item)
          .parent()
          .should('have.attr', 'href')
          .then((href) => {
            if (index < expectedLinks - 1) cy.request(`/${href}`)
            else {
              cy.visit(`/${href}`)
              cy.url().should('include', 'oysho-training')
            }
          })
      })
  })

  it('Rellenar un formulario', () => {
    cy.intercept('/itxrest/2/promotions/**/*').as('promotions')
    cy.visit('oysho.com')
    cy.wait('@promotions')

    cy.get('[data-testid="user-button"]').click()
    cy.url().should('include', 'logon')

    const email = faker.internet.exampleEmail()
    cy.get('#email-login').type(email).should('have.value', email)
    cy.get('#password').type(faker.internet.password())
    cy.get('[data-testid="login-button"]').should('not.be.disabled')
  })
})
