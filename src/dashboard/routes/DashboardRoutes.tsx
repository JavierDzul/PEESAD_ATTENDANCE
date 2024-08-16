import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Class } from '../../interfaces/class';
import { RootState } from '../../store/store';
import { DashboardLayout } from '../layouts';
import { HomePage } from '../pages';
import { AttendancePage } from '../pages/attendance/pages/AttendancePage';
import AttendanceListPage from '../pages/attendanceList/AttendanceListPage';
import ClassesOfTeacherPage from '../pages/attendanceList/ClassesOfTeacherPage';
import ClassPage from '../pages/class/ClassPage';
import { JustificationPage } from '../pages/justification/JustificationPage';
import { ListPage } from '../pages/list/ListPage';

export const DashboardRoutes = () => {
  const selectedClass = useSelector(
    (state: RootState) => state.class.selectedClass,
  );

  return (
    <DashboardLayout>
      <Routes>
        <Route path='home' element={<HomePage />} />
        <Route path='class' element={<ClassPage />} />
        <Route path='attendance-list' element={<ClassesOfTeacherPage />} />
        <Route
          path='attendance-list/:classId'
          element={<AttendanceListPage />}
        />
        <Route path='list' element={<ListPage />} />
        {/* <Route path='listClass' element={<ListClassPage />} /> */}
        <Route path='justification'  element={selectedClass? <JustificationPage cls={selectedClass as Class} />: <Navigate to="/listClass" replace />} />

        <Route path='attendance' element={
          selectedClass ? <AttendancePage cls={selectedClass as Class} /> : <Navigate to="/list" replace />
        } />
        {/* <Route path='viewAttendance' element={
          selectedClass ? <ViewAttendancePage cls={selectedClass as Class} /> : <Navigate to="/listClass" replace />
        } /> */}
        {/* TODO: Descomentar en proxima versión y redireccionar a /inicio  */}
        <Route path='/*' element={<Navigate to='/home' />} />
      </Routes>
    </DashboardLayout>
  );
};
