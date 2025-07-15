import { useNotes } from "../context/NotesContext";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const NoteContent = () => {
  const { selectedNote, updateNote, setNotes } = useNotes();
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    if (selectedNote) {
      setFormData({
        title: selectedNote.title,
        content: selectedNote.content,
      });
    }
  }, [selectedNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedNote.id ? { ...note, [name]: value } : note
      )
    );
  };

  const handleSave = async () => {
    
    try {
      await updateNote(selectedNote.id, formData);
      toast.success("Note saved!");
    } catch (err) {
      toast.error("Failed to save note.");
    }
  };

  if (!selectedNote)
    return (
      <div className="text-gray-500 p-4">
        Select a note to view its content.
      </div>
    );

  return (
    <div className="p-6 w-full space-y-4 text-left">
      <p className="text-sm text-gray-400">
        Last updated: {new Date(selectedNote.updatedAt).toLocaleString()}
      </p>
      <input
        type="text"
        name="title"
        placeholder="Enter a title..."
        value={formData.title}
        onChange={handleChange}
        className="w-full text-2xl font-bold border-b border-gray-300 focus:outline-none py-1"
      />
      <textarea
        name="content"
        placeholder="Start writing your note here..."
        value={formData.content}
        onChange={handleChange}
        className="w-full h-64 border border-gray-300 p-3 rounded resize-none focus:outline-none"
      ></textarea>
      <button
        onClick={handleSave}
        className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700`}
      >
        Save
      </button>
    </div>
  );
};

export default NoteContent;
