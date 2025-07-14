// server/routes/notesRoutes.js
import express from "express";
import { addNote, deleteNote, getNotes, getNotesById, updateNote } from "../controller/notesController.js"; 

const router = express.Router();

router.get("/", getNotes);
router.get('/:id', getNotesById);
router.post('/',addNote); 
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
