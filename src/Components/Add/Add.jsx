import React, { useState } from "react";

const Add = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <div className="addTask">
      <input
        type="text"
        className="inputTask"
        placeholder="Add Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button className="btnAdd" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default Add;
