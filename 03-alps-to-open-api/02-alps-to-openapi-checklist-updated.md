
# ✅ ALPS-to-OpenAPI 3.1 Conversion Checklist

A step-by-step guide for converting an ALPS document into an OpenAPI 3.1 document using finalized guidance. Includes required steps, verification, and optional enhancements.

---

## 1. 🔍 Prepare the ALPS Input

### Required:
- If `type` is missing, assume `type: semantic`.

- Confirm the ALPS file is valid and uses the `alps.json` schema.
- Ensure all descriptors have:
  - `id` or `href`
  - `title`
  - `type` (`semantic`, `safe`, `idempotent`, or `unsafe`)
  - `doc.value` for descriptions (if available)

### Optional:
- Ensure `def` attributes link to Schema.org or known vocabularies.
- Validate all states and transitions are connected (no isolated nodes).

---

## 2. 🏗️ Create Base OpenAPI Structure

- Set `openapi: 3.1.0`
- Fill out the `info` block using the ALPS `title` and `doc.value`
- Begin populating `paths` and `components.schemas`

---

## 3. 📚 Build Component Schemas

- Map each ALPS `semantic` descriptor to a schema field
- Set:
  - `type`, `title`, `description` from ALPS
  - `example` (inline)
  - `x-semantic` if `def` is present

```yaml
email:
  type: string
  format: email
  title: Email address
  description: Email address of the person
  x-semantic: https://schema.org/email
  example: "jane@example.com"
```

---

## 4. 🧭 Map Taxonomy States to Paths

- Use `/persons` for collection state, `/persons/{id}` for item state
- Map based on return type (`rt`) and transitions

---

## 5. 🔁 Translate Choreography to Operations

- `safe` → GET, `unsafe` → POST, `idempotent` → PUT, PATCH, DELETE
- Use:
  - `title` → `summary`
  - `doc.value` → `description`
  - `tag` → OpenAPI `tags`

---

## 6. 🔎 Add Query Parameters for Filters

- For ALPS `filter` transitions, convert `descriptor.href` items into query parameters

```yaml
parameters:
  - name: status
    in: query
    required: false
    schema: { type: string }
    description: Status of the person record
```

---

## 7. 🧪 Add Examples to Schemas

- Use inline `example` values on each property in the schema

---

## 8. 🧷 Add Error Responses

- Add standard error responses:
  - `400` for bad input (POST, PUT, PATCH)
  - `404` for not found (GET, PUT, DELETE with path param)

---

## 9. 🏷️ Add Tags from ALPS

- Use ALPS `tag` to assign OpenAPI `tags` to operations

```yaml
tags: [Item]
```

---

## 10. 🔗 Optional Enhancements

### OpenAPI `links`:
- Add affordance transitions in `responses` using ALPS choreography

### `x-alps-rt`:
- Include custom metadata for ALPS return type if useful for tooling

---

## ✅ Final Output Validation

| Check | Description |
|-------|-------------|
| Spec passes OpenAPI validation | Use Swagger Editor or CLI tools |
| Docs render correctly | Confirm in Swagger UI or Redoc |
| Transitions and paths match ALPS | Reflect full choreography model |
| Examples are included and realistic | Useful for documentation and testing |
| Groupings make sense | Use `tags` to improve navigation |

