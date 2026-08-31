
# 🔧 Step-by-Step Guide: ALPS → Styled HTML Documentation

This process assumes:
- You have a valid **ALPS JSON document**
- You want to produce a single-page, human-readable **HTML documentation** file
- You are following both the **ALPS-HTML template rules** and the **Blog API style**

---

## ✅ STEP 1: Parse and Classify Descriptors

1. **Load the ALPS JSON** using a JSON parser.
2. Extract the list of top-level `descriptor` objects.
3. Classify each descriptor into one of these types:
   - **Data Descriptors**:  
     A descriptor is considered a data descriptor if:
     - It has **no nested `descriptor` array**
     - Its `type` is either:
       - Not present (`undefined`)
       - Explicitly set to `"semantic"`  
     - It may include `def`, `title`, or `doc`, but not `safe`, `unsafe`, or `idempotent`

   - **Application States**:  
     Semantic or compound descriptors that include a `descriptor` array of references (`href`).

   - **Transitions (Affordances)**:  
     Descriptors with a `type` of `safe`, `unsafe`, or `idempotent`.

---

## ✅ STEP 2: Assign Unique Anchors and Cross-References

4. Ensure all descriptors have a **globally unique `id`** (enforced by ALPS spec).
5. For each `href` in a nested descriptor reference:
   - Convert it to an HTML anchor using `<a href="#ID">ID</a>`.
   - Use `<code>` tags around IDs when referencing within tables or examples.

---

## ✅ STEP 3: Create HTML Scaffolding and Metadata Section

6. Begin the HTML document with:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>...</head>
   <body>
     <header>...</header>
     <nav>...</nav>
     <section id="metadata">...</section>
     <main>
   ```

7. In the **Metadata Section**, extract and display:
   - `title`: from `alps.title`
   - `doc`: from `alps.doc.value`
   - Optional: links (`alps.link`)
   - Include version, last modified (UTC), and contact (if available)

---

## ✅ STEP 4: Build the Overview Section

8. Write a concise paragraph explaining what the API does, based on the ALPS document’s `title`, `doc`, and known context.

---

## ✅ STEP 5: Render the Data Descriptors Table

9. Output a `<section id="data-descriptors">` with a table:
   | ID | Title | Definition |
   |----|--------|------------|
10. For each data descriptor:
    - Render the `id` in `<code>` tags
    - Display the `title` and `def` (as a hyperlink if it's a URI)

---

## ✅ STEP 6: Render Application States Section

11. Output a `<section id="states">` with a table:
   | ID | Title | Tag | Contains |
   |----|-------|-----|----------|
12. For each application state:
    - Render `id` in `<code>` tags
    - Show `title` and optional `tag`
    - In **Contains**, split referenced descriptors into:
      - **Fields**: links to data descriptors
      - **Affordances**: links to transition descriptors

13. Below the table, add `<h3>` blocks with **realistic example JSON** for each state:
    ```html
    <h3>BlogPosting - Example</h3>
    <pre>{ "title": "My Post", "content": "...", "author": "admin" }</pre>
    ```

---

## ✅ STEP 7: Render Transitions (Affordances) Table

14. Output a `<section id="transitions">` with a table:
   | ID | Title | Type | HTTP | Return | Tag | Example |
   |----|-------|------|------|--------|-----|---------|
15. For each transition:
    - Map ALPS `type` to HTTP method:
      - `safe` → GET
      - `unsafe` → POST
      - `idempotent` → PUT
      - if the `id` contains the word `delete` or `remove` set the http method to `DELETE`
    - Use `rt` to link to the return type (a state ID)
    - Show `tag` if present

For each transition (`type`: `safe`, `unsafe`, `idempotent`):

**16. Resolve Referenced Input Fields**  
- If the transition includes a `descriptor` array, follow each `href` reference.
- Only include fields that resolve to valid **data descriptors** (see updated STEP 1 for classification).

**17. Render the Example Payload Based on HTTP Type**

- **If `type` is `safe`** → **GET**:
  - Render as a query string, e.g.:
    ```html
    <pre>?status=...&priority=...</pre>
    ```

- **If `type` is `unsafe` or `idempotent`** → **POST/PUT**:
  - Render as a JSON object, e.g.:
    ```html
    <pre>{
      "title": "...",
      "dueDate": "...",
      "assignedUser": "..."
    }</pre>
    ```

- If no data descriptors are referenced or resolvable, leave the **Example** column empty.

**18. Exclude Example Generation For:**
- Transitions without a `descriptor` array
- References that point only to application states or other transitions
---

## ✅ STEP 8: Style the Output Using Blog API Visuals

19. Apply the following CSS:
    ```css
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    header { background: #2c3e50; color: white; padding: 1rem; position: sticky; top: 0; }
    nav a { color: white; text-decoration: none; margin-right: 1rem; font-weight: bold; }
    nav a:hover { text-decoration: underline; }
    main { padding: 2rem; }
    section { margin-bottom: 3rem; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
    th, td { border: 1px solid #ccc; padding: 0.5rem; text-align: left; vertical-align: top; }
    code, pre { background: #f6f6f6; padding: 0.5rem; border-radius: 4px; }
    ```

---

## ✅ STEP 9: Add a Mermaid Diagram

20. Generate a **Mermaid diagram** to visually represent application states and transitions:

* Use `graph TD` syntax
* Create a node for each application state
* Add arrows (`-->`) labeled with transition titles pointing to return types (`rt`)

21. **Embed the Mermaid.js library** by inserting the following in your `<head>`:

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

22. **Insert the diagram into the HTML** after the Overview section (or wherever appropriate):

```html
<section id="diagram">
  <h2>API State Diagram</h2>
  <div class="mermaid">
graph TD
  Task["Task Detail"]
  TaskList["Task List"]
  User["User Profile"]
  UserList["List of Users"]
  Task -->|"Update Task"| Task
  Task -->|"Mark Task as Complete"| Task
  TaskList -->|"Create Task"| TaskList
  TaskList -->|"View Task Details"| Task
  TaskList -->|"Filter Tasks by Status"| TaskList
  TaskList -->|"Filter Tasks by Assigned User"| TaskList
  User -->|"Update User Profile"| User
  User -->|"Delete User"| UserList
  UserList -->|"Create User"| UserList
  UserList -->|"View User Details"| User
  </div>
</section>
```

23. Optionally add CSS to improve spacing:

```css
.mermaid {
  margin-top: 2rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 6px;
}
```

## ✅ STEP 10: Finalize and Validate

24. Ensure all anchors are working and all descriptor references link properly.
25. Confirm all required fields are shown (`id`, `title`, `type`, `def`, etc.)
26. Validate the HTML with a linter or browser dev tools.
27. Save as a standalone `.html` file ready for local or web distribution.

---

## ✅ Optional Enhancements

- Add favicon or `<title>` from `alps.title`
- Embed JSON schema links if available
- Include a "Quick Start" section if appropriate
