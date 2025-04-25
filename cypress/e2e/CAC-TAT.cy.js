describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('Verificar Título da Aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('Preenche Campos do Formulario', () => {    
    const longText = Cypress._.repeat('abdcefghijklmnopqrstuvwxyz', 10)
    cy.get('#firstName').type('abc')
    cy.get('#lastName').type('silva')
    cy.get('#email').type('luan.yinyang@gmail.com')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })
  it('Exibe erro ao preencher email com formatação inválida', () => {
    cy.get('#email').type('luan.gmail.com')
    cy.get('button[type=submit').click()
    cy.get('.error').should('be.visible')
  })
  it('Exibe mensagem de verificação de campo telefone', () => {
      cy.get('#phone').type('abc')
      cy.get('#phone').should('have.value', '')
  })
  it('Exibe erro quando o telefone é obrigatório mas não é preenchido', () => {
    cy.get('#firstName').type('Luan')
    cy.get('#lastName').type('Ynnae')
    cy.get('#email').type('luan.yinyang@gmail.com')
    cy.get('#open-text-area').type('Ótimo curso meus parabéns')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  it('Preenche e limpa campos', () => {
    cy.get('#firstName').type('Luan').clear().should('have.value', '')
    cy.get('#lastName').type('Ynnae').clear().should('have.value', '')
    cy.get('#email').type('luan.yinyang@gmail.com').clear().should('have.value', '')
    cy.get('#phone').type('34998382145').clear().should('have.value', '')
    cy.get('#open-text-area').type('Ótimo curso meus parabéns').clear().should('have.value', '')
  })
  it('Exibe erro durante tentativa de envio de formulário com campos vazios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible') 
  })

  it('Seleciona YouTube como produto', () => {
    cy.get('#firstName').type('Luan')
    cy.get('#lastName').type('Ynnae')
    cy.get('#email').type('luan.yinyang@gmail.com')
    cy.get('#phone').type('34998382145')
    cy.get('#open-text-area').type('Ótimo curso meus parabéns')
    cy.get('#product').select('youtube')
    cy.get('#product').should('have.value', 'youtube')
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    cy.get('#phone-checkbox').click()
  
//    cy.contains('button', 'Enviar').click()
//    cy.get('.success').should('be.visible')
  })  

  it('brincando com arrays', () => {
cy.get('input[type="radio"]')
.each(typeOfService => {
  cy.wrap(typeOfService).check().should('be.checked')


  })
  })

  it('selecionar vários checkboxes e descelecionar depois',  () =>  {
    cy.get('input[type="checkbox"]').check().should('be.checked')
    .last().uncheck().should('not.be.checked')
  })

  it.only('fazer um upload de um arquivo', () => {
    cy.get('#firstName').type('Luan')
    cy.get('#lastName').type('Ynnae')
    cy.get('#email').type('luan.yinyang@gmail.com')
    cy.get('#open-text-area').type('Ótimo curso meus parabéns')
    cy.get('#phone').type('34998382145')
    cy.get('#phone-checkbox').check()
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')

      })

   // cy.get('button[type="submit"]').click()
    
 
  })

})





  // PARA COMANDOS
  // it('Envio de formulário através de comandos customizados', () => {
  //  const data = {
  //     firstName: 'Luan',
  //     lastName: 'Ynnae',
  //     email: 'luan.yinyang@gmail.com',
  //     phone: '34998382145',
  //     text: 'Teste'
  //     
  //  }
  //  cy.fillMandatoryFieldsAndSubmit(data)