"use server"

import bcrypt from "bcrypt"
import db from "@/services/prisma"

import { CreateNotificationEntry } from "../_types"
import { Employee, Prisma } from "@prisma/client"
import { EmployeeSchema } from "@/schema"
import { SearchParams } from "@/types"

import { actionResponse, responseCodes } from "@/lib/api"
import { createPagination } from "@/lib/utils"
import { currentHospital } from "@/actions/app"
import { revalidatePath } from "next/cache"
import { employeesRoutes } from "../_utils/routes"
import { z } from "zod"

export async function notifyEmployee(data: CreateNotificationEntry, employeeId: number) {
  await db.employeeNotification.create({
    data: {
      ...data,
      employeeId
    }
  })
}

export async function findEmployee(record: Prisma.EmployeeWhereUniqueInput) {
  const employee = await db.employee.findUnique({
    where: record,
    include: { hospital: true, department: true }
  })
  return employee
}

export async function findFirstEmployee(record: Prisma.EmployeeFindFirstArgs) {
  const employee = await db.employee.findFirst(record)
  if (!employee) return null
  const { password, ...rest } = employee
  return rest as Employee
}

export async function getEmployeePermissions(employeeId: number) {
  const permissions = await db.resourcePermissionGroup.findMany({
    include: {
      permissions: {
        include: {
          employeePermission: {
            where: { employeeId }
          }
        }
      }
    }
  })
  return permissions
}

export async function grantAllPermissionsToEmployee(employeeId: number) {
  const permissions = await db.resourcePermission.findMany()
  permissions.forEach(async (permission) => {
    const hasThisPermission = await db.employeePermission.findFirst({
      where: { employeeId, permissionId: permission.id }
    })
    if (!hasThisPermission) {
      await db.employeePermission.create({
        data: {
          employeeId,
          permissionId: permission.id
        }
      })
    }
  })

  revalidatePath(employeesRoutes.employees.employeePermissions(employeeId))
  return actionResponse(responseCodes.ok, "All Permissions granted successfully")
}

export async function removeAllPermissionsFromEmployee(employeeId: number) {
  const permissions = await db.resourcePermission.findMany()
  permissions.forEach(async (permission) => {
    const hasThisPermission = await db.employeePermission.findFirst({
      where: { employeeId, permissionId: permission.id }
    })
    if (hasThisPermission) {
      await db.employeePermission.deleteMany({
        where: {
          employeeId
        }
      })
    }
  })

  revalidatePath(employeesRoutes.employees.employeePermissions(employeeId))
  return actionResponse(responseCodes.ok, "All Permissions Removed successfully")
}

export async function grantAllPermissionGroupToEmployee(employeeId: number, groupId: number) {
  const permissions = await db.resourcePermission.findMany({
    where: { groupId }
  })
  permissions.forEach(async (permission) => {
    const hasThisPermission = await db.employeePermission.findFirst({
      where: { employeeId, permissionId: permission.id }
    })
    if (!hasThisPermission) {
      await db.employeePermission.create({
        data: {
          employeeId,
          permissionId: permission.id
        }
      })
    }
  })

  revalidatePath(employeesRoutes.employees.employeePermissions(employeeId))
  return actionResponse(responseCodes.ok, "Permissions granted successfully")
}

export async function removeAllPermissionGroupFromEmployee(employeeId: number, groupId: number) {
  const permissions = await db.resourcePermission.findMany({
    where: { groupId }
  })
  permissions.forEach(async (permission) => {
    const hasThisPermission = await db.employeePermission.findFirst({
      where: { employeeId, permissionId: permission.id }
    })
    if (hasThisPermission) {
      await db.employeePermission.deleteMany({
        where: {
          employeeId,
          permissionId: permission.id
        }
      })
    }
  })

  revalidatePath(employeesRoutes.employees.employeePermissions(employeeId))
  return actionResponse(responseCodes.ok, "Permissions granted successfully")
}

