import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

type Props = { imageURL: string | null }

export const PatientNationalImageCard = ({ imageURL }: Props) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Patient National ID</CardTitle>
      </CardHeader>
      <CardContent>
        <section>
          {imageURL ? (
            <Image
              width={1000}
              height={1000}
              alt="Image"
              src={imageURL}
              className="max-w-full h-[250px] rounded-md object-cover"
            />
          ) : (
            <p className="text-red-500 font-medium">No Image found</p>
          )}
        </section>
      </CardContent>
    </Card>
  )
}
