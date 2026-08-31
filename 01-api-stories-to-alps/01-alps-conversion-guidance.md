# ALPS Conversion Guidance: From API Story to ALPS Profile

This document provides comprehensive guidance for converting an **API Story document** into a structured, valid ALPS (Application-Level Profile Semantics) profile.

---

## 📘 Purpose

The goal is to translate business-level narratives and API behaviors into a consistent, protocol-independent semantic model using ALPS. This guide ensures repeatability and clarity across all conversions.

---

## 🔶 Step 1: Identify Ontology (Fields / Data Properties)

### What to Look For:
- Field definitions under "Data Properties" or equivalent sections
- Name, type, meaning, and optional constraints (e.g., enums)

### What to Create:
- One `descriptor` per field
- Use `type: semantic`
- Use `title` for display name
- Use `doc` for clarification if necessary
- Use `tag` to group by domain (e.g., `task-management`)
- Optionally use `def` for Schema.org URIs if applicable

---

## 🔶 Step 2: Identify Taxonomy (Application States / Resources)

### What to Look For:
- Named views or resources under "Resources", "States", or user flows
- Pages or endpoints like `Home`, `TaskItem`, `TaskCollection`

### What to Create:
- One `descriptor` per resource with `type: semantic`
- ID should be `UpperCamelCase` (e.g., `TaskCollection`)
- Contain `href` references to:
  - Related fields (from ontology)
  - Transitions available in that state
- Use `tag` to group related states

---

## 🔶 Step 3: Define Choreography (Actions / Transitions)

### What to Look For:
- Named user actions under "Actions" or "Operations"
- HTTP-safe classification: GET, POST, PUT/PATCH, DELETE

### What to Create:
- One `descriptor` per action
- Use `type` values: `safe`, `unsafe`, `idempotent`, `delete`
- Prefix IDs:
  - `go` for safe (e.g., `goTaskList`)
  - `do` for unsafe/idempotent (e.g., `doCreateTask`)
- Set `rt` to the ID of the target state (`#TaskItem`)
- Use `href` to include field references from ontology

### 📌 Required Inputs
- If an action has explicitly marked required fields (from API Story), list them in `doc.value`:
  ```json
  "doc": { "value": "Required: id, title, status" }
  ```

---

## 🔶 Step 4: Link Everything Together

- Every **state** must include `href`s to the **fields** and **transitions** active in that state
- Every **transition** must reference input fields and point to a valid result state
- Every **descriptor ID** must be unique
- Every **state** should be reachable and should link outward unless it's terminal

---

## 🔶 Step 5: Apply Structural and Naming Rules

- Ontology IDs → `lowerCamelCase`
- Taxonomy IDs → `UpperCamelCase`
- Choreography IDs → `goX`, `doX`
- Use `tag` consistently for grouping (e.g., `task-management`)
- Only use `def` if a well-known external definition (e.g., Schema.org) exists

---

## 🧪 Verification and Testing

Run a validation report to confirm:
- No duplicate or missing IDs
- All `rt` and `href` references resolve
- Required fields are documented in transitions
- No isolated states or unlinked transitions
- All elements are connected and usable

---

## ✅ Result

You now have a protocol-independent semantic model that accurately represents the API Story in an interoperable and inspectable format, ready for conversion to OpenAPI, JSON Schema, or agent-based protocols.
