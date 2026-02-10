const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let id = 1;


// POST method to create a new task
app.post("/tasks", (req, res) => {
  const task = {
    id: id++,
    title: req.body.title,
    username: req.body.username || "Test_User",
  };
  tasks.push(task);
  res.json(task);
});


// GET method to retrieve all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});



// UPDATE method to update a task by id
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.title = req.body.title;
  res.json(task);
});


// DELETE method to delete a task by id
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Task deleted" });
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
