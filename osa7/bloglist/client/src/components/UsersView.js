import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UsersView = () => {

	const users = useSelector(state => state.users)

	return (
		<>
			<h2>Users</h2>
			<br/>
			<Table hover size="sm">
				<tbody>
					<tr>
						<td>
							<b>User</b>
						</td>
						<td>
							<b>Blogs created</b>
						</td>
					</tr>
					{users.map(user =>
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</td>
							<td >
								{user.blogs.length}
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</>
	)}



export default UsersView
