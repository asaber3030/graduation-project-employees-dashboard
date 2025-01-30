import { formatNumber } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

import Link from "next/link"

type Props = {
  num: number
  label: string
  href: string
  icon: LucideIcon
}

export const URLBox = ({ num, label, href, icon: Icon }: Props) => {
  return (
    <Link
      className="p-4 rounded-md shadow-sm border flex justify-between items-center hover:border-primary transition-colors"
      href={href}
    >
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{label}</p>
        <p className="text-sm mt-2 font-medium">{formatNumber(num)}</p>
      </div>
      <Icon className="text-gray-500" />
    </Link>
  )
}