export async function grantPermissionToEmployee(employeeId: number, permissionId: number) {
  const hasThisPermission = await db.employeePermission.findFirst({
    where: { employeeId, permissionId }
  })
  if (hasThisPermission) {
    return actionResponse(responseCodes.ok, "This permission has been assigned already.")
  }

  await db.employeePermission.create({
    data: {
      employeeId,
      permissionId
    }
  })

  revalidatePath(employeesRoutes.employees.employeePermissions(employeeId))
  return actionResponse(responseCodes.ok, "Permissions granted successfully")
}

export async function removePermissionFromEmployee(employeeId: number, permissionId: number) {
  const hasThisPermission = await db.employeePermission.findFirst({
    where: { employeeId, permissionId }
  })
  if (hasThisPermission) {
    await db.employeePermission.deleteMany({
      where: {
        employeeId,
        permissionId
      }
    })
    revalidatePath(employeesRoutes.employees.employeePermissions(employeeId))
    return actionResponse(responseCodes.ok, "Permissions removed successfully")
  }

  return actionResponse(
    responseCodes.ok,
    "This permission hasn't been assigned to selected employee."
  )
}

export async function paginateEmployees(searchParams: SearchParams, hospitalId?: number) {
  const total = await db.employee.count()
  const pagination = createPagination(searchParams, total)

  const where: Prisma.EmployeeWhereInput = {
    OR: [{ name: { contains: searchParams.search ?? "" } }]
  }

  if (hospitalId) {
    where.hospitalId = hospitalId
  }

  const employees = await db.employee.findMany({
    where,
    include: {
      department: true,
      hospital: true
    },
    ...pagination.args
  })

  return {
    employees,
    ...pagination
  }
}

export async function paginateEmployeesByDepartment(
  searchParams: SearchParams,
  departmentId: number
) {
  const total = await db.employee.count()
  const pagination = createPagination(searchParams, total)

  const where: Prisma.EmployeeWhereInput = {
    OR: [{ name: { contains: searchParams.search ?? "" } }],
    departmentId
  }

  const employees = await db.employee.findMany({
    where,
    include: {
      department: true,
      hospital: true
    },
    ...pagination.args
  })

  return {
    employees,
    ...pagination
  }
}

export async function updateEmployeeAction(
  id: number,
  departmentId: number,
  data: z.infer<typeof EmployeeSchema.update>
) {
  if (data.email) {
    const emailExists = await findFirstEmployee({
      where: {
        email: data.email,
        id: { not: id }
      }
    })
    if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists")
  }

  if (data.phoneNumber) {
    const phoneExists = await findFirstEmployee({
      where: {
        phoneNumber: data.phoneNumber,
        id: { not: id }
      }
    })
    if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone Number already exists")
  }

  if (data.username) {
    const usernameExists = await findFirstEmployee({
      where: {
        username: data.username,
        id: { not: id }
      }
    })
    if (usernameExists) return actionResponse(responseCodes.badRequest, "Username already exists")
  }

  await db.employee.update({
    where: { id },
    data: {
      ...data,
      departmentId
    }
  })

  revalidatePath(employeesRoutes.employees.root)
  revalidatePath(employeesRoutes.employees.update(id))
  return actionResponse(responseCodes.ok, "Employee updated successfully")
}

export async function createEmployeeAction(
  departmentId: number,
  data: z.infer<typeof EmployeeSchema.create>
) {
  const hospital = await currentHospital()

  const emailExists = await findEmployee({ email: data.email })
  if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists")

  const phoneExists = await findEmployee({ phoneNumber: data.phoneNumber })
  if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone Number already exists")

  const hashedPassword = await bcrypt.hash(data.password, 10)

  await db.employee.create({
    data: {
      ...data,
      departmentId,
      hospitalId: hospital.id,
      password: hashedPassword
    }
  })

  revalidatePath(employeesRoutes.employees.root)
  return actionResponse(responseCodes.ok, "Employee created successfully")
}

export async function deleteEmployeeAction(id: number) {
  try {
    const deletedEmployee = await db.employee.delete({
      where: { id }
    })
    return actionResponse(200, "Employee has been deleted.")
  } catch (error) {
    return actionResponse(400, "Failed to delete.")
  }
}
