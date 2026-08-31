const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// --- Auto-generated mock routes from ALPS ---

app.get('/home', (req, res) => {
  const required = [];
  const input = req.query;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json({
    transition: 'goHome',
    method: 'GET',
    received: input,
    message: 'This is a mock response for goHome.'
  });
});

app.get('/tasklist', (req, res) => {
  const required = [];
  const input = req.query;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json({
    transition: 'goTaskList',
    method: 'GET',
    received: input,
    message: 'This is a mock response for goTaskList.'
  });
});

app.get('/filteredtasks', (req, res) => {
  const required = [];
  const input = req.query;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json({
    transition: 'goFilteredTasks',
    method: 'GET',
    received: input,
    message: 'This is a mock response for goFilteredTasks.'
  });
});

app.get('/taskitem/:id', (req, res) => {
  const required = ["id"];
  const input = req.query;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json({
    transition: 'goTaskItem',
    method: 'GET',
    received: input,
    message: 'This is a mock response for goTaskItem.'
  });
});

app.post('/createtask', (req, res) => {
  const required = ["id", "title", "status"];
  const input = req.body;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json({
    transition: 'doCreateTask',
    method: 'POST',
    received: input,
    message: 'This is a mock response for doCreateTask.'
  });
});

app.post('/edittask', (req, res) => {
  const required = ["id", "title", "status"];
  const input = req.body;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json({
    transition: 'doEditTask',
    method: 'POST',
    received: input,
    message: 'This is a mock response for doEditTask.'
  });
});

app.put('/updatestatus/:id', (req, res) => {
  const required = ["id", "status"];
  const input = req.body;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json({
    transition: 'doUpdateStatus',
    method: 'PUT',
    received: input,
    message: 'This is a mock response for doUpdateStatus.'
  });
});

app.put('/setduedate/:id', (req, res) => {
  const required = ["id", "dueDate"];
  const input = req.body;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json({
    transition: 'doSetDueDate',
    method: 'PUT',
    received: input,
    message: 'This is a mock response for doSetDueDate.'
  });
});

app.put('/assignuser/:id', (req, res) => {
  const required = ["id", "assignedUser"];
  const input = req.body;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json({
    transition: 'doAssignUser',
    method: 'PUT',
    received: input,
    message: 'This is a mock response for doAssignUser.'
  });
});


app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});
