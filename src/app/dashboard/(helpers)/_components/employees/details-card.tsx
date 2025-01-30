"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Hash, Mail, Phone, User } from "lucide-react"
import { ATFullEmployee } from "../../_types"

import { formatDate } from "@/lib/utils"

type Props = {
  employee: ATFullEmployee
}

export function AdminEmployeeDetailsCard({ employee }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="size-14">
          <AvatarImage alt={employee.name} src={employee.image} />
          <AvatarFallback>
            {employee.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{employee.name}</CardTitle>
          <CardDescription>{employee.jobTitle}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 justify-between gap-2">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 opacity-70" />
          <span>{employee.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 opacity-70" />
          <span>{employee.phoneNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 opacity-70" />
          <span>
            Employee ID: <b>#{employee.id}</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 opacity-70" />
          <span>
            Username: <b>@{employee.username}</b>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 opacity-70" />
          <span>
            Created at: <b>{formatDate(employee.createdAt)}</b>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 opacity-70" />
          <span>
            Last Update: <b>{formatDate(employee.updatedAt)}</b>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
