import { useQuery } from "@tanstack/react-query"
import { adminQueryKeys } from "../_utils/query-keys"
import { searchMedicine } from "../_actions/medicine"

export function useSearchMedicine(search?: string) {
  const query = useQuery({
    queryKey: adminQueryKeys.medicine.search(search),
    queryFn: ({ queryKey }) => searchMedicine(queryKey[2]),
  })

  return {
    medicine: query.data,
    isMedicineLoading: query.isLoading,
    isMedicineError: query.isError,
    isMedicineRefetching: query.isRefetching,
    refetchMedicine: query.refetch,
  }
}
