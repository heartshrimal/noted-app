import { useState } from "react";

function NoteInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title, content, category);
    setTitle("");
    setContent("");
    setCategory("General");
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 items-start">
      <div className="border rounded-xl flex flex-col w-full gap-0">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="p-2 pb-0 rounded-xl w-full font-bold outline-0 text-xl"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          className="p-2 pl-2.5 pt-0 rounded-xl w-full outline-0"
        />
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded-xl md:w-1/4"
      >
        <option>General</option>
        <option>Personal</option>
        <option>Work</option>
        <option>Ideas</option>
      </select>
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  );
}

export default NoteInput;
