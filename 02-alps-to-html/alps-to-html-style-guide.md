# 🎨 ALPS → HTML Style & Layout Guide

This guide defines the visual and structural standards for converting an ALPS profile into a static HTML documentation page.

---

## 🔶 Document Structure

1. **Title and Description**
   - Use `alps.title` as `<h1>`
   - Use `alps.doc.value` as an introductory paragraph

2. **Ontology Section (Data Fields)**
   - Header: `<h2>Data Fields</h2>`
   - Table columns: ID, Title, Type, Definition, Tag
   - Each row = one `semantic` descriptor with no children

3. **Taxonomy Section (Application States)**
   - Header: `<h2>States</h2>`
   - One `<table>` per state
   - Show `id`, `title`, `tag`
   - Include `href` entries for related fields and transitions

4. **Choreography Section (Transitions)**
   - Header: `<h2>Transitions</h2>`
   - Group by `type` (safe, idempotent, unsafe)
   - Show: ID, Title, Type, Tag, Return State (RT), Required Fields (from doc)
   - Render **example payloads**:
     - `safe` / `idempotent`: query string
     - `unsafe`: JSON body
     - `DELETE`: query string (always)
   - Anchor IDs used for each transition

5. **Mermaid Diagram (Optional but Recommended)**
   - Header: `<h2>State Transition Diagram</h2>`
   - Use Mermaid syntax inside `<pre><code class="language-mermaid">...</code></pre>`
   - Show transitions grouped by originating state

6. **Tag Index (Optional)**
   - Header: `<h2>Tags</h2>`
   - Group descriptors by shared tag value

---

## 🔶 HTML Formatting Rules

- Use unique `id="..."` for anchor linking
- Do not collapse sections
- Use a clean, readable table layout with consistent column order
- Avoid embedded scripts (for security and portability)
- No external CSS required — inline styles or minimal class usage

---

## 🧪 Validation Expectations

- Every descriptor appears in one section
- All `href` and `rt` values resolve to existing anchors
- Example payloads are present for every transition with input fields
- Mermaid diagrams use valid syntax (nodes = states, edges = transitions)

---

This guide ensures that the resulting documentation is informative, navigable, and consistent across all ALPS-to-HTML renderings.
