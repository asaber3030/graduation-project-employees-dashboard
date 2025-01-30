// https://techmed-employees.vercel.app/api
// http://localhost:3000/api

export const API_URL = "https://techmed-employees.vercel.app/api"
export const COOKIE_NAME = "techmed-employee-token"
export const defaultExpirationToken = Date.now() + 24 * 60 * 60 * 1000 * 30
export const userImagePlaceholder = `/logo.png`
export const medicineImagePlaceholder = `/defaults/medicine-placeholder.jpeg`

export const resourcesIcons = {
  patients: "/defaults/resources/patients.svg",
  doctors: "/defaults/resources/doctors.svg",
  departments: "/defaults/resources/departments.svg",
  employees: "/defaults/resources/employees.svg",
  inventories: "/defaults/resources/inventories.svg",
  medicine: "/defaults/resources/medicine.svg",
  prescriptions: "/defaults/resources/prescriptions.svg",
  vaccinations: "/defaults/resources/vaccinations.svg",
  invoices: "/defaults/resources/invoices.svg",
  permissions: "/defaults/resources/permissions.svg",
  logs: "/defaults/resources/logs.svg"
}

export const osIcons = {
  windows: "/defaults/os/windows.svg",
  linux: "/defaults/os/linux.svg",
  macos: "/defaults/os/mac.svg",
  android: "/defaults/os/android.svg",
  ios: "/defaults/os/ios.svg"
}
