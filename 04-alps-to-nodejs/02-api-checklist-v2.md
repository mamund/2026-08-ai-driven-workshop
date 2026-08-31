# Prompt Checklist: Generate Node.js API from ALPS (v2)

---

## Semantic Mapping

* Extract `type: semantic` descriptors as **fields** (ontology layer)
* Use `title`, `doc`, and `def` for annotations (optional in code)

---

## Resource Mapping (Taxonomy)

* Each taxonomy (e.g., `TaskItem`) becomes a REST endpoint

  * Example: `TaskItem` → `/tasks/:id`
* Each item should include `_links` covering available actions

---

## Transition Mapping (Choreography)

* Map `safe` → `GET`, `idempotent` → `PUT`, `unsafe` → `POST`
* Each transition should:

  * Use its own URL path (`/tasks/:id/status` for `doUpdateStatus`)
  * Include `href`, `method`, `args` in `_links`

---

## Payload Structure

* Always expect payloads nested under entity names:

  ```json# Prompt Checklist: Generate Node.js API from ALPS (v2)

---

## Semantic Mapping

* Extract `type: semantic` descriptors as **fields** (ontology layer)
* Use `title`, `doc`, and `def` for annotations (optional in code)

---

## Resource Mapping (Taxonomy)

* Each taxonomy (e.g., `TaskItem`) becomes a REST endpoint

  * Example: `TaskItem` → `/tasks/:id`
* Each item should include `_links` covering available actions

---

## Transition Mapping (Choreography)

* Map `safe` → `GET`, `idempotent` → `PUT`, `unsafe` → `POST`
* Each transition should:

  * Use its own URL path (`/tasks/:id/status` for `doUpdateStatus`)
  * Include `href`, `method`, `args` in `_links`

---

## Payload Structure

* Always expect payloads nested under entity names:

  ```json
  { "task": { "id": "123", "status": "active" } }
  ```

---

## Error Handling

* Return `400 Bad Request` with detailed messages for:

  * Missing required fields
  * Invalid transitions
* Return `404 Not Found` with error object if entity doesn’t exist

---

## Query Filtering

* Support AND-based filtering for all query string parameters
* Case-insensitive matching for strings

---

## Root Endpoint

* Define `/` with `_links` to all collections and creation routes

---

## Sample Data

* Include initial in-memory items for demo/testing
* Use UUIDs when specified (e.g., `id` field mentions UUID)

---

This checklist supports efficient, consistent generation of hypermedia-compliant APIs from ALPS profiles.

  { "task": { "id": "123", "status": "active" } }
  ```

---

## Error Handling

* Return `400 Bad Request` with detailed messages for:

  * Missing required fields
  * Invalid transitions
* Return `404 Not Found` with error object if entity doesn’t exist

---

## Query Filtering

* Support AND-based filtering for all query string parameters
* Case-insensitive matching for strings

---

## Root Endpoint

* Define `/` with `_links` to all collections and creation routes

---

## Sample Data

* Include initial in-memory items for demo/testing
* Use UUIDs when specified (e.g., `id` field mentions UUID)

---

This checklist supports efficient, consistent generation of hypermedia-compliant APIs from ALPS profiles.

