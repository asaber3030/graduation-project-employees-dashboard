import { AdminLoginForm } from "@/app/dashboard/(helpers)/_components/auth/login-form"
import { Metadata } from "next"

import { getCurrentEmployee } from "../dashboard/(helpers)/_actions/auth"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { redirect } from "next/navigation"

import EmployeeDashboardHero from "../dashboard/(helpers)/_components/auth/hero"

export const metadata: Metadata = { title: "Admin Login" }

export default async function EmployeeLoginPage() {
  const employee = await getCurrentEmployee()
  if (employee) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <div className='bg-white border shadow-md max-w-screen-lg mx-auto my-20 p-4 rounded-md'>
        <div className='space-y-1'>
          <h1 className='text-2xl font-bold text-center'>Hospital Employee Login</h1>
          <p className='text-center'>Enter your credentials to access the Employee dashboard</p>
        </div>
        <AdminLoginForm />
      </div>

      <EmployeeDashboardHero />
    </div>
  )
}
