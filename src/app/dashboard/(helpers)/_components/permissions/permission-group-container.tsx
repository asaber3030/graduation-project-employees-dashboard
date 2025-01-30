import Link from "next/link"
import type { ATFullPermissionGroup } from "../../_types"
import { AdminCreatePermissionModal } from "./create-permission-modal"
import { Button } from "@/components/ui/button"
import { Cog, Eye, Plus } from "lucide-react"
import { employeesRoutes } from "../../_utils/routes"
import { AdminUpdatePermissionGroupModal } from "./update-permission-group-modal"
import { LinkBtn } from "@/components/common/link-btn"

type Props = {
  permissionGroup: ATFullPermissionGroup
}

export const PermissionGroupContainer = ({ permissionGroup }: Props) => {
  return (
    <div className='border rounded-md'>
      <section className='flex justify-between items-center pb-2 border-b mb-2 bg-gray-50 py-2 px-4'>
        <Link
          href={employeesRoutes.permissions.view(permissionGroup.id)}
          className='text-xl font-semibold flex items-center gap-2 hover:underline hover:text-blue-500'
        >
          {permissionGroup.groupName}
          <span className='text-gray-500 text-xs'>
            ({permissionGroup.permissions.length} permissions)
          </span>
        </Link>

        <div className='flex gap-2 items-center'>
          <AdminCreatePermissionModal asChild groupId={permissionGroup.id}>
            <Button icon={Plus} variant='outline'>
              Create Permission
            </Button>
          </AdminCreatePermissionModal>
          <AdminUpdatePermissionGroupModal group={permissionGroup} asChild>
            <Button icon={Cog} variant='outline'>
              Update
            </Button>
          </AdminUpdatePermissionGroupModal>
          <LinkBtn
            icon={Eye}
            variant='outline'
            href={employeesRoutes.permissions.view(permissionGroup.id)}
          >
            View
          </LinkBtn>
        </div>
      </section>

      <section className='py-2 px-4'>
        {permissionGroup.permissions.length > 0 ? (
          <ul className='space-y-2'>
            {permissionGroup.permissions.map((permission) => (
              <li key={`permission-${permission.id}`}>
                <Link
                  className='flex items-center hover:underline hover:text-blue-500'
                  href={employeesRoutes.permissions.viewPermission(
                    permission.groupId,
                    permission.id
                  )}
                >
                  <span className='text-sm font-semibold'>{permission.permissionName}</span>
                  <span className='text-xs text-gray-500 ml-2'>{permission.permissionCode}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm text-gray-500'>No permissions available.</p>
        )}
      </section>
    </div>
  )
}
