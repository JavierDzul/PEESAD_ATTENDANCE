import { useEffect, useState } from 'react';
import { NumberParam, useQueryParam } from 'use-query-params';

export const usePartialQueryParam = () => {
  const [partial, setPartial] = useQueryParam('partial', NumberParam);
  const [currentPartial, setCurrentPartial] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => setCurrentPartial(partial ? partial : undefined), [partial]);

  return [currentPartial, setPartial] as const;
};
