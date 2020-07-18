const _ = require('lodash')


const dummy = () => {
	return 1
}


const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}


const favouriteBlog = (blogs) => {
	return blogs.length === 0
		? 'Blog list is empty'
		: blogs.reduce((BlogWithMostLikes, currentBlog) => BlogWithMostLikes.likes > currentBlog.likes
			? BlogWithMostLikes
			: currentBlog)
}


const mostBlogs  = (blogs) => {

	if (blogs.length === 0) return 'Blog list is empty'

	const mostCommonElement = (myArray) =>
		myArray.reduce(
			(a, b, i, arr) => (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), null)

	const authorArray = _.map(blogs, 'author')
	const authorMostBlogs = mostCommonElement(authorArray)
	const numOfBlogs = authorArray.filter(x => x === authorMostBlogs).length

	return {
		'author': authorMostBlogs,
		'blogs': numOfBlogs
	}
}


const mostLikes  = (blogs) => {
	return blogs.length === 0
		? 'Blog list is empty'
		: blogs
			.reduce(({ sums, most }, { likes, author }) => {
				sums[author] = likes = (sums[author] || 0) + likes
				if (likes > most.likes)  {
					most = { author, likes }
				}
				return { sums, most }
			}, { sums: {}, most: { likes: 0 } })
			.most
}

module.exports = {
	dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}