# ✅ ALPS to OpenAPI 3.1 Conversion Checklist

Use this checklist to ensure that the OpenAPI output correctly reflects the structure and semantics of the source ALPS document.

---

## 🔹 Transition Mapping

- [ ] All transitions with `type: safe` → GET
- [ ] All transitions with `type: idempotent` → PUT
- [ ] All transitions with `type: unsafe` → POST
- [ ] Any transition `id` that contains "delete" or "remove" (case-insensitive) → DELETE

---

## 🔹 Inputs and Parameters

- [ ] Inputs (`descriptor.href`) become:
  - [ ] Query `parameters` for GET, PUT, DELETE
  - [ ] `requestBody` (application/json) for POST and optionally PUT
- [ ] `doc.value` with "Required: ..." is parsed to set required fields

---

## 🔹 Schema Generation

- [ ] Every `rt` target generates a schema under `components.schemas`
- [ ] Field types inferred from:
  - [ ] Field name (e.g. `id`, `dueDate`)
  - [ ] Enum values
  - [ ] `doc.value` text
  - [ ] Fallback to `string` if no clues
- [ ] Schema structure is flat (no nesting, no tag grouping)

---

## 🔹 Operation Construction

- [ ] Each operation has correct HTTP method
- [ ] `tags:` field applied if transition has a `tag` in ALPS
- [ ] Omit `tags:` if no tag is present

---

## 🔹 Response Handling

- [ ] All operations with an `rt` return type include a `200` response
- [ ] Response schema uses `$ref` to the corresponding `components.schemas` entry

---

## 🔹 Final Validation

- [ ] `paths` are populated and route identifiers are derived from state and transition names
- [ ] All `$ref`s resolve
- [ ] All field and schema names are valid OpenAPI identifiers
- [ ] No markdown, comments, or narration in final output
- [ ] Valid OpenAPI 3.1 YAML

