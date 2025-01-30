import { useQuery } from "@tanstack/react-query"
import { adminQueryKeys } from "../_utils/query-keys"
import { searchInventories } from "../_actions/inventories"

export function useSearchInventories(search?: string) {
  const query = useQuery({
    queryKey: adminQueryKeys.inventories.search(search),
    queryFn: ({ queryKey }) => searchInventories(queryKey[2]),
  })

  return {
    inventories: query.data,
    isInventoriesLoading: query.isLoading,
    isInventoriesError: query.isError,
    isInventoriesRefetching: query.isRefetching,
    refetchInventories: query.refetch,
  }
}
