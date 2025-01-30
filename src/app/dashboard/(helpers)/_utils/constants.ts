import {
  Box,
  BriefcaseMedical,
  HospitalIcon,
  LayoutPanelTop,
  NotepadTextDashed,
  Paperclip,
  Pickaxe,
  Pill,
  Syringe,
  Users,
} from "lucide-react"

export const ADMIN_COOKIE_NAME = "admin_token"
export const ADMIN_COOKIE_HOSPITAL_ID = "admin_hospital_id"

export const adminGlobalIcons = {
  patients: Users,
  hospital: HospitalIcon,
  departments: LayoutPanelTop,
  doctors: BriefcaseMedical,
  employees: Pickaxe,
  inventories: Box,
  prescriptions: NotepadTextDashed,
  medicine: Pill,
  vaccinations: Syringe,
  examinationForms: Paperclip,
}
