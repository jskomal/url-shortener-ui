describe('Url shortener tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: '200',
      fixture: 'urls'
    })
  })
  it('should load the page', () => {
    cy.visit('http://localhost:3000/')
  })
})
