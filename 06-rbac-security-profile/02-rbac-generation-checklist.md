# RBAC Generation Checklist

- [ ] Parse API Story input
- [ ] Extract defined roles
- [ ] Scan all Resources for AllowedRoles
- [ ] Scan all Actions for AllowedRoles
- [ ] Validate all role references are defined
- [ ] Confirm no orphan roles
- [ ] Confirm no undefined roles used
- [ ] Generate clean Markdown report
- [ ] Generate rbac-map.json with roles, resources, and actions
- [ ] Verify consistency between Markdown report and rbac-map.json