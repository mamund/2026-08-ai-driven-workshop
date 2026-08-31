# Post-Process Verification: ALPS to Node.js API

After generating an API from an ALPS profile, confirm the following:

---

## Structural Compliance
- [ ] All ALPS **taxonomy states** are mapped to corresponding endpoints
- [ ] All **transitions** are implemented as separate endpoints
- [ ] `index.js` follows Express.js structure and uses in-memory storage
- [ ] `POST`, `PUT`, and `GET` routes use the correct HTTP verbs per transition type

---

## HAL-Style Output
- [ ] Every single response includes a `_links` section
- [ ] `_links` for each resource include:
  - [ ] `href`
  - [ ] `method`
  - [ ] `args` for required and optional fields
- [ ] Collection responses (`/tasks`) embed `_links` in each item

---

## Validation
- [ ] Missing required fields trigger `400 Bad Request` with **detailed messages**
- [ ] Nonexistent resource access triggers `404 Not Found` with `error` object

---

## Filtering & Root
- [ ] Filtering uses AND logic and is case-insensitive
- [ ] `/` root route links to top-level collections and actions

---

## Data & IDs
- [ ] Sample data is preloaded and includes varied `status`, `priority`, `assignedUser`
- [ ] UUIDs are used where specified in ALPS (`id` fields), otherwise use incremental

---

Use this checklist to confirm that the output fully conforms to `alps-api-template-v2` and your system prompt expectations.

