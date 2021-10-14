import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let users

export default class UsersDAO {
	static async injectDB(conn) {
		if(users) {
			return
		}
		try {
			users = await conn.db(process.env.RESTREVIEWS_NS).collection("users")
		}
		catch(e) {
			console.error(`Unable to establish a collection handle in usersDAO: ${e}`)
		}
	}

	static async getUsers({filters = null, page = 0, usersPerPage = 20} = {}) {
		let query
		if(filters) {
			/*if("name" in filters) {
				query = {$text: {$search: filters["name"]}}
			}
			else if("cuisine" in filters) {
				query = {"cuisine": {$eq: filters["cuisine"]}}
			}
			else if("zipcode" in filters) {
				query = {"address.zipcode": {$eq: filters["zipcode"]}}
			}*/
		}

		let cursor

		try {
			cursor = await users.find(query)
		}
		catch(e) {
			console.error(`Unable to issue find command, ${e}`)
			return {
				usersList: [],
				totalNumUsers: 0
			}
		}

		const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage = page)

		try {
			const usersList = await displayCursor.toArray()
			const totalNumUsers = await users.countDocuments(query)

			return {usersList, totalNumUsers}
		}
		catch(e) {
			console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
			return {
				usersList: [],
				totalNumUsers: 0
			}
		}

	}

	static async getUserByID(id) {
		try {
			const pipeline = [
				{
					$match: {
						_id: new ObjectId(id)
					},
				},
				/*{
					$lookup: {
						from: "reviews",
						let: {
							id: "$_id"
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$eq: ["$restaurant_id", "$$id"]
									},
								},
							},
							{
								$sort: {
									date: -1
								},
							},
						],
						as: "reviews"
					},
				},
				{
					$addFields: {
						reviews: "$reviews"
					}
				},*/
			]
			return await users.aggregate(pipeline).next()
		} 
		catch (e) {
			console.error(`Something went wrong in getUserByID: ${e}`)
			throw e
		}
	}

	static async addUser(user) {
		try {
			const userDoc = {
				first_name: user.first_name,
				last_name: user.last_name
			}
			return await users.insertOne(userDoc)
		}
		catch(e) {
			console.error(`Unable to post user: ${e}`)
			return {error: e}
		}
	}


	static async updateUser(userId, first_name, last_name) {
		try {
			const updateResponse = await users.updateOne(
				{ _id: ObjectId(userId) },
				{ $set: { first_name: first_name, last_name: last_name } }
			)
			return updateResponse
		}
		catch(e) {
			console.error(`Unable to update user: ${e}`)
			return { error: e }
		}
	}

	static async deleteUser(userId) {
		try {
			const deleteResponse = await users.deleteOne({
				_id: ObjectId(userId)
			})
			return deleteResponse
		}
		catch(e) {
			console.error(`Unable to delete user: ${e}`)
			return { error: e }
		}
	}

}