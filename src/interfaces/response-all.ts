export interface ApiResponseAll<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  status: boolean;
}
