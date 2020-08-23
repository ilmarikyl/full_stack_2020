import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


const blog = {
	title: 'Blogin otsikko',
	author: 'Blogin kirjoittaja',
	url: 'Blogin URL',
	likes: 3,
	user: {
		name: 'Lisääjän koko nimi',
		username: 'Lisääjän käyttäjänimi'
	}
}

const currentUser = {
	name: 'John'
}

test('renders only title and author if view button is not pressed', () => {

	const component = render(
		<Blog blog={blog} />
	)

	expect(component.container).toHaveTextContent(blog.title)
	expect(component.container).toHaveTextContent(blog.author)
	expect(component.container).not.toHaveTextContent(blog.url)
	expect(component.container).not.toHaveTextContent(blog.likes)
})


test('renders also likes and URL when view button is clicked', async () => {

	const component = render(
		<Blog blog={blog} currentUser={currentUser} />
	)

	const button = component.getByText('view')
	fireEvent.click(button)

	expect(component.container).toHaveTextContent(blog.title)
	expect(component.container).toHaveTextContent(blog.author)
	expect(component.container).toHaveTextContent(blog.url)
	expect(component.container).toHaveTextContent(blog.likes)
})


test('clicking the like button calls event handler twice', async () => {


	const mockHandler = jest.fn()

	const component = render(
		<Blog blog={blog} currentUser={currentUser} onLike={mockHandler} />
	)

	const viewButton = component.getByText('view')
	fireEvent.click(viewButton)
	const likeButton = component.getByText('like')
	fireEvent.click(likeButton)
	fireEvent.click(likeButton)

	expect(mockHandler.mock.calls).toHaveLength(2)
})