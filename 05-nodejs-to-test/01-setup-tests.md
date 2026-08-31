# 🧪 Setting Up Automated Tests for Express APIs

> A step-by-step guide to manually configure and run Jest + Supertest tests against a Node.js Express API.

---

## 📦 Prerequisites

Before proceeding:

- Node.js and npm installed
- Express-based API in a file (e.g. `index.js`)
- Local `package.json` project file initialized (`npm init`)

---

## 1. Install Dev Dependencies

Run:

```bash
npm install --save-dev jest supertest
```

Update your `package.json` to include:

```json
"scripts": {
  "test": "jest"
}
```

---

## 2. Modify Your Express App for Testing

Edit the bottom of your `index.js` (or main app file) so it can be tested without starting the server:

### 🔧 Replace this:

```js
app.listen(port, () => {
  console.log(`Person Service API running at http://localhost:${port}`);
});
```

### ✅ With this:

```js
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Person Service API running at http://localhost:${port}`);
  });
} else {
  app.__setPersons__ = (data) => { persons = data; };
  module.exports = app;
}
```

This allows your test runner to import the app directly and reset state between tests.

---

## 3. Create the `test/` Directory

Make a new folder for tests:

```bash
mkdir test
```

Then place your test file inside:

```
project-root/
├── index.js
├── test/
│   └── api.test.js
```

---

## 4. Write or Copy a Test File

Here’s a simple template for your test file:

```js
const request = require('supertest');
const app = require('../index');

// Example test
test('GET / returns HAL links', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
  expect(res.body._links).toBeDefined();
});
```

Or use a full version with data reset and tagging (see `api.test.js` in this repo).

---

## 5. Run Your Tests

```bash
npm test
```

---

## 6. Verify Success

- ✅ All tests should pass
- ✅ In-memory state should reset between tests
- ✅ Each route should be tested
- ✅ HAL-style `_links` objects should be checked

---

## 🗂️ Notes

- This setup assumes your app uses in-memory arrays (like `let persons = [...]`)
- If your app uses a real DB, you'll need to stub or mock that for tests
- You can add metadata tags like `// @alps-route:GET /persons` to each test for future automation

---

_Last updated: 2025-05-20_
