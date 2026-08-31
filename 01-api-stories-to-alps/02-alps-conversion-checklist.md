# ✅ ALPS Conversion Checklist

Use this checklist to ensure accuracy and completeness when converting an API Story into an ALPS document.

---

## 🔹 Ontology (Data Fields)

- [ ] Extract all field names from "Data Properties"
- [ ] Define one `semantic` descriptor per field
- [ ] Use `lowerCamelCase` IDs
- [ ] Add `title` for each field
- [ ] Add `doc` for meaning/constraints (optional)
- [ ] Use `tag` to group by domain
- [ ] Use `def` only if Schema.org or equivalent term exists

---

## 🔹 Taxonomy (Application States)

- [ ] Identify all distinct resources or states in the API story
- [ ] Define one `semantic` descriptor per state
- [ ] Use `UpperCamelCase` IDs
- [ ] Include `href` references to:
  - [ ] Relevant ontology descriptors (fields)
  - [ ] Relevant choreography descriptors (actions)
- [ ] Assign a consistent `tag` for each state group

---

## 🔹 Choreography (Transitions / Actions)

- [ ] List all actions from the story's "Actions" section
- [ ] Use appropriate `type`: `safe`, `unsafe`, `idempotent`, `delete`
- [ ] Use `go...` prefix for `safe`, `do...` for others
- [ ] Set `rt` to the return state’s ID
- [ ] Include `href` to input field descriptors
- [ ] Tag actions consistently by domain or function
- [ ] **Annotate required inputs in `doc.value` using format: "Required: field1, field2"**

---

## 🔹 Structural Validation

- [ ] All descriptors have unique IDs
- [ ] All `href` references resolve
- [ ] All `rt` attributes reference valid states
- [ ] Every taxonomy state links to at least one field and one action
- [ ] Every transition is used by at least one state
- [ ] Every state is reachable and has outgoing transitions (except terminals)

---

## 🧪 Verification Report

- [ ] Run compliance script to check:
  - [ ] Missing or duplicate IDs
  - [ ] Isolated states
  - [ ] Unlinked transitions
  - [ ] Broken references
  - [ ] Required fields are annotated in action `doc.value` fields

---

## ✅ Ready for Conversion

- [ ] Confirm format (JSON or XML)
- [ ] Confirm title and version info
- [ ] Ready to generate OpenAPI, JSON Schema, or agent-facing docs
