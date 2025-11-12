import TaskItem from "../components/TaskItem";

const TaskList = ({tasks, toggleTask, deleteTask}) => {
  return (
    <ul>
        {tasks.map((t) => (
          <li key={t._id || t.id} className="flex justify-between mb-2">
            <TaskItem
              t={t}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          </li>
        ))}
    </ul>
  )
}

export default TaskList