import { useState, useEffect } from "react";
import NoteInput from "../components/NoteInput";
import NoteItem from "../components/NoteItem";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch all notes
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // add note
  const addNote = async (title, content, category) => {
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, category }),
      });
      if (!res.ok) throw new Error("Failed to add note");
      const newNote = await res.json();
      setNotes((prev) => [newNote, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // delete note
  const delNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete note");
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // update note (inline)
  const updateNote = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update note");
      const updated = await res.json();
      setNotes((prev) => prev.map((n) => (n._id === id ? updated : n)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 space-y-4 text-white w-3/4 m-auto">
      <h1 className="text-2xl font-semibold">Your Notes</h1>
      <NoteInput onAdd={addNote} />

      {loading && <p className="text-gray-400 text-sm">Loading...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {notes.map((n) => (
          <NoteItem key={n._id} note={n} delNote={delNote} updateNote={updateNote} />
        ))}
      </div>
    </div>
  );
}

export default Notes;
