import React, { useState, useEffect } from "react";
import ServiceUser from "../services/servicesUser";
import { Link } from "react-router-dom";

const ComponentUsersList = props => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		retrieveUsers();
	}, []);

	const retrieveUsers = () => {
		ServiceUser.getAll()
			.then(response => {
			console.log(response.data);
			setUsers(response.data.users);
		})
		.catch(e => {
			console.log(e);
		});
	};

	return (
		<div class="container">
			<div class="row">
				<div class="col">
					<h2>List Users</h2>

					<table class="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">First</th>
								<th scope="col">Last</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => {
								return (
									<tr key={user._id}>
										<th>{user._id}</th>
										<td>{user.first_name}</td>
										<td>{user.last_name}</td>
										<td>
											<Link to={"/user-edit/" + user._id} type="button" className="btn btn-primary btn-sm">
												Edit
											</Link>
										</td>
									</tr>
								);
							})}
						</tbody>						
					</table>
				</div>
			</div>
		</div>
	);
};
export default ComponentUsersList;