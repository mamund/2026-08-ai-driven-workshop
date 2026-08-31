# 🔧 index-modification-rules.md

> Rules for modifying a standard Express `index.js` app to support in-memory testing via Jest + Supertest.

These rules ensure your app can be imported as a module in test files, and its internal in-memory data can be reset between tests.

---

## 🔁 Rule 1: Conditional `app.listen()`

### ✅ Required

Wrap your call to `app.listen()` so it only executes if the script is run directly:

### Before:

```js
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

### After:

```js
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
```

This allows test code to `require()` the app without starting the server.

---

## 🧪 Rule 2: Export the Express `app` for Tests

### ✅ Required

Export the app instance when `require.main !== module`:

```js
module.exports = app;
```

If needed, attach test-specific helpers before exporting (see below).

---

## 🔄 Rule 3: Add Reset Hook for In-Memory State

If your app uses in-memory data (e.g. `let persons = [...]`), expose a setter function for tests:

```js
app.__setPersons__ = (data) => { persons = data; };
```

This allows the test suite to fully control the state of the app.

---

## 📦 Complete Example Footer for `index.js`

```js
if (require.main === module) {
  app.listen(port, () => {
    console.log(\`Person Service API running at http://localhost:\${port}\`);
  });
} else {
  app.__setPersons__ = (data) => { persons = data; };
  module.exports = app;
}
```

---

## ✅ Summary Checklist

| Step | Description |
|------|-------------|
| 1. | Wrap `app.listen()` in `if (require.main === module)` |
| 2. | Export the `app` using `module.exports = app` |
| 3. | Expose a test-only setter like `__setPersons__` to reset in-memory arrays |

---

## 🔒 Notes

- This pattern works for any in-memory store (`let users = [...]`, etc.)
- If your app uses external databases, this hook can be replaced with mock injections or fixtures
