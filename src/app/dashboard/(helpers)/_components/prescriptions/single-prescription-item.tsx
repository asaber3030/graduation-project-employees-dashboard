import Link from "next/link"

import { deletePrescriptionItemAction } from "../../_actions/prescriptions"
import { employeesRoutes } from "../../_utils/routes"

import { ATFullPrescriptionItem } from "../../_types"
import { DeleteModal } from "../common/delete-modal"
import { Cog, Trash } from "lucide-react"
import { LinkBtn } from "@/components/common/link-btn"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Props = {
  item: ATFullPrescriptionItem
  index: number
}

export const AdminSinglePrescriptionItem = ({ item, index }: Props) => {
  return (
    <div className='bg-white flex flex-wrap items-center xl:gap-10 gap-2'>
      <div className='flex gap-2 items-center flex-1'>
        <p className='text-gray-500 text-xs'>{index + 1})</p>
        <Link href={employeesRoutes.medicine.view(item.medicineId)} className='text-blue-500'>
          {item.medicine.enName}
        </Link>
      </div>

      <Badge variant='outline' className='font-medium '>
        x{item.timesPerDay} times/day
      </Badge>

      <div className='flex gap-2 items-center pl-4 flex-1'>
        <p className='font-medium'>{item.duration}</p>
      </div>

      <div className='flex gap-2 items-center pl-4 flex-1'>
        <p className='font-medium'>{item.notes}</p>
      </div>

      <div className='flex gap-2'>
        <LinkBtn
          variant='outline'
          icon={Cog}
          href={employeesRoutes.prescriptions.updatePrescrptionItem(item.id)}
        />
        <DeleteModal deletedId={item.id} forceAction={deletePrescriptionItemAction}>
          <Button variant='destructive' icon={Trash} />
        </DeleteModal>
      </div>
    </div>
  )
}
