import db from "@/services/prisma"

import { RemoveAllPermissionsGroupButton } from "./remove-all-permissions-group-button"
import { GrantAllPermissionsGroupButton } from "./grant-all-permissions-group-button"
import { EmployeeSinglePermissionItem } from "./single-permission-item"
import { ATFullPermissionGroup } from "../../../_types"
import { Button } from "@/components/ui/button"

type Props = {
  group: ATFullPermissionGroup
  employeeId: number
}

export const AdminResourcePermissionGroupForEmployee = ({ employeeId, group }: Props) => {
  return (
    <section className="py-2 border px-4 rounded-md shadow-sm">
      <div className="flex justify-between items-center pb-2 border-b">
        <div>
          <h2 className="text-2xl font-normal">
            Group Permission <span className="font-semibold">{group.groupName}</span>
          </h2>
          <p className="text-sm text-gray-500">{group.permissions.length} permissions</p>
        </div>
        {group.permissions.length > 0 && (
          <div className="flex gap-2">
            <GrantAllPermissionsGroupButton
              group={group}
              employeeId={employeeId}
              groupId={group.id}
            >
              <Button className="mt-2" variant="outline">
                Grant All Permissions
              </Button>
            </GrantAllPermissionsGroupButton>

            <RemoveAllPermissionsGroupButton
              group={group}
              employeeId={employeeId}
              groupId={group.id}
            >
              <Button className="mt-2 text-red-500 hover:text-red-500" variant="outline">
                Remove Permissions
              </Button>
            </RemoveAllPermissionsGroupButton>
          </div>
        )}
      </div>

      <ul className=" mt-2 space-y-2">
        {group.permissions.length === 0 && (
          <li className="text-sm text-gray-500 border py-1 px-2 rounded-md w-full">
            No permissions
          </li>
        )}

        {group.permissions.map(async (permission) => {
          const hasPermission = await db.employeePermission.findFirst({
            where: {
              employeeId,
              permissionId: permission.id,
            },
          })
          return (
            <EmployeeSinglePermissionItem
              key={`permission-${permission.id}`}
              employeeId={employeeId}
              permission={permission}
              hasPermission={!!hasPermission}
            />
          )
        })}
      </ul>
    </section>
  )
}
