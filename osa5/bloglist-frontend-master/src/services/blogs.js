import axios from 'axios'
const baseUrl = '/api/blogs'

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

const remove = async blog => {
	const response = await axios.delete(`${baseUrl}/${blog.id}`, authorizationHeader())
	return response.data
}

export default { getAll, create, update, setToken, remove }