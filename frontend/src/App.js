import {React, useState }  from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import ComponentUserAdd from "./components/componentUserAdd";
import ComponentUserEdit from "./components/componentUserEdit";
import ComponentUsersList from "./components/componentUsersList";
import ComponentUserDeleted from "./components/componentUserDeleted";

function App() {
	const [user, setUser] = useState(null);

	return (
	    <>
			<header>
				<div class="container">
					<div class="row">
						<div class="col">
							<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
								<div class="container-fluid">
									<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
										<span class="navbar-toggler-icon"></span>
									</button>
									<div class="collapse navbar-collapse" id="navbarNavDropdown">
										<ul class="navbar-nav">
											<li class="nav-item">
												<Link className="nav-link" to={"/users"}>List Users</Link>
											</li>
											<li class="nav-item">
												<Link className="nav-link" to={"/user-add"}>Add User</Link>
											</li>
										</ul>
									</div>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</header>	    

			<main>
				<Switch>
					<Route exact path={["/", "/users"]} component={ComponentUsersList} />

					<Route path="/user-add"
						render={(props) => (
							<ComponentUserAdd {...props} user={user} />
						)}
					/>

					<Route path="/user-edit/:id"
						render={(props) => (
							<ComponentUserEdit {...props} user={user} />
						)}
					/>

					<Route path="/user-deleted"
						render={(props) => (
							<ComponentUserDeleted {...props} user={user} />
						)}
					/>
				</Switch>
			</main>

			<footer>
			</footer>
	    </>
	);
}

export default App;
