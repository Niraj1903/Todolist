import { useMemo, useState } from "react";
import { FaClipboard } from "react-icons/fa"; // Importing React Icon (FaClipboard)

const Todo = () => {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);

  const handleAddTodo = () => {
    if (!input.trim()) return;
    const item = {
      id: Date.now(),
      completed: false,
      text: input,
    };
    setTodo((prev) => [...prev, item]);
    setInput("");
  };

  const handleTodoOnEnter = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleDelete = (id) => {
    setTodo(todo.filter((d) => d.id !== id));
  };

  const handleToggle = (id) => {
    setTodo(
      todo.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            completed: !t.completed,
          };
        } else {
          return t;
        }
      })
    );
  };

  const pending = useMemo(() => todo.filter((p) => !p.completed), [todo]);
  const completed = useMemo(() => todo.filter((c) => c.completed), [todo]);
  const all = useMemo(() => todo, [todo]);

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg shadow-xl">
        <div className="flex items-center mb-6 space-x-3">
          <FaClipboard className="w-8 h-8 text-indigo-600" />{" "}
          {/* React Icon here */}
          <h2 className="text-3xl font-semibold text-gray-800">Todo List</h2>
        </div>

        <div className="flex mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter Todo"
              value={input}
              onKeyDown={handleTodoOnEnter}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-3 pl-6 pr-14 border-2 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
            <button
              onClick={handleAddTodo}
              className="absolute right-0 top-0 bottom-0 px-6 py-3 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none transition duration-300 ease-in-out"
            >
              Add
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <ul className="max-h-72 overflow-y-auto">
            {todo.map((i) => (
              <li
                key={i.id}
                className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-100 rounded-lg transition duration-300"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    onChange={() => handleToggle(i.id)}
                    checked={i.completed}
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span
                    className={`${
                      i.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    } text-lg`}
                  >
                    {i.text}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(i.id)}
                  className="ml-4 text-red-500 hover:text-red-600 transition duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Pending Tasks */}
            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-white shadow-lg">
              <h6 className="font-semibold text-xl mb-3 text-indigo-700">
                PENDING
              </h6>
              <ul className="space-y-2">
                {pending.map((p) => (
                  <li key={p.id} className="text-gray-800">
                    {p.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Completed Tasks */}
            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-white shadow-lg">
              <h6 className="font-semibold text-xl mb-3 text-gray-500">
                COMPLETED
              </h6>
              <ul className="space-y-2">
                {completed.map((c) => (
                  <li key={c.id} className="text-gray-500 line-through">
                    {c.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* All Tasks */}
            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-white shadow-lg">
              <h6 className="font-semibold text-xl mb-3 text-indigo-700">
                ALL TASKS
              </h6>
              <ul className="space-y-2">
                {all.map((a) => (
                  <li key={a.id} className="text-gray-800 list-item">
                    {a.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
