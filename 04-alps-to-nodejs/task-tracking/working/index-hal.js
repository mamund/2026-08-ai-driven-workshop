const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

function buildHalResponse(operationId, method, input) {
  return {
    _links: {
      self: {
        href: `/${operationId}`,
        method: method.toUpperCase(),
        args: Object.keys(input)
      }
    },
    transition: operationId,
    method: method.toUpperCase(),
    received: input,
    message: `This is a mock response for ${operationId}.`
  };
}

// --- Auto-generated HAL-style mock routes from ALPS ---

app.get('/home', (req, res) => {
  const required = [];
  const input = req.query;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json(buildHalResponse('goHome', 'get', input));
});

app.get('/tasklist', (req, res) => {
  const required = [];
  const input = req.query;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json(buildHalResponse('goTaskList', 'get', input));
});

app.get('/filteredtasks', (req, res) => {
  const required = [];
  const input = req.query;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json(buildHalResponse('goFilteredTasks', 'get', input));
});

app.get('/taskitem/:id', (req, res) => {
  const required = ["id"];
  const input = req.query;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json(buildHalResponse('goTaskItem', 'get', input));
});

app.post('/createtask', (req, res) => {
  const required = ["id", "title", "status"];
  const input = req.body;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json(buildHalResponse('doCreateTask', 'post', input));
});

app.post('/edittask', (req, res) => {
  const required = ["id", "title", "status"];
  const input = req.body;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json(buildHalResponse('doEditTask', 'post', input));
});

app.put('/updatestatus/:id', (req, res) => {
  const required = ["id", "status"];
  const input = req.body;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json(buildHalResponse('doUpdateStatus', 'put', input));
});

app.put('/setduedate/:id', (req, res) => {
  const required = ["id", "dueDate"];
  const input = req.body;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json(buildHalResponse('doSetDueDate', 'put', input));
});

app.put('/assignuser/:id', (req, res) => {
  const required = ["id", "assignedUser"];
  const input = req.body;
  const missing = required.filter(f => !(f in input));
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }
  res.json(buildHalResponse('doAssignUser', 'put', input));
});


app.listen(PORT, () => {
  console.log(`Mock API with HAL links running at http://localhost:${PORT}`);
});
