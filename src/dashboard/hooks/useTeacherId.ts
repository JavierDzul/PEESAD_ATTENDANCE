import { useLocalStorage } from './useLocalStorage';

export const useTeacherId = () => {
  const [teacherId] = useLocalStorage('teacherId', 0);

  return teacherId;
};
