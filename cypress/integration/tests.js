describe('Url shortener tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urls'
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
})
