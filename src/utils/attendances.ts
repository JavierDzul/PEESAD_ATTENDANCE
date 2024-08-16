import { Attendance } from '../interfaces/attendance';
import { compareEqualDates } from './compareEqualDates';

export function getAttendanceOfToday(attendances: Attendance[]) {
  return attendances.find((attendance) =>
    compareEqualDates(new Date(attendance.day), new Date()),
  );
}
