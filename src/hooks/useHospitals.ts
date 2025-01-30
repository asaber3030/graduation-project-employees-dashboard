import { useQuery } from "@tanstack/react-query";

import { getHospital, getHospitals } from "@/actions/app";
import { globalQueryKeys } from "@/lib/query-keys";

import { Prisma } from "@prisma/client";

export function useHospitals(include?: Prisma.HospitalInclude) {
  const query = useQuery({
    queryKey: globalQueryKeys.hospitals(),
    queryFn: () => getHospitals(),
  });

  return {
    hospitals: query.data,
    isHospitalsLoading: query.isLoading,
    isHospitalsSuccess: query.isSuccess,
    isHospitalsRefetching: query.isRefetching,
    isHospitalsFetching: query.isFetching,
    isHospitalsError: query.isError,
    refetchHospitals: query.refetch,
  };
}

export function useHospital(hospitalId: number) {
  const query = useQuery({
    queryKey: globalQueryKeys.hospital(hospitalId),
    queryFn: () => getHospital({ id: hospitalId }),
  });

  return {
    hospital: query.data,
    isHospitalLoading: query.isLoading,
    isHospitalSuccess: query.isSuccess,
    isHospitalRefetching: query.isRefetching,
    isHospitalFetching: query.isFetching,
    isHospitalError: query.isError,
    refetchHospital: query.refetch,
  };
}
