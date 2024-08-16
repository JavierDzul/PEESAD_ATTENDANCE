import { Attendance } from './attendance';
import { Class } from './class';

export interface Partial {
  id: number;
  title: string;
  attendances: Attendance[];
  class: Class;
}
