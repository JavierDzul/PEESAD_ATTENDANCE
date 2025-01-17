export interface ApiResponseAll<T> {
  data: T[];
  page: number;
  limit: number;
  pageSize?:number
  total: number;
  status: boolean;
}
