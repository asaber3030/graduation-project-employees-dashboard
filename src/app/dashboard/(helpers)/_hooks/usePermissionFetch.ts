import { useQuery } from "@tanstack/react-query"
import { adminQueryKeys } from "../_utils/query-keys"
import { getPermissionGroupById } from "../_actions/permissions-groups"
import { getPermissionById, getPermissionsByGroupId } from "../_actions/permissions"

export function usePermissionGroup(id: number) {
  const query = useQuery({
    queryKey: adminQueryKeys.permissionGroups.find(id),
    queryFn: () => getPermissionGroupById(id),
  })

  return {
    group: query.data,
    isGroupLoading: query.isLoading,
    isGroupError: query.isError,
  }
}

export function useGroupPermissions(id: number) {
  const query = useQuery({
    queryKey: adminQueryKeys.permissionGroups.permissions(id),
    queryFn: () => getPermissionsByGroupId(id),
  })

  return {
    permissions: query.data,
    isPermissionsLoading: query.isLoading,
    isPermissionsError: query.isError,
  }
}

export function usePermission(id: number) {
  const query = useQuery({
    queryKey: adminQueryKeys.permissions.find(id),
    queryFn: () => getPermissionById(id),
  })

  return {
    permission: query.data,
    isPermissionLoading: query.isLoading,
    isPermissionError: query.isError,
  }
}
