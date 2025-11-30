import express from 'express'
import { Register,Login } from '../Controllers/Auth.Controller.js'

const router =express.Router()

router.post('/register',Register)
router.post('/login',Login)

export default router