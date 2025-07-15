import  { Toaster } from "react-hot-toast";
import './App.css';
import { useEffect } from "react";
import { useNotes } from "./context/NotesContext";
import Dashboard from './pages/Dashboard';
import Navbar from "./components/Navbar";

function App() {
  const { fetchNotes } = useNotes();

  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div className="h-screen flex flex-col">
      <Toaster position="top-right"/>
      <Navbar/>
      <Dashboard className="flex flex-1"/>
    </div>
  );
}

export default App;
