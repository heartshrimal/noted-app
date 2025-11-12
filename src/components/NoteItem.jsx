function NoteItem({ note, updateNote, delNote }) {
  return (
    <div
    key={note._id}
    className="border rounded-lg p-4 bg-gray-800 text-white shadow-sm hover:shadow-md transition h-auto flex flex-col justify-between"
  >
    <div className="flex justify-between items-start">
        {/* <span className="overflow-auto"> */}
      <h2
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(e) =>
          updateNote(note._id, { ...note, title: e.target.innerText })
        }
        className="font-semibold text-lg focus:outline-none truncate max-w-[75%] rounded px-1 overflow-clip"
      >
        {note.title}
      </h2>
      {/* </span> */}
      <span className="text-xs bg-gray-700 px-2 py-1 rounded">
        {note.category}
      </span>
    </div>

    <p
      contentEditable
      suppressContentEditableWarning={true}
      onBlur={(e) =>
        updateNote(note._id, { ...note, content: e.target.innerText })
      }
      className="mt-2 text-gray-400 text-sm whitespace-pre-line focus:outline-none rounded px-1"
    >
      {note.content}
    </p>

    <div className="flex justify-end gap-2 mt-3">
      <button
        onClick={() =>
          updateNote(note._id, { ...note, title: note.title, content: note.content })
        }
        className="text-sm px-2 py-1 rounded bg-yellow-500 hover:bg-yellow-600"
      >
        Save
      </button>
      <button
        onClick={() => delNote(note._id)}
        className="text-sm px-2 py-1 rounded bg-red-500 hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  </div>
  );
}

export default NoteItem;
