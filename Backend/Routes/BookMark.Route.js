import express from 'express'
import authmiddleware from '../middlewares/Auth.middleware.js'
import { getBookMark,PostBookMark,EditBookMark,pinnedBookMark,DeleteBookMark,getSingleBookMark } from '../Controllers/BookMark.Controller.js'

const router=express.Router()


router.get('/',authmiddleware,getBookMark)
router.post('/',authmiddleware,PostBookMark)
router.put('/:id',authmiddleware,EditBookMark)
router.patch('/:id',authmiddleware,pinnedBookMark)
router.delete('/:id',authmiddleware,DeleteBookMark)
router.get('/:id',authmiddleware,getSingleBookMark)


export default router;