import Image from "next/image"
import Link from "next/link"

type Props = {
  num: number
  label: string
  href: string
  image: string
}

export const PatientResourceBox = ({ num, label, href, image }: Props) => {
  return (
    <Link
      className="shadow-sm border bg-white rounded-md p-4 transition-colors hover:border-primary"
      href={href}
    >
      <Image src={image} alt="Image" width={50} height={50} className="mx-auto" />
      <p className="text-center font-medium text-lg mt-4">
        {label} ({num})
      </p>
    </Link>
  )
}
