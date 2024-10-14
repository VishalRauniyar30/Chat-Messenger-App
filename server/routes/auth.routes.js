import { Router } from "express"
import { signIn, signUp } from "../controllers/auth.controllers.js"

const authRoutes = Router()


authRoutes.post('/signup', signUp)

authRoutes.post('/login', signIn)


export default authRoutes