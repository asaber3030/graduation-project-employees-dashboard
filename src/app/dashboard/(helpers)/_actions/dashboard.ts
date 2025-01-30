"use server"

import db from "@/services/prisma"

export async function tableCounts() {
  const patients = db.patient.count()
  const hospitals = db.hospital.count()
  const doctors = db.doctor.count()
  const medicine = db.medicine.count()
  const employees = db.employee.count()
  const departments = db.department.count()
  const inventories = db.inventory.count()
  const prescriptions = db.prescription.count()

  const data = (await Promise.allSettled([
    patients,
    hospitals,
    doctors,
    medicine,
    employees,
    departments,
    inventories,
    prescriptions,
  ])) as any

  return {
    patients: data[0]?.value,
    hospitals: data[1]?.value,
    doctors: data[2]?.value,
    medicine: data[3]?.value,
    employees: data[4]?.value,
    departments: data[5]?.value,
    inventories: data[6]?.value,
    prescriptions: data[7]?.value,
  }
}
