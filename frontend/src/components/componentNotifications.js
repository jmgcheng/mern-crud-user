const ComponentNotifications = props => {

	return (

		<div class="container">
			<div class="row">
				<div class="col">
					{ 
						props.notices.length > 0 &&
							<div class="alert alert-primary" role="alert">
								{
									props.notices.map((notice) => {
										return (
											<li>{notice}</li>
										)
									})
								}
							</div>
					}
				</div>
			</div>
		</div>

	);
};

export default ComponentNotifications;