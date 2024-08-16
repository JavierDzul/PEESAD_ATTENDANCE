import { useEffect, useState } from 'react';
import { NumberParam, useQueryParam } from 'use-query-params';

export const usePageQueryParams = () => {
  const [page, setPage] = useQueryParam('page', NumberParam);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(page || 1);
  }, [page]);

  return [currentPage, setPage] as const;
};
