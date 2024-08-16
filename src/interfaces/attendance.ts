import { Justification } from './justification';

export type AttendanceState = 0 | 1 | 2 | 3;

export interface Attendance {
  id: number;
  state: number| AttendanceState;
  reason?: string;
  day: Date;
  updatedAt?: Date;
  justification: Justification | null;
}

export interface AttendanceUpdate {
  id?: number;
  state?: AttendanceState;
  reason?: string;
  day?: Date;
  updatedAt?: Date;
}
