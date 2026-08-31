# Checklist: Applying RBAC to ALPS

- [ ] Load `rbac-map.json` and extract global roles, resource/action role mappings
- [ ] Load `alias-map.json` and extract mappings from story names to ALPS descriptor IDs
- [ ] Load original `alps.json` file and index descriptors by ID
- [ ] For each resource in alias-map:
      - [ ] Confirm ID exists in ALPS
      - [ ] Inject `ext: { id: "roles", value: "..." }` from rbac-map
- [ ] For each action in alias-map:
      - [ ] Confirm ID exists in ALPS
      - [ ] Inject `ext: { id: "roles", value: "..." }` from rbac-map
- [ ] Add or update top-level `ext: { id: "roles" }` in the root `alps` block
- [ ] Save updated file as `alps-with-rbac.json`