export const globalQueryKeys = {
  hospitals: () => ["app", "hospitals"],
  hospital: (hospitalId: number) => ["app", "hospitals", hospitalId]
}
