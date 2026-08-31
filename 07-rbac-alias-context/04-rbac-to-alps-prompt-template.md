# Prompt Template: Patch ALPS with RBAC

Apply RBAC role access to the following ALPS document using the provided RBAC map and alias map.

Inputs:
- ALPS file (JSON)
- `rbac-map.json`: describes which roles can access which descriptors
- `alias-map.json`: maps Story-style names to ALPS descriptor IDs

Patch descriptors by injecting:

```json
"ext": [{ "id": "roles", "value": "user, admin" }]
```

Also ensure a top-level role list exists:

```json
"ext": [{ "id": "roles", "value": "anon, user, admin" }]
```

Ensure ALPS remains schema-compliant.