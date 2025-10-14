import { useState } from "react";
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
      id: todoList.length + 1,
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#3b2667] to-[#bc78ec] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            To-Do List{" "}
            <span role="img" aria-label="notepad">
              📝
            </span>
          </h2>

          <div className="flex mb-4 overflow-hidden rounded-full bg-gray-100">
            <input
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none"
              type="text"
              placeholder="Add your task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 font-semibold transition duration-200"
              onClick={addTodoItem}
            >
              Add
            </button>
          </div>

          <ul className="space-y-2">
            {todoList.map((t) => (
              <li key={t.id}>
                <div className="flex items-center bg-gray-100 rounded-lg p-2">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleCheckbox(t.id)}
                    className="mr-3 w-5 h-5"
                  />
                  <span
                    className={`flex-1 text-gray-800 ${
                      t.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {t.item}
                  </span>
                  <button
                    onClick={() => handleDeleteTodo(t.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 font-semibold transition duration-200 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
