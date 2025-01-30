import { useQuery } from "@tanstack/react-query"
import { adminQueryKeys } from "../_utils/query-keys"
import { searchPatients } from "../_actions/patients"

export function useSearchPatients(search?: string) {
  const query = useQuery({
    queryKey: adminQueryKeys.patients.search(search),
    queryFn: ({ queryKey }) => searchPatients(queryKey[2]),
  })

  return {
    patients: query.data,
    isPatientsLoading: query.isLoading,
    isPatientsError: query.isError,
    isPatientsRefetching: query.isRefetching,
    refetchPatients: query.refetch,
  }
}
