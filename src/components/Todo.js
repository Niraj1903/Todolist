import { useMemo, useState } from "react";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);

  const handleAddTodo = () => {
    const item = {
      id: Date.now(),
      completed: false,
      text: input,
    };
    setTodo((prev) => [...prev, item]);
    setInput("");
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
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter Todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleAddTodo}
            className="p-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </div>

        <div className="space-y-4">
          <ul className="max-h-72 overflow-y-auto">
            {todo.map((i) => (
              <li
                key={i.id}
                className="flex items-center justify-between p-2 border-b border-gray-300"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleToggle(i.id)}
                    checked={i.completed}
                    className="mr-3 h-4 w-4"
                  />
                  <span
                    className={i.completed ? "line-through text-gray-500" : ""}
                  >
                    {i.text}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(i.id)}
                  className="ml-4 text-red-500 hover:text-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {/* Pending Tasks */}
            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-2">
              <h6 className="font-semibold text-lg mb-2">PENDING</h6>
              <ul className="space-y-1">
                {pending.map((p) => (
                  <li key={p.id} className="text-gray-700">
                    {p.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Completed Tasks */}
            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-2">
              <h6 className="font-semibold text-lg mb-2">COMPLETED</h6>
              <ul className="space-y-1">
                {completed.map((c) => (
                  <li key={c.id} className="text-gray-500 line-through">
                    {c.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* All Tasks */}
            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-2">
              <h6 className="font-semibold text-lg mb-2">ALL TASK</h6>
              <ul className="space-y-1">
                {all.map((a) => (
                  <li key={a.id} className="text-gray-700">
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
