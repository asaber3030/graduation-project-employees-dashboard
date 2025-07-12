export const employeesRoutes = {
  auth: {
    login: "/login",
    logout: "/logout"
  },
  dashboard: {
    root: "/dashboard"
  },
  hospitals: {
    root: "/dashboard/hospitals",
    create: "/dashboard/hospitals/create",
    update: (hospitalId: number) => `/dashboard/hospitals/${hospitalId}/update`,
    view: (hospitalId: number) => `/dashboard/hospitals/${hospitalId}`,
    employees: (hospitalId: number) => `/dashboard/hospitals/${hospitalId}/employees`,
    inventories: (hospitalId: number) => `/dashboard/hospitals/${hospitalId}/inventories`,
    departments: (hospitalId: number) => `/dashboard/hospitals/${hospitalId}/departments`,
    prescriptions: (hospitalId: number) => `/dashboard/hospitals/${hospitalId}/prescriptions`
  },
  products: {
    root: "/dashboard/products",
    create: "/dashboard/products/create",
    update: (productId: number) => `/dashboard/products/${productId}/update`,
    view: (productId: number) => `/dashboard/products/${productId}`
  },
  categories: {
    root: "/dashboard/categories",
    create: "/dashboard/categories/create",
    update: (categoryId: number) => `/dashboard/categories/${categoryId}/update`,
    view: (categoryId: number) => `/dashboard/categories/${categoryId}`
  },
  orders: {
    root: "/dashboard/orders",
    create: "/dashboard/orders/create",
    update: (orderId: number) => `/dashboard/orders/${orderId}/update`,
    view: (orderId: number) => `/dashboard/orders/${orderId}`
  },

  admins: {
    root: "/dashboard/admins",
    create: "/dashboard/admins/create",
    update: (patientId: number) => `/dashboard/admins/${patientId}/update`,
    view: (patientId: number) => `/dashboard/admins/${patientId}`
  },

  permissions: {
    root: "/dashboard/permissions",
    create: "/dashboard/permissions/create",
    update: (groupId: number) => `/dashboard/permissions/${groupId}/update`,
    view: (groupId: number) => `/dashboard/permissions/${groupId}`,
    viewPermission: (groupId: number, permissionId: number) => `/dashboard/permissions/${groupId}/permissions/${permissionId}`
  },

  patients: {
    root: "/dashboard/patients",
    create: "/dashboard/patients/create",
    update: (patientId: number) => `/dashboard/patients/${patientId}/update`,
    view: (patientId: number) => `/dashboard/patients/${patientId}`,
    patientPrescriptions: (patientId: number) => `/dashboard/patients/${patientId}/prescriptions`,
    patientMedications: (patientId: number) => `/dashboard/patients/${patientId}/medications`,
    patientVaccinations: (patientId: number) => `/dashboard/patients/${patientId}/vaccinations`,
    patientInvoices: (patientId: number) => `/dashboard/patients/${patientId}/invoices`
  },

  doctors: {
    root: "/dashboard/doctors",
    create: "/dashboard/doctors/create",
    update: (patientId: number) => `/dashboard/doctors/${patientId}/update`,
    view: (patientId: number) => `/dashboard/doctors/${patientId}`,
    doctorPrescriptions: (doctorId: number) => `/dashboard/doctors/${doctorId}/prescriptions`,
    doctorMedications: (doctorId: number) => `/dashboard/doctors/${doctorId}/medications`,
    doctorVaccinations: (doctorId: number) => `/dashboard/doctors/${doctorId}/vaccinations`,
    doctorInvoices: (doctorId: number) => `/dashboard/doctors/${doctorId}/invoices`,
    doctorLoginHistory: (doctorId: number) => `/dashboard/doctors/${doctorId}/login-history`
  },
  medicine: {
    root: "/dashboard/medicine",
    create: "/dashboard/medicine/create",
    update: (medicine: number) => `/dashboard/medicine/${medicine}/update`,
    view: (medicine: number) => `/dashboard/medicine/${medicine}`
  },
  employees: {
    root: "/dashboard/employees",
    create: "/dashboard/employees/create",
    update: (employeeId: number) => `/dashboard/employees/${employeeId}/update`,
    view: (employeeId: number) => `/dashboard/employees/${employeeId}`,
    employeePrescriptions: (employeeId: number) => `/dashboard/employees/${employeeId}/prescriptions`,
    employeePermissions: (employeeId: number) => `/dashboard/employees/${employeeId}/permissions`,
    employeeLogs: (employeeId: number) => `/dashboard/employees/${employeeId}/logs`
  },
  departments: {
    root: "/dashboard/departments",

    create: "/dashboard/departments/create",

    update: (departmentId: number) => `/dashboard/departments/${departmentId}/update`,

    view: (departmentId: number) => `/dashboard/departments/${departmentId}`,
    departmentInventories: (departmentId: number) => `/dashboard/departments/${departmentId}/inventories`,
    departmentDoctors: (departmentId: number) => `/dashboard/departments/${departmentId}/doctors`,
    departmentExaminationForms: (departmentId: number) => `/dashboard/departments/${departmentId}/examination-forms`,
    departmentEmployees: (departmentId: number) => `/dashboard/departments/${departmentId}/employees`
  },
  inventories: {
    root: "/dashboard/inventories",
    create: "/dashboard/inventories/create",
    update: (inventoryId: number) => `/dashboard/inventories/${inventoryId}/update`,
    view: (inventoryId: number) => `/dashboard/inventories/${inventoryId}`,
    medicine: (inventoryId: number) => `/dashboard/inventories/${inventoryId}/medicine`
  },
  prescriptions: {
    root: "/dashboard/prescriptions",
    create: "/dashboard/prescriptions/create",
    update: (prescriptionId: number) => `/dashboard/prescriptions/${prescriptionId}/update`,
    view: (prescriptionId: number) => `/dashboard/prescriptions/${prescriptionId}`,
    createPrescrptionItem: (prescriptionId: number) => `/dashboard/prescriptions/${prescriptionId}/create-item`,

    updatePrescrptionItem: (prescriptionId: number) => `/dashboard/prescriptions/${prescriptionId}/items/${prescriptionId}`
  }
}
