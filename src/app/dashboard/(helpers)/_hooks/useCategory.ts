import { useQuery } from "@tanstack/react-query"
import { adminQueryKeys } from "../_utils/query-keys"
import { searchCategories } from "../_actions/categories"

export function useSearchCategories(search?: string) {
  const query = useQuery({
    queryKey: adminQueryKeys.categories.search(search),
    queryFn: ({ queryKey }) => searchCategories(queryKey[2])
  })

  return {
    categories: query.data,
    isCategoriesLoading: query.isLoading,
    isCategoriesError: query.isError,
    isCategoriesRefetching: query.isRefetching,
    refetchCategories: query.refetch
  }
}
