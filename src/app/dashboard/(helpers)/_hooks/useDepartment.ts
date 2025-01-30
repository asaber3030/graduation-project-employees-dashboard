import { useQuery } from "@tanstack/react-query"
import { adminQueryKeys } from "../_utils/query-keys"
import { searchDepartments } from "../_actions/departments"

export function useSearchDepartments(search?: string) {
  const query = useQuery({
    queryKey: adminQueryKeys.departments.search(search),
    queryFn: ({ queryKey }) => searchDepartments(queryKey[2]),
  })

  return {
    departments: query.data,
    isDepartmentsLoading: query.isLoading,
    isDepartmentsError: query.isError,
    isDepartmentsRefetching: query.isRefetching,
    refetchDepartments: query.refetch,
  }
}
