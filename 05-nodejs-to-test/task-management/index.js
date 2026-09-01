
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

// In-memory store
let tasks = [
  {
    id: uuidv4(),
    title: "Write documentation",
    description: "Create API docs from ALPS",
    dueDate: "2025-06-01",
    status: "active",
    priority: "3",
    assignedUser: "Alice"
  },
  {
    id: uuidv4(),
    title: "Fix bug #321",
    description: "Investigate and resolve UI bug",
    dueDate: "2025-06-10",
    status: "completed",
    priority: "2",
    assignedUser: "Bob"
  }
];
if (process.env.NODE_ENV === "test") {
  app.__setPersons__ = (fn) => {
    tasks = fn();
  };
}


// Helper: generate _links
function generateLinks(task) {
  const id = task.id;
  return {
    self: { href: `/tasks/${id}`, method: "GET", args: [] },
    update: { href: `/tasks/${id}/edit`, method: "POST", args: ["title", "description", "dueDate", "status", "priority", "assignedUser"] },
    setDueDate: { href: `/tasks/${id}/dueDate`, method: "PUT", args: ["dueDate"] },
    updateStatus: { href: `/tasks/${id}/status`, method: "PUT", args: ["status"] },
    assignUser: { href: `/tasks/${id}/assign`, method: "PUT", args: ["assignedUser"] }
  };
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    _links: {
      tasks: { href: "/tasks", method: "GET", args: [] },
      create: { href: "/tasks", method: "POST", args: ["id", "title", "description", "dueDate", "status", "priority", "assignedUser"] }
    }
  });
});

// GET all tasks or filter
app.get('/tasks', (req, res) => {
  const filters = req.query;
  let filtered = tasks.filter(task =>
    Object.entries(filters).every(([key, value]) =>
      (task[key] || "").toLowerCase() === value.toLowerCase()
    )
  );
  res.json(filtered.map(task => ({ ...task, _links: generateLinks(task) })));
});

// GET single task
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json({ ...task, _links: generateLinks(task) });
});

// POST create new task
app.post('/tasks', (req, res) => {
  const input = req.body.task;
  const required = ["id", "title", "status"];
  const missing = required.filter(field => !input?.[field]);
  if (missing.length) return res.status(400).json({ error: "Missing fields", fields: missing });
  const newTask = { ...input };
  tasks.push(newTask);
  res.status(201).json({ ...newTask, _links: generateLinks(newTask) });
});

// POST edit task
app.post('/tasks/:id/edit', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index < 0) return res.status(404).json({ error: "Task not found" });
  const input = req.body.task;
  const required = ["id", "title", "status"];
  const missing = required.filter(field => !input?.[field]);
  if (missing.length) return res.status(400).json({ error: "Missing fields", fields: missing });
  tasks[index] = { ...tasks[index], ...input };
  res.json({ ...tasks[index], _links: generateLinks(tasks[index]) });
});

// PUT update status
app.put('/tasks/:id/status', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  const { status } = req.body.task || {};
  if (!status) return res.status(400).json({ error: "Missing status" });
  task.status = status;
  res.json({ ...task, _links: generateLinks(task) });
});

// PUT set due date
app.put('/tasks/:id/dueDate', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  const { dueDate } = req.body.task || {};
  if (!dueDate) return res.status(400).json({ error: "Missing dueDate" });
  task.dueDate = dueDate;
  res.json({ ...task, _links: generateLinks(task) });
});

// PUT assign user
app.put('/tasks/:id/assign', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  const { assignedUser } = req.body.task || {};
  if (!assignedUser) return res.status(400).json({ error: "Missing assignedUser" });
  task.assignedUser = assignedUser;
  res.json({ ...task, _links: generateLinks(task) });
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Task API running on port ${PORT}`);
  });
}

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Task API running on port ${PORT}`);
  });
} else {
  app.__setPersons__ = (data) => { persons = data; };
  module.exports = app;
}

/* Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Task API running on port ${PORT}`);
});
*/
