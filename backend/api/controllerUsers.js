import daoUsers from "../dao/daoUsers.js"

export default class UsersController {
	static async apiGetUsers(req, res, next) {
		const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
		const page = req.query.page ? parseInt(req.query.page, 10) : 0

		let filters = {}
		/*if(req.query.cuisine) {
			filters.cuisine = req.query.cuisine
		}
		else if(req.query.zipcode) {
			filters.zipcode = req.query.zipcode
		}
		else if(req.query.name) {
			filters.name = req.query.name
		}*/

		const { usersList, totalNumUsers } = await daoUsers.getUsers({
			filters,
			page,
			usersPerPage
		})

		let response = {
			users: usersList,
			page: page,
			filters: filters,
			entries_per_page: usersPerPage,
			total_results: totalNumUsers
		}

		res.json(response)
	}

	static async apiGetUserById(req, res, next) {
		try {
			let id = req.params.id || {}
			let user = await daoUsers.getUserByID(id)
			if (!user) {
				res.status(404).json({ error: "Not found" })
				return
			}
			res.json(user)
		} 
		catch (e) {
			console.log(`api, ${e}`)
			res.status(500).json({ error: e })
		}
	}

	static async apiPostUser(req, res, next) {
		try {
			const userInfo = {
				first_name: req.body.first_name,
				last_name: req.body.last_name
			}

			const UserResponse = await daoUsers.addUser(userInfo)

			res.json({status: "success"})
		}
		catch(e) {
			res.status(500).json({error: e.message})
		}
	}	

	static async apiUpdateUser(req, res, next) {
		try {
			//const userId = req.body.user_id
			const userId = req.body._id
			const first_name = req.body.first_name
			const last_name = req.body.last_name

			const userResponse = await daoUsers.updateUser(userId, first_name, last_name)

			var { error } = userResponse
			if(error) {
				res.status(400).json({ error })
			}

			if(userResponse.modifiedCount === 0) {
				throw new Error("unable to update user")
			}

			res.json({ status: "success" })
		}
		catch(e) {
			res.status(500).json({ error: e.message })
		}
	}


	static async apiDeleteUser(req, res, next) {
		try {
			const userId = req.body._id
			const userResponse = await daoUsers.deleteUser(userId)
			res.json({ status: "success" })
		}
		catch(e) {
			res.status(500).json({ error: e.message })
		}
	}

	/*static async apiGetRestaurantCuisines(req, res, next) {
		try {
			let cuisines = await daoUsers.getCuisines()
			res.json(cuisines)
		} 
		catch (e) {
			console.log(`api, ${e}`)
			res.status(500).json({ error: e })
		}
	}*/


}