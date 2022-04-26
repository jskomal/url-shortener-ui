describe('Extension Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urls'
    }).intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 422,
      body: {
        message: 'Missing Params in request'
      }
    })
  })

  it('should stop the user from submitting an incomplete form', () => {
    cy.visit('http://localhost:3000/')
      .get('input[name="title"]')
      .type('Pizza')
      .should('have.value', 'Pizza')
      .get('#formSubmit')
      .click()
      .get('#statusMsg')
      .contains('You may not submit without values for both the title and the URL')
  })

  it('should display an error message if there is a non OK response', () => {
    cy.get('input[name="title"]')
      .type('Pizza')
      .get('input[name="urlToShorten"]')
      .type('www.pizza.example.com')
      .get('#formSubmit')
      .click()
      .get('h2')
      .contains('Unprocessable Entity')
  })

  it('should be able to delete an entity', () => {
    cy.visit('http://localhost:3000/')
      .get('button[id=2]')
      .click()
      .get('button[id=2]')
      .should('not.exist')
  })
})
