# ✍️ test-style-guide.md

> Style guide for writing maintainable, readable, and automation-friendly tests for Express APIs using Jest + Supertest.

This guide ensures consistency across hand-written and LLM-generated test files. It complements the metadata conventions and verification checklist.

---

## 🧱 Structure and Layout

### ✅ Project Layout

```
project-root/
├── index.js
├── test/
│   └── api.test.js
```

- All test files should be placed in the `test/` directory
- The main test file should be named `api.test.js` unless explicitly scoped

---

### ✅ Test File Structure

Each test file should follow this order:

1. Imports (`request`, `app`, `uuid`)
2. Setup: fixtures, hooks (`beforeEach`)
3. `describe()` block grouping related tests
4. Individual `test()` blocks
5. Export nothing

---

## 🏷️ Naming Conventions

- Use `describe('Resource or Route Group', ...)` to group related routes
- Use `test('method + route + behavior', ...)` pattern for names:
  - ✅ `GET /persons returns all persons`
  - ✅ `POST /persons fails with missing email`
- Avoid vague titles like `"works"` or `"responds"`.

---

## 🔖 Metadata Tagging

Each test block must have:

```js
// @alps-route:METHOD /path
```

Other optional tags:

- `@error-case`: for negative tests
- `@link-check`: for tests validating HAL-style `_links`

---

## 🧪 Test Style and Best Practices

| Rule | Example |
|------|---------|
| Use `async/await` | `const res = await request(app).get('/persons')` |
| Check status codes | `expect(res.statusCode).toBe(200)` |
| Validate response structure | `expect(res.body).toHaveProperty('id')` |
| Reset state before each test | Use `beforeEach()` and `app.__setPersons__()` |
| Keep tests independent | Don't depend on previous tests' results |

---

## 💡 Test Coverage Expectations

Every route should have:
- At least one happy path test
- At least one error case (400/404)
- A `_links` structure check (if HAL is used)

---

## 🧰 Helper Patterns (Optional)

Use helper functions for:
- Creating a valid person object
- Repeating common assertions
- Seeding/resetting test data

Avoid duplicating large object literals in every test.

---

By following this style guide, you'll ensure test code is easy to maintain, review, and automate.
