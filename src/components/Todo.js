import { useState } from "react";

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
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={handleAddTodo}>Add</button>
      </div>

      <div>
        <ul>
          {todo.map((i) => (
            <li key={i.id}>
              <input
                type="checkbox"
                onChange={() => handleToggle(i.id)}
                checked={i.completed}
              />
              <span>{i.text}</span>
              <button onClick={() => handleDelete(i.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
