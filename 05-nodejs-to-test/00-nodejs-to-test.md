# Node to Test Notes

## 🧑‍🏫 1. **Human-Facing Documentation**

These guide developers through the manual setup and help with onboarding or manual edits.

### ✅ You Already Agreed To:

* `setup-tests.md` — human-readable Markdown guide with install steps, file structure, and code modifications

### 🧩 Consider Adding:

| File                       | Purpose                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `test-style-guide.md`      | How to name, structure, and tag tests (e.g. `// @alps-route:...`, HAL checks, etc.)          |
| `faq.md`                   | Answers to common issues: “Why isn’t my test isolated?” or “How do I reset in-memory state?” |
| `README.md` (Project Root) | High-level purpose and link to test setup instructions                                       |

---

## 🤖 2. **LLM + Tooling Context for Automation**

These documents are **machine-friendly**, enabling future LLM workflows or CLI tools to auto-generate tests.

### Recommended Documents:

| File                             | Purpose                                                                                         |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `prompt-template-testgen.md`     | A canonical prompt used to generate `api.test.js` from a given `index.js` file or ALPS          |
| `index-modification-rules.md`    | Explicit rules for modifying `index.js` (e.g., exporting app, adding `__setPersons__`)          |
| `metadata-conventions.md`        | Describes test tagging patterns (e.g., `@alps-route`, `@setup`, etc.)                           |
| `test-verification-checklist.md` | LLM-verifiable list to validate generated tests (routes covered, links checked, etc.)           |
| `test-context.json`              | Capturable state: list of routes, test data schema, and expected patterns — a kind of seed file |

---

## Optional Bonus Artifacts

If you're planning to scale or build tools:

| Artifact                  | Use                                                                  |
| ------------------------- | -------------------------------------------------------------------- |
| `test-boilerplate.js`     | A JS file exporting the standard test structure, ready for injection |
| `patch-index-listen.diff` | A `.patch` file to auto-modify any `index.js` to be testable         |
| `codegen-mapping.yaml`    | Maps ALPS descriptors or route signatures to test template stubs     |

---

## 🔁 Looping It All Together

You can later build a **repeatable test generation pipeline**:

1. Feed in an `index.js` or ALPS
2. Use `prompt-template-testgen.md` with LLM
3. Modify `index.js` per `index-modification-rules.md`
4. Generate and validate tests using `test-verification-checklist.md`
5. Document it all with `setup-tests.md`


