# Style Guide: RBAC Annotations in ALPS

## ext block format
Use the ALPS `ext` property to annotate roles in a compliant format:

```json
"ext": [
  { "id": "roles", "value": "user, admin" }
]
```

## Where to place
- Per descriptor (resource or action)
- Top-level `alps.ext` for all known roles

## Do not
- Use invalid fields like `role: "admin"` (must be `id: "roles"`)
- Add `ext` to unrelated elements like `doc`, `href`, etc.
- Include empty role sets