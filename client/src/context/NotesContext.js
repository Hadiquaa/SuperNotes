import {createContext, useContext, useState} from 'react';

const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

const BASE_URL = process.env.REACT_APP_BACKEND_URL ||"http://localhost:8005/api/notes";

export const NotesProvider = ({children}) => {
    const [notes,setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    const fetchNotes = async () => {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        setNotes(data);
    }


    const updateNote =async (id, updatedNote) => {
       try {
         const res = await fetch(`${BASE_URL}/${id}`, {
           method: "PUT",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(updatedNote),
         });

         if (!res.ok) throw new Error("Failed to update");
         setNotes((prev) =>
           prev.map((note) => (note.id === id ? updatedNote : note))
         );
       } catch (error) {
        console.log(error);
       }
    }
    const addNote = async () => {
        const newNote = {
          title: "Untitled Note",
          content: "Start writing...",
        };

        try {
            const res = await fetch(`${BASE_URL}`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(newNote)
            });
            if(!res.ok)
                throw new Error("Failed to add new note");
           const added = await res.json();
           setNotes((prev) => [...prev,added]);
           setSelectedNote(added);
            return added;
        } catch (error) {
            console.log(error)
        }
    }

    const deleteNote = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this note?");
        if(!confirm)
            return;
        try {
            const res = await fetch(`${BASE_URL}/${id}`, {
                method:"DELETE"
            })
            if(!res.ok)
                throw new Error("Failed to delete");
            setNotes((prev) => prev.filter((note) => note.id !== id));
            setSelectedNote((prev) => (prev.id === id ? null : prev));
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <NotesContext.Provider value={{notes,setNotes, selectedNote,setSelectedNote, fetchNotes, updateNote, addNote, deleteNote}}>
            {children}
        </NotesContext.Provider>
    )
}