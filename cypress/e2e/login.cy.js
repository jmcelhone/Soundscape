describe('login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    Cypress.Cookies.debug(true)
    cy.clearCookies()
  })
  it('shows sign in on load', () => {
     cy.get('.App div').first().should('have.class', 'landing-page')
      cy.get('h2').should('have.text', 'Sign In')
    })

  it('toggles to signup', () => {
    cy.get('.link-button').click()
    cy.get('h2').should('have.text', 'Sign Up')

    cy.get('.link-button').click()
    cy.get('h2').should('have.text', 'Sign In')

  })

  it('render home page when signed in', () => {
    cy.intercept('POST', '**/auth/v1/token*').as('loginRequest')

    cy.get('input[placeholder="Enter email"]').type('test@email.mail')
    cy.get('input[placeholder="Enter password"]').type('pass10')
    cy.get('button[type="submit"]').click().then

    cy.wait('@loginRequest').then((interception) => {
    expect(interception.response?.statusCode).to.equal(200)
  })

    cy.getCookies().should('have.length', 1)
    cy.get('.App div').contains('Create a Music Moment').should('be.visible');
  })

  it('does not render home with incorrect credentials', () => {
    cy.intercept('POST', '**/auth/v1/token*').as('loginRequest')

    cy.get('input[placeholder="Enter email"]').type('test@email.mail')
    cy.get('input[placeholder="Enter password"]').type('pass101')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest').then((interception) => {
    expect(interception.response?.statusCode).to.equal(400)
  })
    cy.get('.App div').contains('Invalid email or password. Please try again.').should('be.visible');

    cy.getCookies().should('have.length', 0)
  })

  it('creates new account with sign up', () => {
    cy.get('.link-button').click()
    cy.intercept('POST', '**/auth/v1/signup*', {
    statusCode: 200,
    body: {
      user: {
        id: 'mock-user-id-123',
        email: 'test@example.com'
      },
      session: null
    }
  }).as('signupRequest')

    cy.get('input[placeholder="Enter email"]').type('test123@example.com')
    cy.get('input[placeholder="Enter username"]').type('test')
    cy.get('input[placeholder="Enter password"]').type('pass101')
    cy.get('button[type="submit"]').click()

    cy.wait('@signupRequest')

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Sign up successful! Please check your email to verify your account.')
    })
    cy.get('h2').should('have.text', 'Sign In')

  })


  
})
