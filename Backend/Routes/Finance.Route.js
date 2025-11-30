import express from 'express'
import authmiddleware from '../middlewares/Auth.middleware.js'
import { pinnedFinance, DeleteFinance, EditFinance, getSingleFinance, getFinance, PostFinance } from '../Controllers/Finance.controller.js'

const router =express.Router()

router.get("/",authmiddleware,getFinance)
router.post('/',authmiddleware,PostFinance)
router.put("/:id",authmiddleware,EditFinance)
router.delete("/:id",authmiddleware,DeleteFinance)
router.patch('/:id',authmiddleware,pinnedFinance)
router.get('/:id',authmiddleware,getSingleFinance)
export default router