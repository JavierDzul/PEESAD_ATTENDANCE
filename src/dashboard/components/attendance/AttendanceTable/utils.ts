// src/components/AttendanceTable/utils.ts

export const sortAttendances = (list: any[]) => {
  return list.map(item => ({
    ...item,
    attendances: [...item.attendances].sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime())
  }));
};

export const sortListByName = (list: any[]) => {
  return list.sort((a, b) => {
    const nameA = `${a.student.lastName} ${a.student.motherLastName} ${a.student.name}`.toUpperCase();
    const nameB = `${b.student.lastName} ${b.student.motherLastName} ${b.student.name}`.toUpperCase();
    return nameA.localeCompare(nameB);
  });
};

export const getLatestDate = (list: any[]) => {
  return list.length > 0 && list[0].attendances.length > 0
    ? list[0].attendances.reduce((latest: any, current: any) => {
        return new Date(current.day) > new Date(latest.day) ? current : latest;
      }).day
    : null;
};
