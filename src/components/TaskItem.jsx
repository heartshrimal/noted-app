
const TaskItem = ({ t, toggleTask, deleteTask }) => {
  return (
    <>
      <div className="task-item p-3 rounded-xl w-full shadow-md flex justify-between">
        <label className="ml-2 flex items-center cursor-pointer">
          <input
            className="w-5 h-5 accent-indigo-700 cursor-pointer"
            type="checkbox"
            checked={t.completed}
            onChange={() => toggleTask(t._id)}
          />
          <span
            className={t.completed ? "line-through ml-2 opacity-50" : "ml-2"}
          >
            {t.title}
          </span>
        </label>
        <span className="flex gap-2 items-center">
        <span className="opacity-50 text-sm" >{t.category} </span>
        <button onClick={() => deleteTask(t._id)} className="bg-red-700 text-gray-300 rounded pl-1 pr-1 hover:bg-red-900 cursor-pointer">
          ✖
        </button>
        </span>
      </div>
    </>
  );
};

export default TaskItem;
