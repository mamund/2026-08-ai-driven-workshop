# Task Management API – RBAC Security Profile

## Declared Roles

| Role  | Description                                                |
|-------|------------------------------------------------------------|
| anon  | Unauthenticated visitor (read-only, limited views)         |
| user  | Authenticated end-user with basic task interaction privileges |
| admin | Elevated privileges for managing tasks and assignments     |

## Resource Access Matrix

| Resource        | Allowed Roles     |
|----------------|-------------------|
| Home           | anon, user, admin |
| TaskCollection | user, admin       |
| TaskItem       | user, admin       |

## Action Access Matrix

| Action                   | Type       | Allowed Roles     |
|--------------------------|------------|-------------------|
| AssignUserToTask         | Idempotent | admin             |
| CreateNewTask            | Unsafe     | user, admin       |
| EditExistingTask         | Unsafe     | user, admin       |
| GetFilteredTaskCollection| Safe       | user, admin       |
| GetTaskCollection        | Safe       | user, admin       |
| GetTaskItem              | Safe       | user, admin       |
| SetDueDateOfTask         | Idempotent | admin             |
| ShowHomePage             | Safe       | anon, user, admin |
| UpdateStatusOfTask       | Idempotent | user, admin       |

## Verification Summary

- ✅ All roles used in actions and resources are defined.
- ✅ No undefined roles were found in the policy.
- ✅ No orphan roles detected: every role is used in at least one context.
- ✅ All resources specify valid AllowedRoles.
- ✅ All actions specify valid AllowedRoles and valid action types.
- ✅ Markdown sections and format comply with security documentation standards.
