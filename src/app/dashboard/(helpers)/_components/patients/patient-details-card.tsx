import { Patient } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { formatDate } from "@/lib/utils"

type Props = { patient: Patient }

export const PatientDetailsCard = ({ patient }: Props) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Patient Details</CardTitle>
        <CardDescription>This card contains patient personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <section>
          <ul className="divide-y">
            <li className="flex items-center justify-between py-1">
              <span className="font-medium">National ID</span> <span>{patient.nationalId}</span>
            </li>
            <li className="flex items-center justify-between py-1">
              <span className="font-medium">E-mail</span>
              <span>{patient.email}</span>
            </li>
            <li className="flex items-center justify-between py-1">
              <span className="font-medium">Phone Number</span>
              <span>{patient.phoneNumber}</span>
            </li>
            <li className="flex items-center justify-between py-1">
              <span className="font-medium">Emergency Contact Name</span>
              <span>{patient.emergencyContactName}</span>
            </li>
            <li className="flex items-center justify-between py-1">
              <span className="font-medium">Emergency Contact Phone</span>
              <span>{patient.emergencyContactPhone}</span>
            </li>
            <li className="flex items-center justify-between py-1">
              <span className="font-medium">Gender</span>
              <span>{patient.gender}</span>
            </li>
            <li className="flex items-center justify-between py-1">
              <span className="font-medium">Marital Status</span>
              <span>{patient.maritalStatus}</span>
            </li>
            <li className="flex items-center justify-between py-1">
              <span className="font-medium">Birth Date</span>
              <span>{patient.birthDate ? formatDate(patient.birthDate, "l") : "N/A"}</span>
            </li>
          </ul>
        </section>
      </CardContent>
    </Card>
  )
}
