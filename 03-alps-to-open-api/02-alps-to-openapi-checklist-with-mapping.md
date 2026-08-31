# ✅ ALPS to OpenAPI 3.1 Checklist

Use this checklist to verify accuracy and completeness when converting an ALPS profile to OpenAPI 3.1.

---

## 🔹 Setup

- [ ] Load and validate the ALPS document
- [ ] Ensure `$schema`, `version`, and `alps.descriptor[]` are present

---

## 🔹 Transition → Operation Mapping

- [ ] Each `safe` transition becomes a `GET` operation
- [ ] Each `idempotent` transition becomes a `PUT` operation
- [ ] Each `unsafe` transition becomes a `POST` operation
- [ ] Transitions with `"delete"` or `"remove"` (case-insensitive) become `DELETE` operations

---

## 🔹 Inputs (Parameters and Request Bodies)

- [ ] For GET, PUT, DELETE → input fields become `parameters` (in: query)
- [ ] For POST, PUT → input fields become JSON `requestBody`
- [ ] Parse `doc.value` for "Required:" to populate `required` field arrays

---

## 🔹 Return Types (`rt`)

- [ ] Every transition with an `rt` reference maps to an OpenAPI response
- [ ] Each unique `rt` generates a corresponding schema in `components.schemas`
- [ ] Schema content is based on the referenced taxonomy state

---

## 🔹 Schema Inference

- [ ] Use field names and doc values to infer types (`id`, `dueDate`, enums)
- [ ] Default to `string` if type is unknown
- [ ] Apply format hints (e.g., `uuid`, `date`) when possible

---

## 🔹 Tagging and Grouping

- [ ] Apply tag (if present) to each operation
- [ ] Register each tag under OpenAPI `tags` section
- [ ] Omit `tags:` from operation if ALPS transition lacks one
- [ ] Do not group schemas — all should be flat under `components.schemas`

---

## 🔹 Validation and Finalization

- [ ] All transition IDs are unique
- [ ] All `href` and `rt` references resolve
- [ ] Required fields match what’s declared in `doc.value`
- [ ] OpenAPI document is valid YAML and passes linting or schema check

---

This checklist ensures reliable, repeatable OpenAPI generation from any valid ALPS profile.
