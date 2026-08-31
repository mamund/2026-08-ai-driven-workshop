# ALPS to OpenAPI 3.1 Conversion Guidance

This document provides instructions and transformation rules for converting ALPS profiles into OpenAPI 3.1 documents.

---

## 🎯 Purpose

Transforming an ALPS profile into an OpenAPI 3.1 document allows semantic API definitions to become fully usable, documented, and testable in modern REST tooling.

---

## 🧱 Document Structure Overview

The generated OpenAPI YAML will include:

- `openapi` version
- `info` block (title and description)
- `paths` (from transitions)
- `components.schemas` (from taxonomy states)
- `tags` (optional, from ALPS descriptors)

---

## 🔁 Mapping Transitions to Operations

- `safe` → `GET`
- `idempotent` → `PUT`
- `unsafe` → `POST`
- If `id` contains `"delete"` or `"remove"` (case-insensitive), use `DELETE`
- Transition ID becomes `operationId`

---

## 🔡 Mapping Inputs

- Input fields are defined in `descriptor.href` arrays
- Request methods:
  - `GET`, `DELETE` → use `parameters` (query string)
  - `POST`, `PUT` → use `requestBody` (JSON)
- Parse `doc.value` for `"Required:"` field lists to identify required parameters or body fields

---

## 🔁 Mapping `rt` (Return Types)

- Every `rt` target becomes a named schema in `components.schemas`, even if used only once
- Schema name = value of `rt` without `#`
- Schema content is derived from the associated taxonomy state and its fields

---

## 📐 Inferring Field Types

| Hint in ALPS | OpenAPI Type | Notes |
|--------------|--------------|-------|
| `id`         | string + uuid| Based on field name |
| `dueDate`    | string + date| Based on name |
| Enums        | string/int   | From enum values |
| Otherwise    | string       | Default |

Use `doc.value` and metadata to guide inference. Otherwise, fallback to `string`.

---

## 🏷 Tags

- Transitions with a `tag` field → apply to the OpenAPI operation and register globally
- Transitions with no tag → omit the `tags:` field

---

## 🔁 Components Behavior

- Schemas are **flat** under `components.schemas`
- `$ref` is used to connect request/response bodies
- Do not nest or group by tag

---

## 🧪 Validation

- All transitions must produce a valid HTTP operation
- All `href` fields must resolve to known schema fields
- Every `rt` must result in a named schema
- Required fields must align with ALPS `doc.value` indicators

---

This guidance ensures consistent and standards-compliant OpenAPI output from well-formed ALPS inputs.
