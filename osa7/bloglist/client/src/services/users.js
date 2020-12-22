import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const authorizationHeader = () => {
	return {
		headers: { Authorization: token }
	}
}

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const getOne = async id => {
	const response = await axios.get(`${baseUrl}/${id}`)
	return response.data
}

const create = async newObject => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = async body => {
	const response = await axios.put(`${baseUrl}/${body.id}`, body)
	return response.data
}

const remove = async user => {
	const response = await axios.delete(`${baseUrl}/${user.id}`, authorizationHeader())
	return response.data
}

export default {
	getAll,
	getOne,
	create,
	update,
	setToken,
	remove
}