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

blogsRouter.post('/:id/comments', async (request, response) => {
	const body = request.body
	const token = request.token
	const decodedToken = jwt.verify(token, process.env.SECRET)

	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'Token missing or invalid' })
	}

	if (!body.content) {
		return response.status(400).json({ error: 'Content missing' })
	}

	const blog = await Blog.findById(request.params.id)
	blog.comments = blog.comments.concat(body.content);
	const savedBlog = await blog.save();
	
	await savedBlog
        .populate({ path: "user", select: ["name", "username"] }).execPopulate()
		
	response.status(200).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
	const userid = jwt.verify(request.token, process.env.SECRET).id
	const blog = await Blog.findById(request.params.id)

	if ( blog.user.toString() === userid.toString() ) {
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	}

})


blogsRouter.get('/:id', (request, response) => {
	Blog.findById(request.params.id)
	  .then(note => {
		if (note) {
		  response.json(note.toJSON())
		} else {
		  response.status(404).end()
		}
	  })
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