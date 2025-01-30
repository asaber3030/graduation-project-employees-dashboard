import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminMedicinePrintButton } from "@/app/dashboard/(helpers)/_components/medicine/print-button"
import { ArrowLeft, Trash, Cog } from "lucide-react"
import { DeleteModal } from "@/app/dashboard/(helpers)/_components/common/delete-modal"
import { LinkBtn } from "@/components/common/link-btn"
import { Button } from "@/components/ui/button"

import { deleteMedicineAction, findMedicine } from "@/app/dashboard/(helpers)/_actions/medicine"
import { medicineImagePlaceholder } from "@/lib/constants"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"

type Props = {
  params: {
    medicineId: string
  }
}

export default async function MedicineIdPage({ params }: Props) {
  const medicineId = +params.medicineId
  const medicine = await findMedicine({ id: medicineId })

  if (!medicine) return notFound()

  const pageTitle = (
    <span>
      Medicine - <b>{medicine?.enName}</b>
    </span>
  )

  return (
    <div className=''>
      <AdminPageTitle title={pageTitle}>
        <AdminMedicinePrintButton />
        <LinkBtn href={employeesRoutes.medicine.update(medicineId)} variant='blue' icon={Cog}>
          Update
        </LinkBtn>
        <DeleteModal asChild deletedId={medicineId} forceAction={deleteMedicineAction}>
          <Button variant='destructive' icon={Trash}>
            Delete
          </Button>
        </DeleteModal>
      </AdminPageTitle>
      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>{medicine.enName}</CardTitle>
            <CardDescription>{medicine.enDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='relative mb-4'>
              <Image
                src={medicine.image ?? medicineImagePlaceholder}
                alt={medicine.enName}
                width={1000}
                height={200}
                className='rounded-lg object-cover w-full h-fit'
              />
            </div>
            <div className='mt-4'>
              <h3 className='font-semibold mb-2'>Barcode</h3>
              <div className='p-2 rounded-md'>
                <Image
                  src={medicine?.barcode as string}
                  alt='Product Barcode'
                  width={1000}
                  height={100}
                  className='w-full h-auto'
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-3xl'>Medicine Details</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div>
              <h3 className='font-semibold mb-2'>Description</h3>
              <p>{medicine.enDescription}</p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <h3 className='font-semibold mb-2'>Dosage Form</h3>
                <p>{medicine.dosageForm.name}</p>
              </div>
              <div>
                <h3 className='font-semibold mb-2'>Strength</h3>
                <p>{medicine.concentration}</p>
              </div>
              <div>
                <h3 className='font-semibold mb-2'>Price</h3>
                <p>${medicine.price.toFixed(2)}</p>
              </div>
              <div>
                <h3 className='font-semibold mb-2'>Number of tapes</h3>
                <p>{medicine.numberOfTape} tap</p>
              </div>
              <div>
                <h3 className='font-semibold mb-2'>Number of Pills per Tape</h3>
                <p>{medicine.numberOfPillsPerTape}</p>
              </div>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Expiry Date</h3>
              <p>{medicine.expirationDate ? formatDate(medicine.expirationDate) : "N/A"}</p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Active Ingredients</h3>
              <p>{medicine.activeIngredients}</p>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>Inventory Code</h3>
              <Link href={employeesRoutes.inventories.view(medicine.inventory.id)}>
                {medicine.inventory.code}
              </Link>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Notes</h3>
              <p>{medicine.notes}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='mt-6 print:hidden'>
        <LinkBtn href={employeesRoutes.medicine.root} variant='outline'>
          <ArrowLeft className='mr-2 h-4 w-4' /> Back to Medicines List
        </LinkBtn>
      </div>
    </div>
  )
}
