# 📘 ALPS to OpenAPI 3.1 Conversion Guidance

This guide explains how to convert a valid ALPS profile into an OpenAPI 3.1 document using structured mappings.

---

## 🔶 Purpose

ALPS profiles describe application-level semantics in a protocol-independent way. This guide maps those semantics into the structural and operational constructs of OpenAPI 3.1.

---

## 🔁 Descriptor Mappings

### Transitions → OpenAPI Operations
- `type: safe` → HTTP `GET`
- `type: idempotent` → HTTP `PUT`
- `type: unsafe` → HTTP `POST`
- If the `id` contains `"delete"` or `"remove"` (case-insensitive) → HTTP `DELETE`

### Transition Inputs
- Fields listed in `descriptor.href`:
  - → `parameters` for `GET`, `PUT`, `DELETE`
  - → `requestBody` (JSON) for `POST`, optionally `PUT`
- If `doc.value` includes `"Required: field1, field2"` → apply these to OpenAPI `required` fields

### Return Types
- Every `rt` (return type) must generate a corresponding schema under `components.schemas`
- Use the referenced taxonomy descriptor to define the schema shape
- Use `$ref` in response bodies and reuse schemas across operations

---

## 🔶 Schema Inference Rules

- Use smart type inference based on field names and `doc.value` hints
- Examples:
  - `id` → string, format: uuid
  - `dueDate` → string, format: date
  - Enums → string or integer + enum
  - Fallback type = string

---

## 🏷 Tags

- If a transition includes a `tag` field, attach it to the OpenAPI operation and register under `tags:`
- If absent, omit the `tags:` field entirely

---

## 📦 Component Schema Rules

- Define all schemas flatly under `components.schemas`
- Use `$ref` to reference schemas for reuse in requestBody and responses
- Do not nest schemas or organize them by tag

---

## 🧪 Output Checklist Summary

- Every `rt` produces a schema
- Every transition becomes an operation with correct method
- Inputs correctly placed as parameters or request body
- All types inferred or defined
- All fields with `"Required:"` doc entries are marked required

