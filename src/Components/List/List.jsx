import React from "react";

const List = ({ todos, changeStatus, deleteTodo }) => {
  return (
    <div className="listTask">
      {todos.map((todo) => (
        <div className="itemTask" key={todo.id}>
          <div className="nameTask">
            <input
              type="checkbox"
              className="task"
              checked={todo.completed}
              onChange={() => changeStatus(todo.id)}
            />
            <label className={todo.completed ? "completed" : ""}>
              {todo.text}
            </label>
          </div>
          <button className="btnDelete" onClick={() => deleteTodo(todo.id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
