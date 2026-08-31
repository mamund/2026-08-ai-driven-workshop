# 🧠 Prompt Template for Converting ALPS to OpenAPI 3.1

Use this template to instruct a language model to generate an OpenAPI 3.1 document based on a valid ALPS profile.

---

## 🔶 Prompt Format

```text
Please convert the following ALPS profile into an OpenAPI 3.1 YAML document.

* Output Format: OpenAPI 3.1 (YAML)
* Structure must include: `openapi`, `info`, `paths`, `components.schemas`, and optionally `tags`
* Mapping Rules:
  - `safe` → GET
  - `idempotent` → PUT
  - `unsafe` → POST
  - If `id` includes "delete" or "remove" (case-insensitive) → DELETE
* Input fields (from `descriptor.href`) become:
  - `query` parameters for GET, PUT, DELETE
  - `requestBody` (JSON) for POST and PUT
* Required fields should be determined by `doc.value` text (e.g., "Required: id, status")
* Every `rt` must produce a schema in `components.schemas`, even if used once
* Tags from transitions should be applied to the operation and registered globally (if present)
* Use smart type inference (e.g., id = uuid, dates, enums) and default to `string` when unclear
* Keep all schema definitions flat under `components.schemas`

* Do not include any prose, explanation, or markdown — only the YAML document.
```

---

## 🔹 Example Invocation

```text
Please generate an OpenAPI 3.1 document from the attached ALPS profile.

Use correct HTTP method mappings, infer types where needed, and generate schema components for every `rt`. Include requestBody or parameters based on transition type. Format output as valid YAML and return only the OpenAPI document.
```

---

## ✅ Output Format

- Valid OpenAPI 3.1 YAML
- No markdown, comments, or surrounding text
- Ready for use in tools like Swagger UI, Stoplight, Redoc, or VSCode plugins
