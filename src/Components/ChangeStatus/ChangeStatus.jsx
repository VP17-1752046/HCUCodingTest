import React from "react";

const changeStatus = ({ filter, setFilter }) => {
  return (
    <div className="status">
      <a
        className={filter === "All" ? "active" : ""}
        onClick={() => setFilter("All")}
      >
        All
      </a>
      <a
        className={filter === "Incomplete" ? "active" : ""}
        onClick={() => setFilter("Incomplete")}
      >
        Incomplete
      </a>
      <a
        className={filter === "Completed" ? "active" : ""}
        onClick={() => setFilter("Completed")}
      >
        Complete
      </a>
    </div>
  );
};

export default changeStatus;
