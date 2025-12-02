import express from 'express'
import authmiddleware from '../middlewares/Auth.middleware.js'
import { CompleteTask, DeleteTask, EditTask, getSingleTask, getTask, PostTask } from '../Controllers/Task.Controller.js'

const router =express.Router()

router.get("/",getTask)
router.post('/',authmiddleware,PostTask)
router.put("/:id",authmiddleware,EditTask)
router.delete("/:id",authmiddleware,DeleteTask)
router.patch('/:id',authmiddleware,CompleteTask)
router.get('/:id',authmiddleware,getSingleTask)
export default router