const request = require('supertest');
const app = require('../index');
const { v4: uuidv4 } = require('uuid');

let fixture;

beforeEach(() => {
  fixture = [
    {
      id: uuidv4(),
      title: "A",
      description: "test A",
      dueDate: "2025-06-20",
      status: "active",
      priority: 2,
      assignedUser: "john"
    },
    {
      id: uuidv4(),
      title: "B",
      description: "test B",
      dueDate: "2025-06-22",
      status: "completed",
      priority: 4,
      assignedUser: "jane"
    }
  ];
  app.__setTasks__(fixture);
});

// @alps-route:GET /
test('GET / returns HAL _links', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
  expect(res.body._links).toBeDefined(); // @link-check
});

// @alps-route:GET /tasks
test('GET /tasks returns all tasks', async () => {
  const res = await request(app).get('/tasks');
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(2);
  expect(res.body[0]).toHaveProperty('_links'); // @link-check
});

// @alps-route:GET /tasks/:id
test('GET /tasks/:id returns correct task', async () => {
  const res = await request(app).get(`/tasks/${fixture[0].id}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.id).toBe(fixture[0].id);
  expect(res.body).toHaveProperty('_links'); // @link-check
});

// @alps-route:GET /tasks/:id
// @error-case
test('GET /tasks/:id with unknown id returns 404', async () => {
  const res = await request(app).get('/tasks/unknown');
  expect(res.statusCode).toBe(404);
});

// @alps-route:POST /tasks
test('POST /tasks adds a new task', async () => {
  const newTask = {
    id: uuidv4(),
    title: "New",
    description: "New task",
    dueDate: "2025-07-01",
    status: "active",
    priority: 1,
    assignedUser: "someone"
  };
  const res = await request(app).post('/tasks').send({ task: newTask });
  expect(res.statusCode).toBe(201);
  expect(res.body.title).toBe("New");
  expect(res.body).toHaveProperty('_links'); // @link-check
});

// @alps-route:POST /tasks
// @error-case
test('POST /tasks with missing fields returns 400', async () => {
  const res = await request(app).post('/tasks').send({ task: { title: "Missing ID" } });
  expect(res.statusCode).toBe(400);
});

// @alps-route:POST /tasks/:id/edit
test('POST /tasks/:id/edit updates fields', async () => {
  const update = { title: "Updated Title", description: "Updated Desc" };
  const res = await request(app).post(`/tasks/${fixture[0].id}/edit`).send({ task: update });
  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe("Updated Title");
});

// @alps-route:PUT /tasks/:id/status
test('PUT /tasks/:id/status updates status', async () => {
  const res = await request(app).put(`/tasks/${fixture[0].id}/status`).send({ task: { status: "completed" } });
  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("completed");
});

// @alps-route:PUT /tasks/:id/status
// @error-case
test('PUT /tasks/:id/status with missing field returns 400', async () => {
  const res = await request(app).put(`/tasks/${fixture[0].id}/status`).send({ task: {} });
  expect(res.statusCode).toBe(400);
});

// @alps-route:PUT /tasks/:id/due-date
test('PUT /tasks/:id/due-date updates dueDate', async () => {
  const res = await request(app).put(`/tasks/${fixture[0].id}/due-date`).send({ task: { dueDate: "2025-07-10" } });
  expect(res.statusCode).toBe(200);
  expect(res.body.dueDate).toBe("2025-07-10");
});

// @alps-route:PUT /tasks/:id/assign
test('PUT /tasks/:id/assign updates assignedUser', async () => {
  const res = await request(app).put(`/tasks/${fixture[0].id}/assign`).send({ task: { assignedUser: "newuser" } });
  expect(res.statusCode).toBe(200);
  expect(res.body.assignedUser).toBe("newuser");
});