import React, { useState, useEffect } from "react";
import ServiceUser from "../services/servicesUser";
import { Link, Redirect } from "react-router-dom";
import ComponentNotifications from "../components/componentNotifications";

const ComponentUserEdit = props => {
	const initialUserState = {
		_id: null,
		first_name: "",
		last_name: ""
	};
	const [user, setUser] = useState(initialUserState);
	const [notices, setNotices] = useState([]);
	const [redirectHome, setRedirectHome] = useState(false);

	const handleFNameChange = event => {
		setUser(previousState => {
			return { ...previousState, first_name: event.target.value }
		});
	};

	const handleLNameChange = event => {
		setUser(previousState => {
			return { ...previousState, last_name: event.target.value }
		});
	};		

	useEffect(() => {
		getUser(props.match.params.id);
	}, [props.match.params.id]);

	const getUser = id => {
		ServiceUser.get(id)
			.then(response => {
				setUser(response.data);
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	};

	const updateUser = (e) => {
		e.preventDefault();
		ServiceUser.updateUser(user)
			.then(response => {
				console.log(response.data);
				setNotices(["User Updated"]);
			})
			.catch(e => {
				console.log(e);
				setNotices(["User NOT Updated" + e]);
			});
	};

	const deleteReview = (e) => {
		e.preventDefault();
		ServiceUser.deleteUser(props.match.params.id)
			.then(response => {
				//console.log("User Deleted");
				setNotices(["User Deleted"]);

				setRedirectHome(true);

			})
			.catch(e => {
				console.log(e);
			});
	};	

	if(redirectHome) {
		return (
			<Redirect to='/user-deleted' />
		)
	}
	else {
		return (
			<>
			<div class="container">
				<div class="row">
					<div class="col">
						<h2>User - Edit</h2>
						<form id="update-user-form">
							<div class="mb-3">
								<label for="txtFName" class="form-label">First Name</label>
								<input type="text" required="required" class="form-control" id="txtFName" name="txtFName" onChange={handleFNameChange} value={user.first_name} />
							</div>
							<div class="mb-3">
								<label for="txtLName" class="form-label">Last Name</label>
								<input type="text" required="required" class="form-control" id="txtLName" name="txtLName" onChange={handleLNameChange} value={user.last_name} />
							</div>
							<button onClick={updateUser} class="btn btn-primary">Update</button>
						</form>
						<form id="delete-user-form">
							<div class="alert alert-warning" role="alert">
								<p>
									Delete action can't be undone
								</p>
								<button onClick={deleteReview} class="btn btn-danger">Delete</button>
							</div>
						</form>						
					</div>
				</div>
			</div>
			{
				notices.length > 0 && 
					<ComponentNotifications notices={notices} />
			}
			</>
		);
	}
};
export default ComponentUserEdit;