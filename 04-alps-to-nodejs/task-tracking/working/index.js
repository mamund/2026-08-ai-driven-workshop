const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// --- Routes ---

app.get('/gohome', (req, res) => {
  const result = {
    operation: 'goHome',
    received: req.query,
    _links: {}
  };
  res.json(result);
});

app.get('/gotasklist', (req, res) => {
  const result = {
    operation: 'goTaskList',
    received: req.query,
    _links: {}
  };
  res.json(result);
});

app.get('/gofilteredtasks', (req, res) => {
  const result = {
    operation: 'goFilteredTasks',
    received: req.query,
    _links: {}
  };
  res.json(result);
});

app.get('/gotaskitem/:id', (req, res) => {
  const result = {
    operation: 'goTaskItem',
    received: req.query,
    _links: {}
  };
  res.json(result);
});

app.post('/docreatetask/:id', (req, res) => {
  const required = ["id", "title", "status"];
  const missing = required.filter(f => !(f in req.body));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  const result = {
    operation: 'doCreateTask',
    received: req.body,
    _links: {}
  };
  res.json(result);
});

app.post('/doedittask/:id', (req, res) => {
  const required = ["id", "title", "status"];
  const missing = required.filter(f => !(f in req.body));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  const result = {
    operation: 'doEditTask',
    received: req.body,
    _links: {}
  };
  res.json(result);
});

app.put('/doupdatestatus/:id', (req, res) => {
  const required = ["id", "status"];
  const missing = required.filter(f => !(f in req.body));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  const result = {
    operation: 'doUpdateStatus',
    received: req.body,
    _links: {}
  };
  res.json(result);
});

app.put('/dosetduedate/:id', (req, res) => {
  const required = ["id", "dueDate"];
  const missing = required.filter(f => !(f in req.body));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  const result = {
    operation: 'doSetDueDate',
    received: req.body,
    _links: {}
  };
  res.json(result);
});

app.put('/doassignuser/:id', (req, res) => {
  const required = ["id", "assignedUser"];
  const missing = required.filter(f => !(f in req.body));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  const result = {
    operation: 'doAssignUser',
    received: req.body,
    _links: {}
  };
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});
