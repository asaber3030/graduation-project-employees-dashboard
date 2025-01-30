export const adminQueryKeys = {
  medicine: {
    search: (search?: string) => ["admin", "medicine", search],
  },
  departments: {
    search: (search?: string) => ["admin", "departments", search],
  },
  doctors: {
    search: (search?: string) => ["admin", "doctors", search],
  },
  patients: {
    search: (search?: string) => ["admin", "patients", search],
  },
  inventories: {
    search: (search?: string) => ["admin", "inventories", search],
  },
  permissionGroups: {
    find: (id: number) => ["admin", "permission-groups", id],
    permissions: (id: number) => ["admin", "permission-groups", id, "permissions"],
    findPermission: (id: number, permissionId: number) => [
      "admin",
      "permission-groups",
      id,
      "permissions",
      permissionId,
    ],
  },
  permissions: {
    find: (id: number) => ["admin", "permissions", id],
  },
}
