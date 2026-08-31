# Prompt Template for RBAC Security Profile Generation

Please generate an RBAC Security Profile from the following API Story.

- Format: Markdown
- Language: English
- Requirements:
  - Extract `## Roles`, and `AllowedRoles:` from Resources and Actions
  - Create Declared Roles, Resource Access Matrix, Action Access Matrix
  - Include a Verification Summary covering defined roles, structure, and logical consistency
  - Do not use emojis
  - Output must be a single, complete Markdown document
  - Also generate a `rbac-map.json` file containing roles, resource IDs, and action IDs with their assigned roles

API Story:
[Insert story text or attach file]