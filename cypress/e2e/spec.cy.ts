/// <reference types="cypress" />

describe('React Data Table E2E spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/photos*').as('getPhotosApi')
    cy.visit('/react-data-table')
  })

  it('user should be able to search a term and table should display rows containing that term', () => {
    const searchTerm = 'omnis'

    // find search box and type the search term
    cy.findByRole('textbox').type(searchTerm)

    // wait for response & check that the table only contains rows with search term data
    cy.wait('@getPhotosApi').then(() => {
      cy.get('td').should('contain.text', searchTerm)
    })
  })

  it('user should be able select all rows and header checkbox should be auto selected when all rows are selected', () => {
    // find and select all checkbox
    cy.get('tbody').findAllByRole('checkbox').check()

    // table header checkbox should be auto selected
    cy.findByTestId('select-all-checkbox').should('be.checked')
  })
})
