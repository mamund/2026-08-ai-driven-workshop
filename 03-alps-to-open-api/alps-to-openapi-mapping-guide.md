# 🔁 ALPS to OpenAPI Mapping Guide

This guide outlines how to convert ALPS descriptors into a valid OpenAPI 3.1 YAML specification using smart defaults and established conventions.

---

## 🔹 Descriptor Type Mapping

| ALPS Descriptor Type | OpenAPI Element       | Notes |
|----------------------|------------------------|-------|
| `semantic` (no children) | `components.schemas.properties` | Used in field definitions |
| `semantic` (with `descriptor`) | `components.schemas` | Becomes a named object schema |
| `safe`               | `GET` operation        | Parameters in query string |
| `idempotent`         | `PUT` operation        | Parameters or JSON body |
| `unsafe`             | `POST` operation       | Always uses requestBody |
| ID includes `"delete"` or `"remove"` | `DELETE` operation     | Parameters in query string |

---

## 🔹 Field Handling

- Input fields (`descriptor.href`) become:
  - `parameters` for GET/PUT/DELETE
  - `requestBody` schema (JSON) for POST and optionally PUT
- Required fields are parsed from `doc.value` with `"Required: field1, field2"` syntax

---

## 🔹 Return Type (`rt`) Mapping

- Each `rt` reference (e.g., `"#TaskItem"`) becomes:
  - A named schema under `components.schemas`
  - The referenced taxonomy descriptor defines the shape
  - Used as response schema for `200 OK`

---

## 🔹 Schema Inference Rules

| Field Name Hint   | Type      | Format       |
|-------------------|-----------|--------------|
| `id`              | string    | uuid         |
| `dueDate`, `date` | string    | date         |
| Enum values       | string/int| enum         |
| Unknown           | string    |              |

- Enum fields are inferred by repeated values or documentation
- Use smart defaults unless metadata explicitly overrides

---

## 🔹 Tags

- Transitions with a `tag` field:
  - Add `tags: [...]` to the corresponding operation
  - Register tag under OpenAPI `tags:` section
- Transitions without a tag → omit `tags:` field

---

## 🔹 Additional Notes

- Do not group schemas by tag
- Do not nest schemas inside each other
- Use `$ref` to reuse schemas in responses and request bodies
- Flatten all schemas under `components.schemas`

---

This mapping guide ensures a clean, standards-compliant, and automatable conversion from ALPS to OpenAPI.
