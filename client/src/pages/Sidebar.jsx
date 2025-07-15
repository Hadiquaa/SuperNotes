// src/components/Sidebar.jsx
import { useNotes } from "../context/NotesContext";

const Sidebar = () => {
  const { notes, setSelectedNote, addNote, deleteNote } = useNotes();

  
  return (
    <div className="p-4 space-y-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={addNote}
      >
        + Add Note
      </button>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex items-center justify-between p-2 bg-white shadow rounded group hover:bg-gray-100"
          >
            <div
              onClick={() => setSelectedNote(note)}
              className="cursor-pointer flex-1 truncate"
            >
              {note.title || "Untitled"}
            </div>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-500 hover:text-red-700 px-2 opacity-0 group-hover:opacity-100 transition"
              title="Delete note"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
