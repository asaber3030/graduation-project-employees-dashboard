import { usernameRegEx, phoneNumberRegEx } from "@/lib/regex"
import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  hospitalId: z.number({ message: "Hospital is required" }).min(0, { message: "Hospital is required" })
})

export const UserSchema = {
  register: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    phone: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: "Phone Number is required" }).regex(usernameRegEx, { message: "Invalid Egyptian Phone Number" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
  }),

  login: z.object({
    phone: z.string().min(1, { message: "Phone number is required" }),
    password: z.string().min(1, { message: "Password is required!" })
  }),

  update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    email: z.string().email().optional(),
    phone: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: "Phone Number is required" }).regex(usernameRegEx, { message: "Invalid Egyptian Phone Number" }).optional()
  }),

  changePassword: z
    .object({
      currentPassword: z.string().min(1, { message: "Current Password is required" }),
      newPassword: z.string().min(8, { message: "Password cannot be less than 8 characters" }),
      confirmationPassword: z.string()
    })
    .refine((data) => data.newPassword === data.confirmationPassword, {
      message: "Passwords don't match",
      path: ["confirmationPassword"]
    })
}

export const AdminSchema = {
  create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }).regex(phoneNumberRegEx, { message: "Invalid Phone Number" }),
    email: z.string().email()
  }),
  update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }).regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).optional(),
    email: z.string().email().optional()
  }),

  login: z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required!" })
  })
}

export const AddressSchema = {
  create: z.object({
    streetName: z.string().max(50, { message: "Street name cannot be more than 50 characters" }).min(1, { message: "Street name cannot be empty" }),
    homeNumber: z.string().max(50, { message: "Home Number cannot be more than 50 characters" }).min(1, { message: "Home Number cannot be empty" }),
    phoneNumber: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: "Phone Number is required" }).regex(usernameRegEx, { message: "Invalid Egyptian Phone Number" }),
    notes: z.string().max(50, { message: "" })
  }),

  update: z.object({
    streetName: z.string().max(50, { message: "Street name cannot be more than 50 characters" }).min(1, { message: "Street name cannot be empty" }).optional(),
    homeNumber: z.string().max(50, { message: "Home Number cannot be more than 50 characters" }).min(1, { message: "Home Number cannot be empty" }).optional(),
    phoneNumber: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: "Phone Number is required" }).regex(usernameRegEx, { message: "Invalid Egyptian Phone Number" }).optional(),
    notes: z.string().max(50, { message: "Notes cannot be more than 50 characters" }).optional()
  })
}

export const HospitalSchema = {
  update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    description: z.string().min(1, { message: "Name is required" }).optional(),
    location: z.string().min(1, { message: "Location is required" }).optional()
  }),
  changePassword: z
    .object({
      currentPassword: z.string().min(1, { message: "Current password is required" }),
      newPassword: z.string().min(8, { message: "New password must be at least 8 characters" }),
      confirmationPassword: z.string().min(1, { message: "Confirmation password is required" })
    })
    .refine((data) => data.newPassword === data.confirmationPassword, {
      message: "Passwords do not match",
      path: ["confirmationPassword"]
    })
}

export const PatientSchema = {
  create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }).regex(phoneNumberRegEx, { message: "Invalid Phone Number" }),
    email: z.string().email(),
    nationalId: z.string().min(14, { message: "National ID is required" }),
    emergencyContactName: z.string().min(1, { message: "Emergency Contact Name is required" }),
    emergencyContactPhone: z.string().min(1, { message: "Phone Number is required" }).regex(phoneNumberRegEx, { message: "Invalid Phone Number" }),
    allergies: z.string().min(1),
    gender: z.enum(["Male", "Female"]),
    maritalStatus: z.enum(["Married", "Single"]),
    birthDate: z.date(),
    age: z.string().min(1, { message: "Age is required" })
  }),
  update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }).regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).optional(),
    email: z.string().email().optional(),
    nationalId: z.string().min(14, { message: "National ID is required" }).optional(),
    emergencyContactName: z.string().min(1, { message: "Emergency Contact Name is required" }).optional(),
    emergencyContactPhone: z.string().min(1, { message: "Phone Number is required" }).regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).optional(),
    allergies: z.string().min(1).optional(),
    gender: z.enum(["Male", "Female"]).optional(),
    maritalStatus: z.enum(["Married", "Single"]).optional(),
    birthDate: z.date().optional(),
    age: z.number({ message: "Age is required" }).gt(0, { message: "Age must be greater than 0" }).optional()
  })
}

export const EmployeeSchema = {
  create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }).regex(phoneNumberRegEx, { message: "Invalid Phone Number" }),
    email: z.string().email(),
    jobTitle: z.string().min(1, { message: "Job Title is required" })
  }),
  update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    username: z.string().min(1, { message: "Username is required" }).optional(),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }).regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).optional(),
    email: z.string().email().optional(),
    jobTitle: z.string().min(1, { message: "Job Title is required" }).optional()
  })
}

export const PrescriptionSchema = {
  create: z.object({
    patientId: z.number().min(1, { message: "Patient is required" }),
    doctorId: z.number().min(1, { message: "Doctor is required" })
  }),
  update: z.object({
    patientId: z.number().min(1, { message: "Patient is required" }).optional(),
    doctorId: z.number().min(1, { message: "Doctor is required" }).optional()
  })
}

