const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(bodyParser.json());

let tasks = [
  {
    id: uuidv4(),
    title: "Write documentation",
    description: "Prepare API and developer documentation",
    dueDate: "2025-06-30",
    status: "active",
    priority: 3,
    assignedUser: "alice"
  },
  {
    id: uuidv4(),
    title: "Fix login bug",
    description: "Resolve error in authentication flow",
    dueDate: "2025-06-20",
    status: "completed",
    priority: 5,
    assignedUser: "bob"
  }
];

function buildLinks(task) {
  return {
    self: {
      href: `/tasks/${task.id}`,
      method: "GET",
      args: []
    },
    edit: {
      href: `/tasks/${task.id}/edit`,
      method: "POST",
      args: ["id", "title", "description", "dueDate", "status", "priority", "assignedUser"]
    },
    status: {
      href: `/tasks/${task.id}/status`,
      method: "PUT",
      args: ["id", "status"]
    },
    dueDate: {
      href: `/tasks/${task.id}/due-date`,
      method: "PUT",
      args: ["id", "dueDate"]
    },
    assign: {
      href: `/tasks/${task.id}/assign`,
      method: "PUT",
      args: ["id", "assignedUser"]
    }
  };
}

app.get("/", (req, res) => {
  res.json({
    _links: {
      tasks: { href: "/tasks", method: "GET" },
      create: { href: "/tasks", method: "POST", args: ["id", "title", "status"] }
    }
  });
});

app.get("/tasks", (req, res) => {
  const filters = req.query;
  let result = tasks.filter(task =>
    Object.entries(filters).every(([k, v]) => {
      const value = task[k];
      return typeof value === "string"
        ? value.toLowerCase().includes(v.toLowerCase())
        : value == v;
    })
  );
  res.json(result.map(task => ({ ...task, _links: buildLinks(task) })));
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json({ ...task, _links: buildLinks(task) });
});

app.post("/tasks", (req, res) => {
  const { task } = req.body;
  if (!task || !task.id || !task.title || !task.status) {
    return res.status(400).json({ error: "Missing required fields: id, title, status" });
  }
  tasks.push(task);
  res.status(201).json({ ...task, _links: buildLinks(task) });
});

app.post("/tasks/:id/edit", (req, res) => {
  const { task } = req.body;
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });
  tasks[idx] = { ...tasks[idx], ...task };
  res.json({ ...tasks[idx], _links: buildLinks(tasks[idx]) });
});

app.put("/tasks/:id/status", (req, res) => {
  const { task } = req.body;
  const t = tasks.find(t => t.id === req.params.id);
  if (!t) return res.status(404).json({ error: "Task not found" });
  if (!task || !task.status) return res.status(400).json({ error: "Missing field: status" });
  t.status = task.status;
  res.json({ ...t, _links: buildLinks(t) });
});

app.put("/tasks/:id/due-date", (req, res) => {
  const { task } = req.body;
  const t = tasks.find(t => t.id === req.params.id);
  if (!t) return res.status(404).json({ error: "Task not found" });
  if (!task || !task.dueDate) return res.status(400).json({ error: "Missing field: dueDate" });
  t.dueDate = task.dueDate;
  res.json({ ...t, _links: buildLinks(t) });
});

app.put("/tasks/:id/assign", (req, res) => {
  const { task } = req.body;
  const t = tasks.find(t => t.id === req.params.id);
  if (!t) return res.status(404).json({ error: "Task not found" });
  if (!task || !task.assignedUser) return res.status(400).json({ error: "Missing field: assignedUser" });
  t.assignedUser = task.assignedUser;
  res.json({ ...t, _links: buildLinks(t) });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Task API server listening at http://localhost:${port}`);
});