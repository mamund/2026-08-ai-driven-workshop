
# 🛠 ALPS → HTML Conversion: Operational Notes & Rationale

This document captures decisions, fallback logic, edge cases, and behavioral rules that complement the main step-by-step conversion guide. It is written to support future reproducibility by both humans and LLMs.

---

## ✅ 1. Classification Rules (Strict)

- A **data descriptor**:
  - Has no `"descriptor"` field
  - Has `"type"` of `"semantic"` or is undefined
- A **state**:
  - Has a `"descriptor"` array and no `"type"` or `"type"` is `"semantic"`
- A **transition**:
  - Has a `"type"` of `safe`, `unsafe`, or `idempotent`

---

## 🧭 2. HTTP Method Assignment

- `"type": "safe"` → `GET`
- `"type": "unsafe"` → `POST`
- `"type": "idempotent"` → `PUT`
- If `id` contains `"delete"` → always `DELETE` (overrides `type`)

---

## 🧪 3. Example Payload Generation Rules

For each transition:
- If no `descriptor` array → **no payload example**
- If descriptors reference only state or transitions → **no payload example**
- Otherwise:
  - If `HTTP` = `GET` or `DELETE` → render fields as query string:
    ```
    ?field1=...&field2=...
    ```
  - If `HTTP` = `POST` or `PUT` → render fields as JSON:
    ```
    {
      "field1": "...",
      "field2": "..."
    }
    ```

---

## 🔁 4. Fallback Logic (Avoided)

- We do **not** infer payloads from return types (`rt`)
- Example payloads must be based **only on the transition’s own descriptor array**

---

## 🧩 5. Mermaid Diagram Notes

- Nodes = application state IDs
- Edges = transition IDs with label titles
- Syntax:
  ```
  transitionId["Title"] --> StateID
  ```

---

## 🔎 6. Validation and QA Practices

Every generated HTML output must pass:
- Unique IDs for all anchors
- All `<a href="#...">` resolve to an element with that `id`
- Every transition has a non-empty `<pre>` example if eligible
- DELETE transitions use query strings

---

## 🧠 7. Rationale for Key Design Choices

- **No fallback from return state** → avoids incorrect assumptions about inputs
- **Strict `DELETE` rule** → aligns with HTTP semantics and real-world infrastructure
- **Tables over nested rendering** → improves clarity and scanability
- **One-page HTML structure** → allows for static hosting and offline use

---

## 🧪 8. Optional Enhancements (if needed)

- Add "Quick Start" or "Try It" at the top
- Generate companion JSON schema links
- Inject LLM meta comments (`<!-- LLM: data-section:start -->`)

---

## 🔁 Usage

Attach this file when:
- Creating new ALPS-to-HTML conversions
- Asking an LLM to generate docs using this method
- Performing validation/regression on new ALPS models

