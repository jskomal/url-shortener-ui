describe('Url shortener tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urls'
    }).intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        id: 4,
        long_url: 'www.pizza.example.com',
        short_url: 'http://localhost:3001/useshorturl/4',
        title: 'Pizza'
      }
    })
  })
  it('should load the page and display the stubbed URLs', () => {
    cy.visit('http://localhost:3000/')
      .get('#2')
      .contains('Youtube')
      .get('#3')
      .contains('Pocket')
  })

  it('should render the form with the proper inputs', () => {
    cy.get('input[name="title"]')
      .invoke('attr', 'placeholder')
      .should('contain', 'Title...')
      .get('input[name="urlToShorten"]')
      .invoke('attr', 'placeholder')
      .should('contain', 'URL to Shorten...')
  })

  it('should be able to type in the forms', () => {
    cy.get('input[name="title"]')
      .type('Pizza')
      .should('have.value', 'Pizza')
      .get('input[name="urlToShorten"]')
      .type('www.pizza.example.com')
      .should('have.value', 'www.pizza.example.com')
  })

  it('should be able to submit the POST request and have the DOM be updated', () => {
    cy.get('#formSubmit').click().get('#4').contains('Pizza')
  })
})
