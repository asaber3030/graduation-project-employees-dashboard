import { ResourcePermission } from "@prisma/client"
import { AdminRemoveSinglePermissionToEmployee } from "./remove-single-permissions-button"
import { AdminGrantSinglePermissionToEmployee } from "./grant-single-permissions-button"

type Props = {
  permission: ResourcePermission
  employeeId: number
  hasPermission: boolean
}

export const EmployeeSinglePermissionItem = ({ permission, employeeId, hasPermission }: Props) => {
  const Component = hasPermission
    ? AdminRemoveSinglePermissionToEmployee
    : AdminGrantSinglePermissionToEmployee

  return (
    <Component permission={permission} permissionId={permission.id} employeeId={employeeId}>
      <li
        key={`permission-employee-${permission.id}`}
        className="min-w-[260px] cursor-pointer p-1 px-2 capitalize rounded-md flex items-center justify-between gap-2 font-medium text-sm transition-all hover:border-primary text-black hover:bg-gray-100"
      >
        <div className="flex items-center gap-2 font-medium text-sm">
          {permission.permissionName}
        </div>
        <div className="text-xs font-normal">
          {hasPermission ? (
            <span className="text-green-600">Granted</span>
          ) : (
            <span className="text-orange-600">Not Granted</span>
          )}
        </div>
      </li>
    </Component>
  )
}
