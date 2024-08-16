import React from 'react';
import { Button } from 'react-bootstrap';
import { isSameDay, parseISO } from 'date-fns';
import AttendanceCell from './AttendanceCell';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

const AttendanceRow: React.FC<{
  item: any;
  latestDate: string | null;
  handleToggleStatus: (id: number, day: string) => void;
  handleContextMenu: (event: React.MouseEvent, id: number, day: string) => void;
  handleJustificationClick: (attendance: any) => void;
}> = ({ item, latestDate, handleToggleStatus, handleContextMenu, handleJustificationClick }) => {
  const selectedClass = useSelector(
    (state: RootState) => state.class.selectedClass,
  );
  const { typeUser } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const handleRedirect = () => {
    const params = { studentId: item.student.id, classId: selectedClass.id };
    const query = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    ).toString();
    navigate(`/justification?${query}`);
  };

  return (
    <tr>
      <td>{item.student.lastName} {item.student.motherLastName} {item.student.name}</td>
      {item.attendances.map((attendance: any) => {
        const isCurrentDate = latestDate ? isSameDay(parseISO(attendance.day), parseISO(latestDate)) : false;
        return (
          <AttendanceCell
            key={attendance.id}
            attendance={attendance}
            handleToggleStatus={handleToggleStatus}
            handleContextMenu={handleContextMenu}
            handleJustificationClick={handleJustificationClick}
            isCurrentDate={isCurrentDate}
          />
        );
      })}
      { typeUser === 'Tutor' && (<td className="text-center">
        <Button onClick={handleRedirect} variant="outline-secondary" size="sm">Administrar Justificantes</Button>
      </td>)}
    </tr>
  );
};

export default AttendanceRow;
