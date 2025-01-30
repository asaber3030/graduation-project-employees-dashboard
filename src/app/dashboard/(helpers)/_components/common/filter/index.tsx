import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"
import { SearchFilter } from "./search"
import { OrderBy, SearchParams } from "@/types"
import { OrderTypeFilter } from "./order-type"
import { OrderByFilter } from "./order-by"
import { LimitFilter } from "./limit"

type Props = {
  showSearch?: boolean
  showOrderBy?: boolean
  showOrderType?: boolean
  showLimit?: boolean
  parentClassName?: ClassValue
  searchParams: SearchParams
  orderByArray: OrderBy[]
}

export default function FilterAll({
  showSearch = true,
  showOrderBy = true,
  showOrderType = true,
  showLimit = true,
  parentClassName,
  searchParams,
  orderByArray,
}: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-6 justify-between items-center w-full gap-8 mb-4",
        parentClassName
      )}
    >
      <div className="col-span-2">{showSearch && <SearchFilter searchParams={searchParams} />}</div>
      <div className="col-span-4">
        <div className="grid col-span-3 grid-cols-3 gap-2 items-center">
          {showOrderType && <OrderTypeFilter searchParams={searchParams} />}
          {showOrderBy && <OrderByFilter orderByArray={orderByArray} searchParams={searchParams} />}
          {showLimit && <LimitFilter searchParams={searchParams} />}
        </div>
      </div>
    </div>
  )
}
