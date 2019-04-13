// @ts-check
/* eslint-env mocha */
describe('post API', () => {

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
    
      it('deletes an item', () => {
        const id = Cypress._('1')
        cy.request('DELETE', `/posts/${id}`)
        getItems()
          .should('have.length', 100)
      })
    
  })
  