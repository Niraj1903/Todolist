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
              <span className={i.completed ? "line-through" : ""}>
                {i.text}
              </span>
              <button onClick={() => handleDelete(i.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <h6>PENDING</h6>
      <ul>
        {pending.map((p) => (
          <li key={p.id}>{p.text}</li>
        ))}
      </ul>

      <h6>COMPLETED</h6>
      <ul>
        {completed.map((c) => (
          <li key={c.id}>{c.text}</li>
        ))}
      </ul>

      <h6>ALL TASK</h6>
      <ul>
        {all.map((a) => (
          <li key={a.id}>{a.text}</li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
