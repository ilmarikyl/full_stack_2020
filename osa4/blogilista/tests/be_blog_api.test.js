const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')


const LinkAllBlogsToRootUSer = async () => {

	const user = await helper.returnRootFromDb()
	const blogs = await helper.blogsInDb()
	user.blogs = blogs.map(blog => blog._id)

	user.save()
	await Blog.updateMany({}, { $set: { user: user._id } })
}


beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)

	await LinkAllBlogsToRootUSer()
})


test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('a specific blog is within the returned blogs', async () => {
	const response = await api.get('/api/blogs')
	const titles = response.body.map(r => r.title)

	expect(titles).toContain(
		'React patterns'
	)
})


test('a valid blog can be added ', async () => {
	const newBlog = {
		title: 'Testiblogi',
		author: 'Testi Henkilö',
		url: 'https://testiblogi.fi',
		likes: 10000
	}

	const user = await helper.returnRootFromDb()
	const token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET)

	await api
		.post('/api/blogs')
		.send(newBlog)
		.set('Authorization', `bearer ${token}`)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	const titles = blogsAtEnd.map(n => n.title)
	expect(titles).toContain(
		'Testiblogi'
	)
})


test('like amount is 0 when not added', async () => {
	const newBlog = {
		title: 'Testiblogi2',
		author: 'Testi Henkilö 2',
		url: 'https://testiblogi2.fi'
	}

	const user = await helper.returnRootFromDb()
	const token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET)

	await api
		.post('/api/blogs')
		.send(newBlog)
		.set('Authorization', `bearer ${token}`)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	expect(blogsAtEnd[6].likes).toEqual(0)

	const titles = blogsAtEnd.map(n => n.title)
	expect(titles).toContain(
		'Testiblogi2'
	)

})


test('blog id variable is called id, not _id', async () => {
	const response = await api.get('/api/blogs')
	const bodies = response.body.map(r => r)

	bodies.forEach(body => {
		expect(body.id).toBeDefined()
	})
})


test('blog without title is not added', async () => {
	const newBlog = {
		important: true
	}

	const user = await helper.returnRootFromDb()
	const token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET)

	await api
		.post('/api/blogs')
		.send(newBlog)
		.set('Authorization', `bearer ${token}`)
		.expect(400)

	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})


test('a blog can be deleted', async () => {
	const blogsAtStart = await helper.blogsInDb()

	const blogToDelete = blogsAtStart[0]
	const user = await helper.returnRootFromDb()
	const token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET)

	await api
		.delete(`/api/blogs/${blogToDelete.id}`)
		.set('Authorization', `bearer ${token}`)
		.expect(204)

	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd).toHaveLength(
		helper.initialBlogs.length - 1
	)

	const titles = blogsAtEnd.map(r => r.title)

	expect(titles).not.toContain(blogToDelete.title)
})


test('a blog can be updated', async () => {
	const newBlog = {
		likes: 12345,
	}

	const blogsAtStart = await helper.blogsInDb()
	const blogToUpdate = blogsAtStart[0]

	await api
		.put(`/api/blogs/${blogToUpdate.id}`)
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	expect(blogsAtEnd[0].likes).toEqual(12345)
})


test('returns 401 if request contains no token', async () => {
	const newBlog = {
		title: 'Testiblogi 3',
		author: 'Testi Henkilö 3',
		url: 'https://testiblogi3.fi',
		likes: 10000
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(401)

	const blogs = await helper.blogsInDb()
	expect(helper.initialBlogs.length).toBe(blogs.length)
})



afterAll(() => {
	mongoose.connection.close()
})