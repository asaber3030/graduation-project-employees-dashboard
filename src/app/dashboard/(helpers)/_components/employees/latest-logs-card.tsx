"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar } from "lucide-react"
import { EmployeeLog } from "@prisma/client"

import { diffForHuman } from "@/lib/utils"
import { EmptyState } from "@/components/common/empty-state"

type Props = {
  logs: EmployeeLog[]
}

export const AdminEmployeeLatestLogsCard = ({ logs }: Props) => {
  if (logs.length === 0) return <EmptyState />

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Employee Latest Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 opacity-70" />
                    {diffForHuman(log.createdAt)}
                  </div>
                </TableCell>
                <TableCell>{log.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
