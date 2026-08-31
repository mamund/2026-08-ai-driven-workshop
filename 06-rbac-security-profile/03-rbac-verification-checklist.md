# RBAC Profile Verification Checklist

## Roles
- [ ] All roles used in actions/resources are predefined
- [ ] No orphan (unused) roles in the definition
- [ ] No undefined roles referenced anywhere

## Resources
- [ ] Every resource defines AllowedRoles
- [ ] Only valid roles are used
- [ ] All resources are listed in the access matrix

## Actions
- [ ] Every action defines AllowedRoles
- [ ] Only valid roles are used
- [ ] Action type is valid (Safe, Unsafe, Idempotent, Delete)

## Format and Structure
- [ ] No duplicate entries
- [ ] Consistent formatting of role names
- [ ] Markdown output contains required sections

## RBAC Map (rbac-map.json)
- [ ] Includes all declared roles
- [ ] All entries match identifiers from the API Story
- [ ] No undefined or mismatched roles, resources, or actions