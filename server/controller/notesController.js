// import {notes} from '../data/notes.js';

import { loadNotes, saveNotes } from "../utils/fileHelper.js";

export const getNotes = (req,res) => {
    const {title, sort} = req.query;
    let notes = loadNotes();
    let result = [...notes];
    if(title)
        result = result.filter(n => n.title.toLowerCase().includes(title.toLowerCase()));
    if(sort){
        if(sort === "newest")
            result.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        else if(sort === "oldest")
            result.sort((a,b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    }
    res.json(result);
}

export const getNotesById = (req,res) => {
   const id = parseInt(req.params.id);
   const notes = loadNotes();
   const note = notes.find((n) => n.id === id);
   if(!note)
    return res.status(404).json({message: "NotFound"});
   res.json(note);
}

export const addNote = (req,res) => {
    const notes = loadNotes();
    let nextId = notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1;
    if (!req.body.title || !req.body.content) 
        return res.status(400).json({message: "Title and content are reaquired"});
    const timestamp = new Date().toISOString();
    const newNote = {id:nextId , title : req.body.title, content : req.body.content, createdAt : timestamp, updatedAt : timestamp};
    notes.push(newNote);
    saveNotes(notes);
    res.status(201).json(newNote);
}

export const updateNote = (req,res) => {
    const id = parseInt(req.params.id);
    const notes = loadNotes();
    const index = notes.findIndex(n => n.id === id);
    if(index === -1)
        return res.status(404).json({message : "NotFound"});
    notes[index] = {...notes[index], ...req.body, updatedAt : new Date().toISOString()};
    saveNotes(notes);
    res.status(201).json(notes[index]);
}

export const deleteNote = (req,res) => {
    const id = parseInt(req.params.id);
    const notes = loadNotes();
    const index = notes.findIndex(n => n.id === id )
    if(index === -1)
        return res.status(404).json({message: "NotFound"});
    const deleted = notes.splice(index,1)[0];
    saveNotes(notes)
    res.status(200).json({message : "Deleted", deleted});
}