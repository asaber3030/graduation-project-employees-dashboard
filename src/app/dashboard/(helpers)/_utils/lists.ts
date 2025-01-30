import {
  Box,
  BriefcaseBusiness,
  BriefcaseMedical,
  CheckCheck,
  Cog,
  DollarSign,
  File,
  Home,
  HospitalIcon,
  LayoutPanelTop,
  Lock,
  LockKeyhole,
  MailPlus,
  NotepadTextDashed,
  Pickaxe,
  Plus,
  Syringe,
  User,
  UserPlus,
  Users,
  Workflow
} from "lucide-react"

import { v4 } from "uuid"
import { employeesRoutes } from "./routes"

export const adminSidebarGroups = [
  {
    id: v4(),
    name: "Application",
    items: [
      {
        id: v4(),
        label: "Dashboard",
        url: employeesRoutes.dashboard.root,
        icon: Home,
        hasItems: false,
        items: []
      },
      {
        id: v4(),
        label: "Hospitals",
        url: employeesRoutes.hospitals.root,
        icon: HospitalIcon,
        hasItems: false,
        items: []
      },
      {
        id: v4(),
        label: "Resource Permissions",
        url: employeesRoutes.permissions.root,
        icon: LockKeyhole,
        hasItems: false,
        items: []
      },
      {
        id: v4(),
        label: "Admins",
        url: employeesRoutes.admins.root,
        icon: Lock,
        hasItems: false,
        items: []
      },
      {
        id: v4(),
        label: "Patients",
        url: employeesRoutes.patients.root,
        icon: Users,
        hasItems: false,
        items: []
      },
      {
        id: v4(),
        label: "Doctors",
        url: employeesRoutes.doctors.root,
        icon: BriefcaseMedical,
        hasItems: false,
        items: []
      },
      {
        id: v4(),
        label: "Medicine",
        url: employeesRoutes.medicine.root,
        icon: Syringe,
        hasItems: false,
        items: []
      },
      {
        id: v4(),
        label: "Employees",
        url: employeesRoutes.employees.root,
        icon: Pickaxe,
        hasItems: false,
        items: []
      },
      {
        id: v4(),
        label: "Departments",
        url: employeesRoutes.departments.root,
        icon: LayoutPanelTop,
        hasItems: false,
        items: []
      },
      {
        id: v4(),
        label: "Inventories",
        url: employeesRoutes.inventories.root,
        icon: Box,
        hasItems: false,
        items: []
      },
      {
        id: v4(),
        label: "Prescriptions",
        url: employeesRoutes.prescriptions.root,
        icon: NotepadTextDashed,
        hasItems: false,
        items: []
      }
    ]
  },

  {
    id: v4(),
    name: "Settings",
    items: [
      {
        id: v4(),
        label: "Profile",
        url: `/admin/profile`,
        icon: User
      }
    ]
  }
]

export const adminDashboardShortcuts = [
  {
    id: v4(),
    label: "Add User",
    icon: UserPlus,
    url: "/"
  },
  {
    id: v4(),
    label: "Add Exam",
    icon: Plus,
    url: "/"
  },
  {
    id: v4(),
    label: "Send E-mails",
    icon: MailPlus,
    url: "/"
  },
  {
    id: v4(),
    label: "View Subscriptions",
    icon: DollarSign,
    url: "/"
  },
  {
    id: v4(),
    label: "App Settings",
    icon: Cog,
    url: "/"
  },
  {
    id: v4(),
    label: "Create Sheets",
    icon: File,
    url: "/"
  },
  {
    id: v4(),
    label: "Careers",
    icon: BriefcaseBusiness,
    url: "/"
  },
  {
    id: v4(),
    label: "Create Category",
    icon: Plus,
    url: "/"
  },
  {
    id: v4(),
    label: "Create Level",
    icon: Plus,
    url: "/"
  },
  {
    id: v4(),
    label: "Plan Control",
    icon: CheckCheck,
    url: "/"
  },
  {
    id: v4(),
    label: "Plan Control",
    icon: CheckCheck,
    url: "/"
  },
  {
    id: v4(),
    label: "Plan Control",
    icon: CheckCheck,
    url: "/"
  },
  {
    id: v4(),
    label: "Plan Control",
    icon: CheckCheck,
    url: "/"
  },
  {
    id: v4(),
    label: "Plan Control",
    icon: CheckCheck,
    url: "/"
  }
]
