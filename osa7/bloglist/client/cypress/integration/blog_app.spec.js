describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			name: 'Test Man',
			username: 'test',
			password: 'test'
		}

		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('Blogs')
		cy.contains('Login')
		cy.get('#username-field')
		cy.get('#password-field')
	})

	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username-field').type('test')
			cy.get('#password-field').type('test')
			cy.get('#login-button').click()

			cy.contains('Logged in as Test Man')
		})

		it('fails with wrong credentials', function() {
			cy.get('#username-field').type('test')
			cy.get('#password-field').type('wrong')
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'Invalid username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')

			cy.get('html').should('not.contain', 'Logged in as Test Man')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'test', password: 'test' })
		})

		it('blog can be created', function() {
			cy.contains('Add new blog').click()
			cy.get('#title').type('Blogin otsikko')
			cy.get('#author').type('Blogin kirjoittaja')
			cy.get('#url').type('Blogin URL')
			cy.get('#submit-button').click()

			cy.contains('Blog \'Blogin otsikko\' added successfully!')
			cy.contains('Blogin kirjoittaja')
			cy.contains('Blogin otsikko')
		})

		it('blog can be liked', function() {
			cy.createBlog({ title: 'Blogin otsikko', author: 'Blogin kirjoittaja', url: 'Blogin urli' })
			cy.createBlog({ title: 'Blogin otsikko2', author: 'Blogin kirjoittaja2', url: 'Blogin urli2' })

			cy.get('.view-button:first').click()
			cy.get('.like-button:first').click()
			cy.get('.like-button:first').click()
			cy.contains('likes: 2')
		})

		it('blog can be deleted', function() {
			cy.createBlog({ title: 'Blogin otsikko', author: 'Blogin kirjoittaja', url: 'Blogin urli' })
			cy.get('.view-button').click()
			cy.contains('Delete').click()
			cy.contains('Deleted blog \'Blogin otsikko\'')
			cy.get('.blog-entry').should('not.exist')
		})

		it('blogs are arranged by likes', function() {

			const blog1 = { title: '2. eniten tykkäyksiä', author: 'Blogin kirjoittaja', url: 'Blogin urli', likes: 10 }
			const blog2 = { title: '1. eniten tykkäyksiä', author: 'Blogin kirjoittaja2', url: 'Blogin urli2', likes: 100 }
			const blog3 = { title: '3. eniten tykkäyksiä', author: 'Blogin kirjoittaja3', url: 'Blogin urli3', likes: 1 }

			cy.createBlog(blog1)
			cy.createBlog(blog2)
			cy.createBlog(blog3)

			cy.get('.view-button').then( buttons => {
				for (let i = 0; i < buttons.length; i++) {
					cy.wrap(buttons[i]).click()
				}
			})

			cy.get('.blogEntry').then( blogs => {
				cy.wrap(blogs[0]).contains('likes: 100')
				cy.wrap(blogs[1]).contains('likes: 10')
				cy.wrap(blogs[2]).contains('likes: 1')
			})

		})
	})
})