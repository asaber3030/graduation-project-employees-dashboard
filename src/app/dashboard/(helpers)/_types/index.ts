import {
  Prescription,
  Doctor,
  Patient,
  PatientMedication,
  Medicine,
  PatientVaccination,
  PrescriptionItem,
  Hospital,
  Department,
  Inventory,
  Employee,
  DosageForm,
  ResourcePermissionGroup,
  ResourcePermission,
  EmployeePermission,
} from "@prisma/client"

export type ATFullPrescritpion = Prescription & {
  doctor: Doctor
  patient: Patient
  hospital: Hospital
  _count: {
    items: number
  }
}

export type ATFullDepartment = Department & {
  hospital: Hospital
}

export type ATFullInventory = Inventory & {
  hospital: Hospital
  department: Department
}

export type ATFullPatientMedication = PatientMedication & {
  patient: Patient
  medicine: Medicine
}

export type ATFullPatientVaccination = PatientVaccination & {
  patient: Patient
}

export type ATFullPrescriptionItem = PrescriptionItem & {
  medicine: Medicine
}

export type ATFullDoctor = Doctor & {
  department: Department
  hospital: Hospital
}

export type ATFullEmployee = Employee & {
  department: Department
  hospital: Hospital
}

export type ATFullMedicine = Medicine & {
  hospital: Hospital
  dosageForm: DosageForm
  inventory: Inventory
}

export type ATFullPermissionGroup = ResourcePermissionGroup & {
  permissions: ResourcePermission[]
}

export type ATFullPermission = ResourcePermission & {
  _count: {
    employeePermission: number
  }
}

export type ATFullEmployeePermission = EmployeePermission & {
  employee: Employee
  permission: ResourcePermission
}

export type CreateNotificationEntry = {
  title: string
  description?: string
  url?: string
}
