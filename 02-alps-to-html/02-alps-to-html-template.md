# ALPS-to-HTML Documentation Prompt Template

You are to generate clean, single-page, native HTML documentation for an ALPS (Application-Level Profile Semantics) document. Follow the formatting and semantic conventions outlined below.

---

## ✅ Document Structure

- Use a **single-page layout**
- Include a **sticky top navigation bar** linking to major sections:
  - Overview
  - Data Descriptors
  - Application States
  - Transitions (Affordances)
  - Metadata (if available)

---

## ✅ Linking and Anchoring

- Use `id="..."` attributes for **all descriptor anchors** (data, states, transitions)
- All **references** to those descriptors must be hyperlinked using `<a href="#...">id</a>`
- Enforce globally **unique IDs** across all descriptor types

---

## ✅ Descriptor Presentation

- Present all data, state, and transition descriptors in **HTML tables**
- For each descriptor, display:
  - `id` (as anchor and label)
  - `title`
  - `def` (external schema URL if present)
  - `type` (safe, unsafe, idempotent, semantic type)
  - `tag` (if present)
- For transitions, also show:
  - `rt` (return type)
  - Mapped **HTTP method**:
    - `safe` → GET
    - `unsafe` → POST
    - `idempotent` → PUT
    - if the `id` contains the word `delete` -> DELETE
- If available, show `doc` as a description
- If available, show `required`/`optional` status

---

## ✅ Examples and Use Cases

- Include **example JSON representation** for each **application state**
- Include **example request/response payloads** for each **transition**

---

## ✅ Styling and Metadata

- Use default font and spacing (sans-serif, light theme)
- Include the **ALPS profile title** in the top header
- Style `<h1>` as **large white text** on a dark background
- Do not use emojis or extended graphic characters in headers
- At the top or bottom, include:
  - **Profile version** (if present)
  - **Last modified timestamp** (UTC)
  - **Author/contact info** (if present)

---

## ✅ Audience

- Documentation should serve:
  - API implementers
  - API consumers
  - LLM/agentic clients
- Keep tone **concise, technical, and structured**
- Only include descriptions or status fields if present in the ALPS document

---

## 🚫 Do Not Include

- Collapsible sections or dynamic TOC
- Status code documentation
- Implementation tips or warnings
- Search indexing or JSON-LD/RDFa metadata
- QA/auditor-focused content

---

## ✅ Output Format

- Native HTML
- Fully linked
- Standalone
- Human-readable and agent-compatible

---

## ⏩ Input

You will be given an ALPS JSON document. Use the above instructions to produce the final HTML documentation output.