export const PrescriptionItemSchema = {
  create: z.object({
    quantity: z.number().min(1, { message: "Quantity is required" }),
    dosage: z.string().min(1, { message: "Dosage is required" }),
    duration: z.string().min(1, { message: "Duration is required" }),
    timesPerDay: z.number().min(1, { message: "Times/Day is required" }).max(24, { message: "Times/Day cannot be more than 24" }),
    notes: z.string().min(1, { message: "Notes is required" })
  }),
  update: z.object({
    quantity: z.number().min(1, { message: "Quantity is required" }).optional(),
    dosage: z.string().min(1, { message: "Dosage is required" }).optional(),
    duration: z.string().min(1, { message: "Duration is required" }).optional(),
    timesPerDay: z.number().min(1, { message: "Times/Day is required" }).max(24, { message: "Times/Day cannot be more than 24" }).optional(),
    notes: z.string().min(1, { message: "Notes is required" }).optional()
  })
}

export const DepartmentSchema = {
  update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    description: z.string().min(1, { message: "Description is required" }).optional()
  }),
  create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" })
  })
}

export const InventorySchema = {
  update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    description: z.string().min(1, { message: "Description is required" }).optional(),
    code: z.string().min(1, { message: "Code is required" }).optional()
  }),
  create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    code: z.string().min(1, { message: "Code is required" })
  })
}

export const DoctorSchema = {
  create: z.object({
    username: z.string().min(1, { message: "Username is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
    jobTitle: z.string().min(1, { message: "Job Title is required" }),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }).regex(phoneNumberRegEx, { message: "Invalid Phone Number" })
  }),
  update: z.object({
    username: z.string().min(1, { message: "Username is required" }).optional(),
    name: z.string().min(1, { message: "Name is required" }).optional(),
    jobTitle: z.string().min(1, { message: "Job Title is required" }).optional(),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }).regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).optional().optional(),
    email: z.string().email().optional()
  }),

  login: z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required!" })
  })
}

export const MedicineSchema = {
  create: z.object({
    enName: z.string().min(1, { message: "English Name is required" }),
    arName: z.string().min(1, { message: "Arabic Name is required" }),
    enDescription: z.string().min(1, { message: "English Description is required" }),
    arDescription: z.string().min(1, { message: "Arabic Description is required" }),
    activeIngredients: z.string().min(1, { message: "Active Ingredients is required" }),
    totalTablets: z.number().min(1, { message: "Total Tablets is required" }),
    bgColor: z.string().min(1, { message: "Background Color is required" }).optional(),
    textColor: z.string().min(1, { message: "Text Color is required" }).optional(),
    notes: z.string().min(1, { message: "Notes is required" }).optional(),
    concentration: z.string().min(1, { message: "Concentration is required" }).optional(),
    price: z.number().min(1, { message: "Price is required" }),
    numberOfTape: z.number().min(1, { message: "Number of Tape is required" }).optional(),
    numberOfPillsPerTape: z.number().min(1, { message: "Number of Pills be Tap is required" }).optional()
  }),

  update: z.object({
    enName: z.string().min(1, { message: "English Name is required" }).optional(),
    arName: z.string().min(1, { message: "Arabic Name is required" }).optional(),
    enDescription: z.string().min(1, { message: "English Description is required" }).optional(),
    arDescription: z.string().min(1, { message: "Arabic Description is required" }).optional(),
    activeIngredients: z.string().min(1, { message: "Active Ingredients is required" }).optional(),
    totalTablets: z.number().min(1, { message: "Total Tablets is required" }).optional(),
    bgColor: z.string().min(1, { message: "Background Color is required" }).optional(),
    textColor: z.string().min(1, { message: "Text Color is required" }).optional(),
    notes: z.string().min(1, { message: "Notes is required" }).optional(),
    concentration: z.string().min(1, { message: "Concentration is required" }).optional(),
    price: z.number().min(1, { message: "Price is required" }).optional(),
    numberOfTape: z.number().min(1, { message: "Number of Tape is required" }).optional(),
    numberOfPillsPerTap: z.number().min(1, { message: "Number of Pills be Tap is required" }).optional()
  })
}

export const PermissionGroupSchema = {
  create: z.object({
    groupName: z.string().min(1, { message: "Group Name is required" }),
    groupCode: z.string().min(1, { message: "Group Code is required" })
  }),
  update: z.object({
    groupName: z.string().min(1, { message: "Group Name is required" }).optional(),
    groupCode: z.string().min(1, { message: "Group Code is required" }).optional()
  })
}
export const PermissionSchema = {
  create: z.object({
    permissionName: z.string().min(1, { message: "Permission Name is required" }),
    permissionCode: z.string().min(1, { message: "Permission Code is required" })
  }),
  update: z.object({
    permissionName: z.string().min(1, { message: "Permission Name is required" }).optional(),
    permissionCode: z.string().min(1, { message: "Permission Code is required" }).optional()
  })
}

export const EmployeePermissionSchema = {
  quickAssign: z.object({
    employeeEmail: z.string().email().min(1, { message: "Employee Email is required" })
  })
}

export const CategorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" })
})

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" })
})
