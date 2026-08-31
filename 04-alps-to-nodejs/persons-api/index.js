// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let persons = [
  {
    id: uuidv4(),
    givenName: 'Alice',
    familyName: 'Smith',
    telephone: '123-456-7890',
    email: 'alice@example.com',
    status: 'active'
  },
  {
    id: uuidv4(),
    givenName: 'Bob',
    familyName: 'Jones',
    telephone: '987-654-3210',
    email: 'bob@example.com',
    status: 'inactive'
  }
];

function generateLinks(person) {
  return {
    self: { href: `/persons/${person.id}`, method: 'GET' },
    update: { href: `/persons/${person.id}/edit`, method: 'PUT', args: ['id', 'email', 'familyName', 'telephone', 'status'] },
    changeStatus: { href: `/persons/${person.id}/status`, method: 'PUT', args: ['id', 'status'] },
    delete: { href: `/persons/${person.id}`, method: 'DELETE', args: ['id'] },
    goHome: { href: '/', method: 'GET' },
    goList: { href: '/persons', method: 'GET' },
    goFilter: { href: '/persons/filter?email=&familyName=&status=', method: 'GET', args: ['email', 'familyName', 'status'] }
  };
}

app.get('/', (req, res) => {
  res.json({
    _links: {
      list: { href: '/persons', method: 'GET' },
      filter: { href: '/persons/filter?email=&familyName=&status=', method: 'GET', args: ['email', 'familyName', 'status'] },
      create: { href: '/persons', method: 'POST', args: ['id', 'email', 'status', 'givenName', 'familyName', 'telephone'] }
    }
  });
});

app.get('/persons', (req, res) => {
  res.json(persons.map(p => ({ ...p, _links: generateLinks(p) })));
});

app.get('/persons/filter', (req, res) => {
  const filters = req.query;
  const result = persons.filter(p => {
    return Object.entries(filters).every(([key, value]) => {
      if (key === 'status') {
        return p[key].toLowerCase() === value.toLowerCase();
      } else {
        return p[key] && p[key].toLowerCase().includes(value.toLowerCase());
      }
    });
  });
  res.json(result.map(p => ({ ...p, _links: generateLinks(p) })));
});

app.get('/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id);
  if (!person) return res.status(404).json({ error: 'Person not found' });
  res.json({ ...person, _links: generateLinks(person) });
});

app.post('/persons', (req, res) => {
  const { person } = req.body;
  const required = ['id', 'email', 'status'];
  for (const field of required) {
    if (!person[field]) return res.status(400).json({ error: `Missing required field: ${field}` });
  }
  person.status = person.status.toLowerCase();
  if (!['active', 'inactive'].includes(person.status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }
  persons.push(person);
  res.status(201).json({ ...person, _links: generateLinks(person) });
});

app.put('/persons/:id/edit', (req, res) => {
  const { person } = req.body;
  const index = persons.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Person not found' });
  persons[index] = { ...persons[index], ...person };
  res.json({ ...persons[index], _links: generateLinks(persons[index]) });
});

app.put('/persons/:id/status', (req, res) => {
  const { person } = req.body;
  if (!person || !person.status) return res.status(400).json({ error: 'Missing required field: status' });
  const record = persons.find(p => p.id === req.params.id);
  if (!record) return res.status(404).json({ error: 'Person not found' });
  record.status = person.status.toLowerCase();
  if (!['active', 'inactive'].includes(record.status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }
  res.json({ ...record, _links: generateLinks(record) });
});

app.delete('/persons/:id', (req, res) => {
  const index = persons.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Person not found' });
  persons.splice(index, 1);
  res.status(204).end();
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Person Service API running at http://localhost:${port}`);
  });
} else {
  app.__setPersons__ = (data) => { persons = data; };
  module.exports = app;
}

/*
app.listen(port, () => {
  console.log(`Person Service API running at http://localhost:${port}`);
});
*/
