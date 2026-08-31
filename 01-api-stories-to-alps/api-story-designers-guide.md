# ✍️ API Story Designer’s Guide

This document is for **product owners, API designers, and business analysts** who want to write effective API Story documents. These stories serve as the starting point for generating ALPS profiles, OpenAPI specs, and documentation.

---

## 🧭 Purpose of an API Story

An API Story defines **what the system needs to do** in plain, structured language. It bridges the gap between business intent and technical modeling. API Stories are **input** to an API design pipeline that produces ALPS, OpenAPI, and more.

---

## 🧱 Required Sections

### 1. 🧭 Purpose
Briefly explain what the system or API is intended to do.

```markdown
## Purpose
We need to track 'Task' records to improve customer follow-up accuracy.
```

---

### 2. 🧾 Data Properties (Ontology Candidates)
List all fields the API must track. Include:
- Field name
- Description
- Type (e.g., string, number, date)
- Constraints (e.g., enum values, required status)

```markdown
## Data Properties
- **id**: Unique identifier for each record [uuid]
- **title**: Title of the task [string]
- **status**: Task status (active, completed) [enum]
```

---

### 3. 🔄 Resources or States (Taxonomy Candidates)
List the resources that represent application states. These often align with pages, screens, or distinct data views.

```markdown
## Resources
- **Home**: The entry point of the API
- **TaskCollection**: View of all tasks
- **TaskItem**: A single task's details
```

Each resource should list:
- Its name
- A short description
- Actions available in that state

---

### 4. 🧠 Actions (Choreography Candidates)
Enumerate all operations the API must support. For each action, specify:

- Action name
- Inputs (fields required)
- Required fields (subset of inputs)
- Return value (target state)
- Type (`Safe`, `Idempotent`, `Unsafe`, or `Delete`)

```markdown
## Actions

- **CreateNewTask**:
  - Inputs: id, title, description, dueDate, status, priority, assignedUser
  - Required: id, title, status
  - Returns: TaskCollection
  - Type: Unsafe

- **UpdateStatusOfTask**:
  - Inputs: id, status
  - Required: id, status
  - Returns: TaskItem
  - Type: Idempotent
```

---

### 5. 📏 Rules (Optional)
Capture important constraints or business logic.
- Auto-generation rules
- Required fields
- Domain-specific rules

```markdown
## Rules
- When creating a new task, the client must supply a globally unique `id`.
```

---

## ✅ Best Practices

- Use consistent naming for resources and fields
- Always include `Required:` lines for each action
- Keep descriptions short but clear
- Confirm that every state is reachable and has outbound transitions

---

## 🔚 Output Expectations

A well-written API Story enables automatic generation of:

- ALPS profiles (for affordance modeling)
- OpenAPI specifications (for RESTful interface design)
- HTML documentation
- Tests, mocks, and more
