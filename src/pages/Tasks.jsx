import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import TaskInput from "../components/TaskInput";
import FilterSort from "../components/FilterSort";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("General");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [categories, setCategories] = useState([]);
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  useEffect(fetchTasks, []);

  async function addTask(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ input, category }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const newTask = await res.json();
      setTasks((prev) => [newTask, ...prev]);
      setInput("");
      setCategory("General");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function toggleTask(id) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  }

  async function deleteTask(id) {
    const token = localStorage.getItem("token");
    await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }

  let visibleTasks = tasks;

  if (filterCategory !== "All") {
    visibleTasks = visibleTasks.filter((t) => t.category === filterCategory);
  }

  if (sortBy === "a-z") {
    visibleTasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "z-a") {
    visibleTasks.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortBy === "newest") {
    visibleTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <div className="p-4 w-4/6 m-auto">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      <TaskInput
        addTask={addTask}
        input={input}
        setInput={setInput}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />

      {/* <input
        type="text"
        placeholder="New category"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetch("http://localhost:5000/api/categories", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: e.target.value }),
            }).then(() => {
              e.target.value = "";
              fetch("http://localhost:5000/api/categories")
                .then((res) => res.json())
                .then(setCategories);
            });
          }
        }}
      /> */}
      <FilterSort
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        categories={categories}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {loading && <p className="text-gray-400 text-sm mt-2">Loading...</p>}
      {error && <p className="text-red-700 text-sm mt-2">{error}</p>}
      <TaskList
        tasks={visibleTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      {/* Temporary Button */}
      <button
        onClick={logout}
        className="bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded-lg absolute top-2 right-2"
      >
        Logout
      </button>
    </div>
  );
}

export default Tasks;
