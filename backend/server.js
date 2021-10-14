import express from "express"
import cors from "cors"
import routeUsers from "./api/routeUsers.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/users", routeUsers)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app