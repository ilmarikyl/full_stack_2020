const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User
		.find({}).populate('blogs', { title: 1, url: 1, author: 1 })

	response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
	const body = request.body

	if (body.password === undefined) {
		return response.status(400).json({ error: 'Missing password' })
	}
	if (body.password.length < 3) {
		return response.status(400).json({ error: 'Password must be at least 3 characters long' })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.save()
	response.json(savedUser)
})


usersRouter.get('/:id', (request, response) => {
	User.findById(request.params.id)
	  .then(note => {
		if (note) {
		  response.json(note.toJSON())
		} else {
		  response.status(404).end()
		}
	  })
  })


module.exports = usersRouter