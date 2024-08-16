export function compareEqualDates(date1: Date, date2: Date): boolean {
  return date1.setHours(0, 0, 0, 0) === date2.setHours(0, 0, 0, 0);
}
