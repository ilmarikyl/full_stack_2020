import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'


const sortByLikes = (blogs) => (
	blogs.sort((a, b) =>  b.likes - a.likes)
)


export const getBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'GET_BLOGS',
			data: blogs,
		})
	}
}


export const createLike = (blog) => {
	return async dispatch => {
		const changedBlog = { ...blog, likes: blog.likes + 1 }

		try {
			await blogService.update(changedBlog)

			dispatch({
				type: 'EDIT_BLOG',
				data: changedBlog
			})

		} catch (err) {
			dispatch(setNotification('Something went wrong and the like was not saved', 'failure', 5))
		}
	}
}


export const addBlog = (data) => {
	return async (dispatch) => {

		try {
			const newBlog = await blogService.create(data)
			dispatch({
				type: 'NEW_BLOG',
				data: newBlog,
			})

		} catch (err) {
			console.log(err)
			dispatch(setNotification('Something went wrong and the blog was not added', 'failure', 5))

		}
	}
}


export const addComment = (id, comment) => {
	return async (dispatch) => {

		const changedBlog = await blogService.postComment(id, comment)
		dispatch({
			type: 'EDIT_BLOG',
			data: changedBlog,
		})
	}
}


export const deleteBlog = (blog) => {
	return async (dispatch) => {
		await blogService.remove(blog)
		dispatch({
			type: 'DELETE_BLOG',
			data: blog.id,
		})
	}
}


const blogReducer = (state = [], action) => {

	switch(action.type) {

	case 'GET_BLOGS':
		return sortByLikes(action.data)


	case 'NEW_BLOG': {
		return [...state, action.data]
	}

	case 'EDIT_BLOG': {
		const changedBlog = action.data
		const changedBlogs = state.map(blog =>
			blog.id !== changedBlog.id ? blog : changedBlog
		)
		return sortByLikes(changedBlogs)
	}

	case 'DELETE_BLOG': {
		const newBlogs = state.filter(blog => blog.id !== action.data)

		return newBlogs
	}

	default:
		return state
	}
}

export default blogReducer