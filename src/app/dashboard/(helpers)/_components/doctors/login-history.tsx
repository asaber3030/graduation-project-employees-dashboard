import { formatDate } from "@/lib/utils"
import { DoctorLoginHistory } from "@prisma/client"
import { TriangleAlert } from "lucide-react"

import Image from "next/image"

type Props = {
  loginHistory: DoctorLoginHistory[]
}

export const AdminDoctorLoginHistory = ({ loginHistory }: Props) => {
  if (!loginHistory.length) {
    return (
      <p className="text-gray-500 mt-2 px-4 py-2 border rounded-md bg-gray-100 flex gap-2 items-center">
        <TriangleAlert className="size-4" />
        No login history found.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {loginHistory.map((history) => (
        <div
          key={`history-${history.id}`}
          className="flex items-center gap-4 px-2 py-2 rounded-md border"
        >
          <div className="bg-gray-100 p-4 rounded-md flex items-center justify-center">
            <Image src={history.os} width={20} height={20} alt="OS Image" />
          </div>
          <div>
            <p>
              {history.browser} - {history.ip}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium">{history.device}</span>
              <span className="text-gray-500 text-xs">{formatDate(history.createdAt)}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
