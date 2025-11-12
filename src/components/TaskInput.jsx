const TaskInput = ({ addTask, input, setInput, category, setCategory, categories }) => {
  return (
    <form onSubmit={addTask} className="flex gap-4 mb-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New task..."
        className="border p-2 pl-4 rounded-xl w-full"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded-xl pl-1">
        <option>General</option>
        <option>Personal</option>
        <option>Work</option>
        <option>Urgent</option>
        {categories.map((c) => (
          <option key={c._id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <button className="bg-blue-500 text-white px-4 rounded-xl cursor-pointer hover:bg-blue-800">
        Add
      </button>
    </form>
  );
};

export default TaskInput;
