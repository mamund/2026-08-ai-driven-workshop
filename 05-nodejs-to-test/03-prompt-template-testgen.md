# 🤖 prompt-template-testgen.md

> Canonical prompt template for generating a Jest + Supertest test suite from a Node.js Express API

This prompt is designed to be used with a large language model (LLM) to auto-generate a complete test suite from an `index.js` file. The resulting test file should follow standard project structure, include route coverage, verify HAL `_links`, and allow state reset if in-memory data is used.

---

## 📥 Prompt Template (to use with an LLM)

```
You are an assistant that generates Jest + Supertest tests for Express.js APIs.

Here is the API source code:

<PASTE index.js CONTENT HERE>

Please generate a complete test file named `api.test.js` that:

1. Covers all Express routes (GET, POST, PUT, DELETE, etc.)
2. Uses Jest + Supertest syntax with `async/await`
3. Assumes an in-memory store (e.g. `let persons = [...]`)
4. Resets app state before each test (via a function like `app.__setPersons__`)
5. Verifies HAL-style `_links` structure in each relevant response
6. Adds comment metadata like `// @alps-route:GET /persons` before each test
7. Uses clean test naming and consistent test structure

If needed, modify the `index.js` to make the app testable:
- Wrap `app.listen()` in `if (require.main === module)`
- Export the `app` using `module.exports = app`
- Attach a setter: `app.__setPersons__ = (data) => { persons = data; }`

Output the full contents of `test/api.test.js`. Do not summarize or explain.
```

---

## 🧪 Expected Output Characteristics

- File name: `test/api.test.js`
- Covers **all** routes
- Resets state using `__setPersons__`
- Contains HAL `_links` checks
- Tags each test with `// @alps-route:...`

---

## ✅ Usage Tips

- You can store this template in your automation system to generate tests from Express code or ALPS-derived servers
- Use a parser or static analysis tool to extract route paths ahead of time, then verify test coverage after generation
