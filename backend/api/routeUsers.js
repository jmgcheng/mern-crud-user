import express from "express"
import controllerUsers from "./controllerUsers.js"

const router = express.Router()

router.route("/")
		.post(controllerUsers.apiPostUser)
		.get(controllerUsers.apiGetUsers)
		.put(controllerUsers.apiUpdateUser)
		.delete(controllerUsers.apiDeleteUser)

router.route("/id/:id").get(controllerUsers.apiGetUserById)

export default router