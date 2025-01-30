import { LucideIcon } from "lucide-react"

import Link from "next/link"

type Props = {
  label: string
  href: string
  icon: LucideIcon
}

export const URLShortcut = ({ label, href, icon: Icon }: Props) => {
  return (
    <Link
      className="p-1.5 rounded-md shadow-sm border hover:border-primary transition-colors flex items-center px-4 gap-2"
      href={href}
    >
      <div className="border-r pr-2">
        <Icon className="text-gray-500 size-4" />
      </div>
      <p className="text-sm font-semibold">{label}</p>
    </Link>
  )
}
