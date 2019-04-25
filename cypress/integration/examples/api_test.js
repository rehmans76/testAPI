// @ts-check
/* eslint-env mocha */
describe('test SONPlaceholder API', () => {
    const getItems = () =>
      cy.request('/posts')
        .its('body')

    const add = item =>
      cy.request('POST', '/posts', item)
  
    it('returns JSON', () => {
      cy.request('/posts')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')
    })
  
    it('loads 100 items', () => {
      getItems()
        .should('have.length', 100)
    })

    it('adds an item', () => {
        const upostId = Cypress._('1')
        const item = {id:upostId, task:'life'}
    
        add(item)
        cy.request(`/posts/${upostId}`)
          .its('body')
      })

    it('updates a resource an item', () => {
        const upostId = Cypress._('1')
        const item = {id:upostId, title:'foo' ,body:'bar',userId: '1'}
    
        add(item)
        cy.request(`/posts/${upostId}`)
          .its('body')
      })
    
    it('deletes an item and fetch same item should get 404', () => {
        const id = Cypress._('1')
        cy.request('DELETE', `/posts/${id}`)
        cy.request('GET', `/posts/${id}`)
      })

    it('Route COMMENT returns right response', () => {
        const id = Cypress._('2')
        cy.request('GET', '/posts/1/comments')
      }) 

    it('PATCH crequest returns right response ', () => {
        const id = Cypress._('1')
        cy.request('PATCH', `/posts/${id}`)
      }) 

    it('PUT crequest returns right response ', () => {
        const id = Cypress._('1')
        cy.request('PUT', `/posts/${id}`)
      }) 

    it('Get COMMENT ID returns right response', () => {
        cy.request('GET', '/comments?postId=1')
      }) 

    it('Get userID returns right response', () => {
        cy.request('GET', '/posts?userId=1')
      }) 

    it('Get Photos within album route returns right response', () => {
        cy.request('GET', '/albums/1/photos')
      }) 

    it('Get users album route returns right response', () => {
        cy.request('GET', '/users/1/albums')
      }) 

    it('Get users todo route returns right response', () => {
        cy.request('GET', '/users/1/todos')
      })

    it('Get users posts route returns right response', () => {
        cy.request('GET', '/users/1/posts')
      })

    it('adds random  item pain', () => {
        const randomId = Cypress._.random(0, 100)
        const item = {id:randomId, task:'pain'}
    
        add(item)
        cy.request(`/posts/${randomId}`)
          .its('body')
    })
      
    
  })
  