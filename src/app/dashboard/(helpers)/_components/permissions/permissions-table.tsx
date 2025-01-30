import { AdminUpdatePermissionModal } from "./update-permission-modal"
import { ATFullPermission } from "../../_types"
import { DeleteModal } from "../common/delete-modal"
import { EmptyState } from "@/components/common/empty-state"
import { Cog, Eye, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { deletePermissionAction } from "../../_actions/permissions"
import { LinkBtn } from "@/components/common/link-btn"
import { employeesRoutes } from "../../_utils/routes"

type Props = {
  permissions: ATFullPermission[]
}

export const AdminPermissionsTable = ({ permissions }: Props) => {
  if (permissions.length === 0) {
    return <EmptyState title='No permissions found' />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Permission Name</TableHead>
          <TableHead>Permission Code</TableHead>
          <TableHead>Assigned to</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions.map((permission) => (
          <TableRow key={`permission-row-${permission.id}`}>
            <TableCell className='font-medium'>{permission.id}</TableCell>
            <TableCell>{permission.permissionName}</TableCell>
            <TableCell>{permission.permissionCode}</TableCell>
            <TableCell>{permission._count.employeePermission} employees</TableCell>
            <TableCell className='flex gap-2'>
              <LinkBtn
                href={employeesRoutes.permissions.viewPermission(permission.groupId, permission.id)}
                variant='outline'
                icon={Eye}
              >
                View
              </LinkBtn>
              <AdminUpdatePermissionModal
                asChild
                permission={permission}
                key={`update-permission-modal-${permission.id}`}
              >
                <Button variant='blue' icon={Cog}>
                  Update
                </Button>
              </AdminUpdatePermissionModal>
              <DeleteModal deletedId={permission.id} forceAction={deletePermissionAction}>
                <Button variant='destructive' icon={Trash}>
                  Delete
                </Button>
              </DeleteModal>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
