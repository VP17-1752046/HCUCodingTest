import React, { useState, useEffect } from "react";
import "./App.css";
import Add from "./Components/Add/Add.jsx";
import List from "./Components/List/List.jsx";
import ChangeStatus from "./Components/ChangeStatus/ChangeStatus.jsx";
import axios from "axios";

function App() {
  const allStatus = {
    All: () => true,
    Incomplete: (todo) => !todo.completed,
    Completed: (todo) => todo.completed,
  };

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTodo = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => {
        setTodos([...todos, response.data]);
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const changeStatus = (id) => {
    const todo = todos.find((task) => task.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    axios
      .put(`http://localhost:5000/tasks/${id}`, updatedTodo)
      .then((response) => {
        setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
      })
      .catch((error) => console.error("Error updating task status:", error));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const deleteAllTodos = () => {
    Promise.all(
      todos.map((todo) =>
        axios.delete(`http://localhost:5000/tasks/${todo.id}`)
      )
    )
      .then(() => {
        setTodos([]);
      })
      .catch((error) => console.error("Error deleting all tasks:", error));
  };

  return (
    <div className="App">
      <h1>#todo</h1>
      <ChangeStatus filter={filter} setFilter={setFilter} />
      <Add addTodo={addTodo} />
      <List
        todos={todos.filter(allStatus[filter])}
        changeStatus={changeStatus}
        deleteTodo={deleteTodo}
      />
      <button className="deleteAll" onClick={deleteAllTodos}>
        Delete All
      </button>
    </div>
  );
}

export default App;
