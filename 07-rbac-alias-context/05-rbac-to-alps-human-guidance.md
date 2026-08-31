# Human Guidance: RBAC-to-ALPS Enrichment

This process adds role-based access controls to an existing ALPS document using metadata defined in two inputs:

1. `rbac-map.json`: generated automatically from your API Story's RBAC Security Profile
2. `alias-map.json`: created by a human, it connects Story-based names (e.g., `CreateNewTask`) to ALPS descriptor IDs (e.g., `doCreateTask`)

## When to use this
- You're applying RBAC metadata *after* generating your ALPS
- Your ALPS file uses a different naming convention than your API Story

## What you must do
- Review the ALPS descriptor IDs
- Manually complete `alias-map.json` to map Story names to ALPS IDs
- Use the patch tool to apply RBAC role info

## What this enables
- You don’t need to rewrite your API Story or change ALPS generation
- You can retrofit RBAC to legacy or external ALPS profiles
- RBAC roles are embedded in the ALPS metadata for validation, documentation, and downstream use