import { useEffect, useState } from 'react';
import { NumberParam, useQueryParam } from 'use-query-params';

export const usePackageParam = () => {
  const [pkg, setPkg] = useQueryParam('package', NumberParam);
  const [currentPackage, setCurrentPackage] = useState(0);

  useEffect(() => {
    setCurrentPackage(pkg || 0);
  }, [pkg]);

  return [currentPackage, setPkg] as const;
};
