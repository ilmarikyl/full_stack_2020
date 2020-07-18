const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })

	response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	const token = request.token
	const decodedToken = jwt.verify(token, process.env.SECRET)

	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'Token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

	if (!body.title || !body.url) {
		return response.status(400).json({ error: 'Title or url missing' })
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id
	})

	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()
	response.status(201).json(savedBlog)

})


blogsRouter.delete('/:id', async (request, response) => {
	const userid = jwt.verify(request.token, process.env.SECRET).id
	const blog = await Blog.findById(request.params.id)

	if ( blog.user.toString() === userid.toString() ) {
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	}

})


blogsRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blog = {
		likes: body.likes,
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(updatedBlog.toJSON())
})


module.exports = blogsRouter