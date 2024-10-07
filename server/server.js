import express from "express";
const app = express();
import cors from "cors";
const PORT = 5000;

app.use(cors());

app.use(express.json());

let tasks = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Build a Todo App", completed: true },
  { id: 3, text: "Study API Integration", completed: false },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    text: req.body.text,
    completed: req.body.completed || false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    task.text = text !== undefined ? text : task.text;
    task.completed = completed !== undefined ? completed : task.completed;
    res.json(task);
  } else {
    res.status(404).send("Task not found");
  }
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
