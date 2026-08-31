# Verification Rules: ALPS with RBAC

## Descriptor-level checks
- [ ] Every descriptor in alias-map exists in ALPS
- [ ] Every descriptor has exactly one `ext: { id: "roles", value: ... }`
- [ ] No descriptors use undefined roles

## Global checks
- [ ] All roles in rbac-map appear in top-level `alps.ext`
- [ ] ALPS JSON validates against ALPS schema
- [ ] No duplicate `ext: "roles"` entries

## Logging
- [ ] Warn if alias-map action/resource has no match in ALPS
- [ ] Warn if rbac-map roles are unused