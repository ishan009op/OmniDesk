import express from 'express'
import authmiddleware from '../middlewares/Auth.middleware.js'
import { pinnedNotes, DeleteNotes, EditNotes, getNotes, PostNotes, getSingleNote } from '../Controllers/Notes.Controller.js'

const router=express.Router()

router.get('/',authmiddleware,getNotes)
router.post('/',authmiddleware,PostNotes)
router.put('/:id',authmiddleware,EditNotes)
router.patch('/:id',authmiddleware,pinnedNotes)
router.delete('/:id',authmiddleware,DeleteNotes)
router.get('/:id',authmiddleware,getSingleNote)


export default router