import { Skeleton } from "@/components/ui/skeleton"

type Props = {}
export const PageLoadingContent = ({}: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Skeleton className="w-72 h-4 mb-2" />
          <Skeleton className="w-36 h-2 mb-2" />
        </div>
        <Skeleton className="w-24 h-10" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-2 md:grid-cols-4 mb-4">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>

      <div className="mb-4">
        <Skeleton className="w-full h-[450px]" />
      </div>
      <div className="mb-4 flex justify-between">
        <Skeleton className="w-32 h-10" />
        <Skeleton className="w-32 h-10" />
      </div>
    </div>
  )
}
