# 🏷️ metadata-conventions.md

> Standardized metadata tags for use in test files, enabling automation, verification, and traceability in generated tests.

These conventions apply to all generated or manually written test files targeting Express APIs using Jest + Supertest.

---

## 🔖 Metadata Tag Format

Tags are single-line comments placed directly above each `test()` or `describe()` block.

### Format:

```js
// @alps-route:<METHOD> <ROUTE>
```

### Example:

```js
// @alps-route:GET /persons
test('GET /persons returns all persons', async () => {
  ...
});
```

---

## 📚 Supported Metadata Tags

| Tag | Purpose |
|-----|---------|
| `@alps-route:<METHOD> <ROUTE>` | Identifies the API route being tested |
| `@setup` | Indicates a setup or reset operation (e.g. state fixture injection) |
| `@helper` | Marks utility functions inside the test file |
| `@error-case` | Indicates an expected failure or error response test |
| `@link-check` | Highlights tests that validate `_links` or HAL affordances |

---

## 🧪 Usage Guidelines

- Every `test()` block **must** be preceded by a `@alps-route:` tag.
- Use `@error-case` on tests checking 4xx/5xx responses.
- Use `@link-check` on any test that validates HAL-style `_links`.

---

## 📤 Machine Parsing Tips

- Tags are always single-line comments (`//`)
- Use regular expressions like `/@alps-route:(\w+)\s+(\S+)/` to extract method and path
- Tags can be used for:
  - Coverage verification
  - Auto-linking tests to route specs
  - LLM prompt injection
  - Static analysis of generated suites

---

## ✅ Example Annotated Test Block

```js
// @alps-route:PUT /persons/:id/status
// @error-case
test('PUT /persons/:id/status should fail for invalid status', async () => {
  const res = await request(app)
    .put(`/persons/invalid-id/status`)
    .send({ person: { status: 'not-valid' } });
  expect(res.statusCode).toBe(400);
});
```

---

By using these tags consistently, you enable better tooling, future test generation, and robust audit trails for your API tests.
