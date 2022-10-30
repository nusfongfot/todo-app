import { useEffect, useState } from "react";
import "./App.css";
import { TiEdit } from "react-icons/ti";
<i class="fa-solid fa-pen-to-square"></i>;

function App() {
  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem("todos");

    if (saveTodos) {
      return JSON.parse(saveTodos); //convert js(data) to Object
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }
    setTodo("");
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(removeItem);
  }

  //get ค่า เวลา edit input แล้ว set กลับไปใหม่
  function hadleEditItem(e) {
    setCurrentTodo({
      ...currentTodo,
      text: e.target.value,
    });
    console.log("current Todo", currentTodo);
  }

  function handleEditClick(todo) {
    setEditing(true);
    setCurrentTodo({ ...todo });
  }

  //update
  function hadleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setEditing(false);
    setTodos(updatedItem);
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();
    hadleUpdateTodo(currentTodo.id, currentTodo);
  }

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Edit Todo</h2>
          <label htmlFor="editTodo">Edit Todo:</label>
          <input
            type="text"
            placeholder="Edit Todo"
            name="editTodo"
            value={currentTodo.text}
            onChange={hadleEditItem}
          />
          <button type="submit" className="btn-update">
            Update
          </button>
          <button onClick={() => setEditing(false)} className="btn-delete">
            Cancel
          </button>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="todo"
            onChange={handleInputChange}
            value={todo}
            placeholder="Add a new Todo"
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      )}
      <ul className="todo-list">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.text}{" "}
              <div className="group-btn">
                <button
                  onClick={() => handleDeleteClick(todo.id)}
                  className="btn-delete"
                >
                  X
                </button>
                <button
                  onClick={() => handleEditClick(todo)}
                  className="btn-edit"
                >
                  <TiEdit />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
