
const request = require('supertest');
const app = require('../index');
const { v4: uuidv4 } = require('uuid');

const resetData = () => ([
  {
    id: uuidv4(),
    title: "Task A",
    description: "Test task A",
    dueDate: "2025-06-01",
    status: "active",
    priority: "1",
    assignedUser: "Alice"
  },
  {
    id: uuidv4(),
    title: "Task B",
    description: "Test task B",
    dueDate: "2025-06-10",
    status: "completed",
    priority: "2",
    assignedUser: "Bob"
  }
]);

beforeEach(() => {
  app.__setPersons__(resetData());
});

describe('Task API', () => {

  // @alps-route:GET /
  // @link-check
  test('GET / returns HAL links', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body._links).toBeDefined();
  });

  // @alps-route:GET /tasks
  // @link-check
  test('GET /tasks returns tasks with links', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]._links).toBeDefined();
  });

  // @alps-route:GET /tasks/:id
  // @error-case
  test('GET /tasks/:id returns 404 for invalid id', async () => {
    const res = await request(app).get('/tasks/invalid');
    expect(res.statusCode).toBe(404);
  });

  // @alps-route:POST /tasks
  test('POST /tasks creates task', async () => {
    const newTask = {
      id: uuidv4(),
      title: "New",
      description: "Test",
      dueDate: "2025-06-15",
      status: "active",
      priority: "1",
      assignedUser: "Test"
    };
    const res = await request(app).post('/tasks').send({ task: newTask });
    expect(res.statusCode).toBe(201);
    expect(res.body._links).toBeDefined();
  });

  // @alps-route:POST /tasks/:id/edit
  test('POST /tasks/:id/edit modifies a task', async () => {
    const { body } = await request(app).get('/tasks');
    const task = body[0];
    task.title = "Edited";
    const res = await request(app).post(`/tasks/${task.id}/edit`).send({ task });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Edited");
  });

  // @alps-route:PUT /tasks/:id/status
  test('PUT /tasks/:id/status changes status', async () => {
    const { body } = await request(app).get('/tasks');
    const res = await request(app).put(`/tasks/${body[0].id}/status`).send({ task: { status: "completed" } });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("completed");
  });

  // @alps-route:PUT /tasks/:id/dueDate
  test('PUT /tasks/:id/dueDate sets dueDate', async () => {
    const { body } = await request(app).get('/tasks');
    const res = await request(app).put(`/tasks/${body[0].id}/dueDate`).send({ task: { dueDate: "2025-07-01" } });
    expect(res.statusCode).toBe(200);
    expect(res.body.dueDate).toBe("2025-07-01");
  });

  // @alps-route:PUT /tasks/:id/assign
  test('PUT /tasks/:id/assign sets assignedUser', async () => {
    const { body } = await request(app).get('/tasks');
    const res = await request(app).put(`/tasks/${body[0].id}/assign`).send({ task: { assignedUser: "Charlie" } });
    expect(res.statusCode).toBe(200);
    expect(res.body.assignedUser).toBe("Charlie");
  });
});
