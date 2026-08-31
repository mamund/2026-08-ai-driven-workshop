# 🧠 Prompt Template for Generating HTML from ALPS

Use this template to instruct a language model to generate full HTML documentation based on a valid ALPS profile.

---

## 🔶 Prompt Format

```text
Please generate HTML documentation from the following ALPS profile.

* Output Format: Single static HTML page
* Document Structure:
  - Title and introduction (from `alps.title` and `alps.doc`)
  - Ontology (data fields)
  - Taxonomy (application states)
  - Choreography (transitions)
  - Mermaid diagram for visualizing transitions (optional but recommended)
  - Grouped tag index (optional)

* Formatting Rules:
  - Show all: `id`, `title`, `type`, `def`, `tag`, and `rt` values
  - Use tables for displaying descriptor lists
  - For transitions:
    - Safe/idempotent: use query string examples
    - Unsafe: use JSON body examples
    - Delete actions: always use HTTP DELETE with query parameters
  - Use descriptor `id`s as anchor targets (`id="..."`)
  - Generate valid, standalone HTML — no scripts or external dependencies required
```

---

## 🔹 Example Invocation

```text
Please convert the attached ALPS profile into well-structured HTML documentation.

Include a Mermaid diagram to show state transitions.

Group ontology, taxonomy, and choreography using headers. Use tables and anchors for clarity. Follow all formatting rules. Return only the HTML content.
```

---

## ✅ Output Format

- HTML document as a complete string
- No markdown, explanations, or commentary
- Ready to paste into a `.html` file or render in-browser
