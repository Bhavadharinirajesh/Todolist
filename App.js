import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingText, setEditingText] = useState("");  // State variables for the list of todos, new todo input, editing index, and editing text
  
  const addTodo = () => {  //  Function to add a new todo to the list
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo(""); // Clear the input field after adding todo
    }
  };

  const toggleCompleted = (index) => {   // Function to the completed status of a todo
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
   
  const removeTodo = (index) => {    // Function to remove a todo from the list
    setTodos(todos.filter((todo, i) => i !== index));
  };

  const startEditing = (index, text) => {      // Function to start editing a todo
    setEditingIndex(index);
    setEditingText(text);
  };

  const stopEditing = () => {     // Function to stop editing a todo
    setEditingIndex(-1);
    setEditingText("");
  };
  
  const editTodo = (index, newText) => {      // Function to edit a todo
    if (editingIndex === index) {   
      setTodos(
        todos.map((todo, i) =>
          i === index ? { ...todo, text: newText } : todo
        )
      );
      stopEditing();     // Function to stop editing a todo
    }
  };

  return (
    <div className="body">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="todo-container">
          <h1 className="my-4">My Bucket List</h1>
          <div className="input-group mb-3 ">
            <input
              type="text"
              className="form-control form-control-md"
              style={{width: "37vw"}}
              placeholder="Add todolist"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button className="btn btn-info " type="button" onClick={addTodo}>
              Add
            </button>
          </div>
          <div className="d-flex justify-content-center">
          <ul className="list-unstyled ">
            {todos.map((todo, index) => (
              <li key={index} className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompleted(index)}
                  />
                  <label className="form-check-label">
                    {editingIndex !== index ? (
                      <span>
                        {todo.text}
                      </span>
                    ) : (
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                    )}
                  </label>
                </div>
                <div>
                  {editingIndex !== index ? (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => startEditing(index, todo.text)}
                    >
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn btn-success btn-sm mx-2"
                        onClick={() => editTodo(index, editingText)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => stopEditing()}
                      >
                        Cancel
                      </button>
                    </>
                  )}
               
                  <button
                    type="button"
                    className="btn btn-danger btn-sm mx-2"
                    onClick={() => removeTodo(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;