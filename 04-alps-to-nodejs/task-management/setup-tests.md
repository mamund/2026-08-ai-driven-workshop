# 🛠️ API Test Setup Guide for ALPS-Based Express Server

This guide walks you through all the necessary steps to prepare and run Jest-based API tests for an Express server generated from an ALPS document.

---

## ✅ Prerequisites

Make sure the following are installed:

- **Node.js** (v18+)
- **npm** (v9+)
- **Jest** and **Supertest**

---

## 📁 Project Structure

Expected folder layout:

```
/project-root
├── index.js                ← Express API server
├── test/
│   └── api.test.js         ← Jest test suite
├── package.json
```

---

## 1. 🔧 Modify `index.js` for Testing Support

Add a test hook to reset in-memory data. Just after defining `let tasks = [...]`, insert:

```js
if (process.env.NODE_ENV === "test") {
  app.__setPersons__ = (fn) => {
    tasks = fn();
  };
}
```

Wrap the `app.listen(...)` call:

```js
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Task API running on port ${PORT}`);
  });
}
```

Finally, export the app:

```js
module.exports = app;
```

---

## 2. 🧪 Install Testing Dependencies

```bash
npm init -y
npm install --save-dev jest supertest uuid
```

Update `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

---

## 3. 📄 Create the Test File

Place your generated test file at:

```
/project-root/test/api.test.js
```

Ensure it uses `beforeEach()` and calls `app.__setPersons__`.

---

## 4. 🚀 Run Tests

```bash
npm test
```

---

## 5. 📋 Optional: HTML Test Report

Install the reporter:

```bash
npm install --save-dev jest-html-reporter
```

Add this to `package.json`:

```json
"jest": {
  "reporters": [
    "default",
    ["jest-html-reporter", {
      "pageTitle": "API Test Report",
      "outputPath": "./test-report.html"
    }]
  ]
}
```

Then run:

```bash
npm test
```

View the report: `./test-report.html`

---

## ✅ Checklist Summary

| Task | Complete |
|------|----------|
| `index.js` modified to support testing | ✅ |
| `jest`, `supertest`, `uuid` installed | ✅ |
| `api.test.js` file created | ✅ |
| Tests run successfully | ✅ |
| Optional HTML reporter enabled | ✅ |