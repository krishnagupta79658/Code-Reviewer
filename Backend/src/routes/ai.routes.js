import express from "express"
const Router=express.Router()
import { handleUserInput, } from "../controllers/ai.controllers.js"

Router.post("/get-review",handleUserInput)
export default Router