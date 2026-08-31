# ✅ test-verification-checklist.md

> A checklist to verify the completeness, correctness, and consistency of a generated `api.test.js` file for an Express API.

Use this checklist manually or automate it via script or LLM to confirm that generated tests meet quality and coverage requirements.

---

## ✅ Coverage Requirements

### Routes

- [ ] Every route from the Express `index.js` is tested
  - [ ] `GET /`
  - [ ] `GET /persons`
  - [ ] `POST /persons`
  - [ ] `GET /persons/:id`
  - [ ] `PUT /persons/:id/edit`
  - [ ] `PUT /persons/:id/status`
  - [ ] `DELETE /persons/:id`
  - [ ] `GET /persons/filter`

---

## 🏷️ Metadata Requirements

- [ ] Every `test()` block includes a `// @alps-route:<METHOD> <ROUTE>` tag
- [ ] Error tests include `@error-case` tags
- [ ] HAL-affordance validation tests include `@link-check` tags

---

## 🧪 Behavior & Structure

- [ ] Tests use `async/await` and `request(app)` via Supertest
- [ ] The app is imported from `../index` and not launched in a server
- [ ] A `beforeEach()` hook is used to reset in-memory state
- [ ] The app exposes a reset method like `app.__setPersons__`
- [ ] Each test includes clear assertions on `statusCode`
- [ ] Each response test checks structure of returned JSON (e.g., `id`, `status`, `email`)
- [ ] Where `_links` is present, structure is verified (`self.href`, `method`, etc.)

---

## 📦 File Placement and Naming

- [ ] Tests are placed in `test/api.test.js`
- [ ] File uses consistent formatting (2-space or 4-space indentation)
- [ ] Descriptive test names (no generic "it works" titles)
- [ ] Test file does not start or stop the server

---

## 📤 Optional Enhancements

- [ ] Uses helper functions for creating test fixtures
- [ ] Includes edge case tests (e.g., missing fields, invalid status)
- [ ] Includes batch filtering test (`GET /persons/filter?status=...`)
- [ ] Uses `describe()` blocks for grouping related tests

---

This checklist ensures both human authors and automation tools can verify the fidelity of test files derived from ALPS profiles or Express API implementations.
