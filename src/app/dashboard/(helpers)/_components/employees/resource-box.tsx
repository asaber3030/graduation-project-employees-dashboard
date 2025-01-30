import Image from "next/image"
import Link from "next/link"

type Props = {
  num: number
  label: string
  href: string
  image: string
}

export const EmployeeResourceBox = ({ num, label, href, image }: Props) => {
  return (
    <Link
      className="shadow-sm border bg-white rounded-md p-2 px-4 transition-colors hover:border-primary flex gap-4 justify-start items-center"
      href={href}
    >
      <Image src={image} alt="Image" width={25} height={25} />
      <p className="font-medium text-lg flex justify-between w-full">
        {label}
        <span className="text-gray-500">{num}</span>
      </p>
    </Link>
  )
}
