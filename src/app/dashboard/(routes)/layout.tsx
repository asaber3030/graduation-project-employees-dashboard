import db from "@/services/prisma"

import { EmployeePermissionsProvider } from "../(helpers)/_providers/permissions-provider"
import { HospitalProvider } from "../(helpers)/_providers/hospital-provider"
import { EmployeeProvider } from "../(helpers)/_providers/admin-provider"
import { AdminSidebar } from "../(helpers)/_components/common/sidebar/sidebar"
import { AdminNavbar } from "../(helpers)/_components/common/navbar/navbar"

import { getCurrentEmployee } from "../(helpers)/_actions/auth"
import { employeesRoutes } from "../(helpers)/_utils/routes"
import { currentHospital } from "@/actions/app"
import { redirect } from "next/navigation"

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const employee = await getCurrentEmployee()
  if (!employee) return redirect(employeesRoutes.auth.login)

  const permissions = await db.resourcePermissionGroup.findMany({
    where: {
      permissions: {
        some: {
          employeePermission: {
            some: { employeeId: employee.id }
          }
        }
      }
    }
  })

  const hospital = await currentHospital()

  return (
    <EmployeeProvider employee={employee}>
      <HospitalProvider hospital={hospital}>
        <EmployeePermissionsProvider permissions={permissions}>
          <div className='flex'>
            <AdminSidebar />
            <main className='w-full'>
              <AdminNavbar />
              <div className='xl:pr-7 py-6 px-4'>{children}</div>
            </main>
          </div>
        </EmployeePermissionsProvider>
      </HospitalProvider>
    </EmployeeProvider>
  )
}
