import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import "./index.css";

function Grocery() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const add = () => {
    if (input.trim() !== "") {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const delet = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const edit = (index, newValue) => {
    const newTodos = [...todos];
    newTodos[index] = newValue;
    setTodos(newTodos);
  };

  return (
    <div className="todo-app">
      <h1>Grocery</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a new item..."
        />
        <button onClick={add}>
          <SiAddthis />
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            delet={delet}
            edit={edit}
          />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ index, todo, delet, edit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo);

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = () => {
    edit(index, editValue);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={handleEditChange}
            autoFocus
          />
          <button onClick={handleEditSubmit}>Save</button>
        </>
      ) : (
        <>
          <span>{todo}</span>
          <div className="button-container">
            <button onClick={() => setIsEditing(true)}>{<GrEdit />}</button>
            <button onClick={() => delet(index)}>
              <MdDelete />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default Grocery;
