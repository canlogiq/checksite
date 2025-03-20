export type SearchParamsContext = {
  searchParams: Promise<
    Record<
      string, string | string[] | undefined
    >
  >
}
