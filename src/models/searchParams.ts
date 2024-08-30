export interface ISearchParamsBase {
  limit?: number,
  orderBy?: string,
  sortBy?: 'asc' | 'desc'
  offset?: string,
  id?: string
}

export interface ISearchParamsCompany extends ISearchParamsBase{
  name?: string,
  email?: string,
  taxIdentifier?: string,
  type?: string
}