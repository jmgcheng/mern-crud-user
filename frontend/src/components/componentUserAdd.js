import React, { useState } from "react";
import ServiceUser from "../services/servicesUser";
import { Link } from "react-router-dom";
import ComponentNotifications from "../components/componentNotifications";

const ComponentUserAdd = props => {
	const [txtFName, setTxtFirstName] = useState("");
	const [txtLName, setTxtLastName] = useState("");
	const [notices, setNotices] = useState([]);

	const handleFNameChange = event => {
		setTxtFirstName(event.target.value);
	};

	const handleLNameChange = event => {
		setTxtLastName(event.target.value);
	};	

	const resetForm = () => {
		setTxtFirstName("");
		setTxtLastName("");
		document.getElementById("create-user-form").reset();
	};

	const saveUser = (e) => {
		e.preventDefault();

		var data = {
			first_name: txtFName,
			last_name: txtLName
		};

		ServiceUser.createUser(data)
			.then(response => {
				console.log(response.data);
				setNotices(["User Added"]);
				resetForm();
			})
			.catch(e => {
				console.log(e);
			});		
		
	};

	return (
		<>
		<div class="container">
			<div class="row">
				<div class="col">
					<h2>User - Add</h2>
					<form id="create-user-form">
						<div class="mb-3">
							<label for="txtFName" class="form-label">First Name</label>
							<input type="text" required="required" class="form-control" id="txtFName" name="txtFName" onChange={handleFNameChange} />
						</div>
						<div class="mb-3">
							<label for="txtLName" class="form-label">Last Name</label>
							<input type="text" required="required" class="form-control" id="txtLName" name="txtLName" onChange={handleLNameChange} />
						</div>
						<button onClick={saveUser} class="btn btn-primary">Add</button>
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
};
export default ComponentUserAdd;