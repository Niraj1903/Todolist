import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [pending, setPending] = useState([]);
  const [all, setAll] = useState([]);
  const [complete, setComplete] = useState([]);

  const addTodoItem = () => {
    if (input.trim() === "") return setInput("");
    const newItem = {
      id: Date.now(),
      item: input.trim(),
      completed: false,
    };
    setTodoList((prev) => [...prev, newItem]);
    setInput("");
  };

  const toggleCheckbox = (id) => {
    setTodoList(
      todoList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        } else {
          return item;
        }
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setPending(todoList.filter((p) => !p.completed));
    setComplete(todoList.filter((c) => c.completed));
    setAll(todoList);
  }, [todoList]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center py-10">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-4xl space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            To-Do List{" "}
            <span role="img" aria-label="notepad">
              📝
            </span>
          </h2>

          <div className="flex mb-6 overflow-hidden rounded-full bg-gray-200 shadow-lg">
            <input
              className="flex-1 px-6 py-3 bg-transparent focus:outline-none rounded-l-full text-gray-800 placeholder-gray-500"
              type="text"
              placeholder="Add your task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-semibold transition duration-200 rounded-r-full"
              onClick={addTodoItem}
            >
              Add
            </button>
          </div>

          <ul className="space-y-4">
            {todoList.map((t) => (
              <li key={t.id}>
                <div className="flex items-center bg-gray-100 rounded-lg p-4 transition-all hover:bg-gray-200">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleCheckbox(t.id)}
                    className="mr-4 w-6 h-6 text-indigo-500 focus:ring-indigo-400"
                  />
                  <span
                    className={`flex-1 text-lg font-medium text-gray-800 transition-all ${
                      t.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {t.item}
                  </span>
                  <button
                    onClick={() => handleDeleteTodo(t.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Task categories displayed side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-4 border border-gray-300 rounded-lg p-4">
              <h6 className="text-lg font-semibold text-gray-700">Pending</h6>
              <ul className="space-y-2">
                {pending.map((p) => (
                  <li key={p.id} className="text-gray-800">
                    {p.item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 border border-gray-300 rounded-lg p-4">
              <h6 className="text-lg font-semibold text-gray-700">All Tasks</h6>
              <ul className="space-y-2">
                {all.map((a) => (
                  <li key={a.id} className="text-gray-800">
                    {a.item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 border border-gray-300 rounded-lg p-4">
              <h6 className="text-lg font-semibold text-gray-700">
                Completed Tasks
              </h6>
              <ul className="space-y-2">
                {complete.map((c) => (
                  <li key={c.id} className="text-gray-500 line-through">
                    {c.item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
