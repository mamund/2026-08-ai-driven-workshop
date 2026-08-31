// test/api.test.js

const request = require('supertest');
const app = require('../index');
const { v4: uuidv4 } = require('uuid');

// @setup: initial test data
const initialPersons = [
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

let personsModule;

beforeEach(() => {
  // Reset the in-memory array by directly patching the app.locals
  personsModule = require.cache[require.resolve('../index')];
  if (personsModule && personsModule.exports && personsModule.exports.__setPersons__) {
    personsModule.exports.__setPersons__([...initialPersons]);
  }
});

describe('Person Service API Tests', () => {
  let createdPersonId;

  // @alps-route:GET /
  test('GET / should return home _links', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body._links).toHaveProperty('list');
    expect(res.body._links).toHaveProperty('filter');
    expect(res.body._links).toHaveProperty('create');
  });

  // @alps-route:GET /persons
  test('GET /persons returns all persons with _links', async () => {
    const res = await request(app).get('/persons');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach(p => {
      expect(p).toHaveProperty('_links');
      expect(p._links).toHaveProperty('self');
      expect(p._links.self).toHaveProperty('href');
      expect(p._links.self).toHaveProperty('method');
    });
  });

  // @alps-route:POST /persons
  test('POST /persons creates a person with _links', async () => {
    const newPerson = {
      id: uuidv4(),
      email: 'test@example.com',
      status: 'active',
      givenName: 'Testy',
      familyName: 'McTest',
      telephone: '555-0000'
    };
    const res = await request(app).post('/persons').send({ person: newPerson });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body._links).toBeDefined();
    createdPersonId = res.body.id;
  });

  // @alps-route:GET /persons/:id
  test('GET /persons/:id returns a single person with _links', async () => {
    const resAll = await request(app).get('/persons');
    const person = resAll.body[0];
    const res = await request(app).get(`/persons/${person.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', person.id);
    expect(res.body._links).toHaveProperty('self');
  });

  // @alps-route:PUT /persons/:id/edit
  test('PUT /persons/:id/edit updates a person field', async () => {
    const resAll = await request(app).get('/persons');
    const person = resAll.body[0];
    const res = await request(app)
      .put(`/persons/${person.id}/edit`)
      .send({ person: { telephone: '999-1234' } });
    expect(res.statusCode).toBe(200);
    expect(res.body.telephone).toBe('999-1234');
  });

  // @alps-route:PUT /persons/:id/status
  test('PUT /persons/:id/status updates status', async () => {
    const resAll = await request(app).get('/persons');
    const person = resAll.body[0];
    const res = await request(app)
      .put(`/persons/${person.id}/status`)
      .send({ person: { status: 'inactive' } });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('inactive');
  });

  // @alps-route:GET /persons/filter
  test('GET /persons/filter returns filtered results with _links', async () => {
    const res = await request(app).get('/persons/filter?status=inactive');
    expect(res.statusCode).toBe(200);
    res.body.forEach(p => {
      expect(p.status.toLowerCase()).toBe('inactive');
      expect(p._links).toHaveProperty('self');
    });
  });

  // @alps-route:DELETE /persons/:id
  test('DELETE /persons/:id deletes a person', async () => {
    const resAll = await request(app).get('/persons');
    const person = resAll.body[0];
    const res = await request(app).delete(`/persons/${person.id}`);
    expect(res.statusCode).toBe(204);
  });
});
