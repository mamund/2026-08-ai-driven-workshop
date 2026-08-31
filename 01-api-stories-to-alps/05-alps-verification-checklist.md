# ✅ ALPS Post-Generation Verification Checklist

Use this checklist to verify that a generated ALPS profile is valid, complete, and ready for use in downstream tooling (e.g., documentation, OpenAPI conversion, schema generation, etc.).

---

## 🔹 Structural Checks

- [ ] All `descriptor` elements have a unique `id`
- [ ] No `id` values are duplicated
- [ ] All `href` references resolve to an existing `id`
- [ ] All `rt` values refer to valid `semantic` descriptors representing states
- [ ] All transition (`safe`, `unsafe`, `idempotent`) descriptors are referenced by at least one taxonomy state
- [ ] All taxonomy states are reachable from at least one transition
- [ ] All states have outbound transitions unless explicitly terminal

---

## 🔹 Ontology Checks (Fields)

- [ ] All field descriptors use `type: semantic`
- [ ] All field IDs use `lowerCamelCase`
- [ ] Each has a `title`; optional `doc` for clarification
- [ ] Use `def` only for Schema.org or approved external URIs
- [ ] Apply domain-relevant `tag` values (e.g., `task-management`)

---

## 🔹 Taxonomy Checks (States)

- [ ] Each state uses `type: semantic` and `UpperCamelCase` ID
- [ ] Contains only `href` references (no inline `id` definitions)
- [ ] Includes references to relevant ontology fields and transitions
- [ ] Tagged appropriately for grouping or visual navigation

---

## 🔹 Choreography Checks (Transitions)

- [ ] Each transition uses one of: `safe`, `unsafe`, `idempotent`
- [ ] Uses the correct prefix (`go` for `safe`, `do` for others)
- [ ] Includes all required inputs using `href` to ontology elements
- [ ] Specifies `rt` (return type) pointing to a valid taxonomy state
- [ ] Tagged consistently to reflect its business domain

---

## 🔹 Document-Level Validation

- [ ] ALPS JSON includes top-level `"alps"` object with `"version"` and `$schema`
- [ ] JSON is free of comments or invalid keys
- [ ] File is well-formatted and passes linting tools or schema validation
- [ ] Optional: Run automated compliance script (if available)

---

## ✅ Outcome

When all items are checked, the ALPS document is verified and ready for:

- OpenAPI or JSON Schema generation
- ALPS-to-HTML documentation
- Agent protocol integration (e.g., ALPS + MCP)
- Long-term semantic modeling reuse

