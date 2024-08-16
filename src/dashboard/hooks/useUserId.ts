import { useLocalStorage } from './useLocalStorage';

export const useUserId = () => {
  const [value] = useLocalStorage<number | null>('userId', null);
  return value as number;
};
