import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


test('<Blogform /> calls the event handler with right props when creating a blog', () => {
	const createBlog = jest.fn()

	const component = render(
		<BlogForm onBlogSubmit={createBlog} />
	)

	const form = component.container.querySelector('form')
	const author = component.container.querySelector('#author')
	const title = component.container.querySelector('#title')
	const url = component.container.querySelector('#url')

	fireEvent.change(author, {
		target: { value: 'Herra Kirjoittaja' }
	})

	fireEvent.change(title, {
		target: { value: 'Otsikko' }
	})

	fireEvent.change(url, {
		target: { value: 'URLI' }
	})

	fireEvent.submit(form)

	expect(createBlog.mock.calls[0][0].title).toBe('Otsikko')
	expect(createBlog.mock.calls[0][0].author).toBe('Herra Kirjoittaja' )
	expect(createBlog.mock.calls[0][0].url).toBe('URLI' )
})