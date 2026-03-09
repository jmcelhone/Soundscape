describe('make post spec', () => { 
  beforeEach(() => {
    cy.visit('http://localhost:5173/', {
        onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsArgWith(0, {
          coords: {
            latitude: 43,
            longitude: -125,
          },
        })
      },
    })
    cy.intercept('POST', '**/auth/v1/token*').as('loginRequest')
    cy.get('input[placeholder="Enter email"]').type('test@email.mail')
    cy.get('input[placeholder="Enter password"]').type('pass10')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginRequest')

  })
  it('adds post to map', () => {
      cy.intercept('POST', '/api/posts', {
        statusCode: 201
      }).as('postRequest')
      cy.get('.leaflet-marker-icon').its('length').then((initialCount) => {
      cy.get('.post-button').click()
      cy.get('.form-input').eq(0).type('Last Christmas')
      cy.get('.form-input').eq(1).type('Wham')
      cy.get('.form-input').eq(2).type('integration test song')
      cy.get('.btn-add').click()
      
      cy.wait('@postRequest')
      
      // Marker count increased
      cy.get('.leaflet-marker-icon').should('have.length', initialCount + 1)
  })
    })
})