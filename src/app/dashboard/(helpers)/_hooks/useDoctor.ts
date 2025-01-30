import { useQuery } from "@tanstack/react-query"
import { adminQueryKeys } from "../_utils/query-keys"
import { searchDoctors } from "../_actions/doctors"

export function useSearchDoctors(search?: string) {
  const query = useQuery({
    queryKey: adminQueryKeys.doctors.search(search),
    queryFn: ({ queryKey }) => searchDoctors(queryKey[2]),
  })

  return {
    doctors: query.data,
    isDoctorsLoading: query.isLoading,
    isDoctorsError: query.isError,
    isDoctorsRefetching: query.isRefetching,
    refetchDoctors: query.refetch,
  }
}
