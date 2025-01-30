import { PaginatePrevious } from "./pagination/paginate-previous"
import { PaginateNext } from "./pagination/paginate-next"
import { SearchParams } from "@/types"

type Props = {
  hasNextPage: boolean
  searchParams: SearchParams
}

export const DefaultTableFooter = ({ searchParams, hasNextPage }: Props) => {
  return (
    <div className="flex gap-2 justify-end my-2 w-full">
      <PaginatePrevious searchParams={searchParams} />
      <PaginateNext searchParams={searchParams} disabled={hasNextPage} />
    </div>
  )
}
