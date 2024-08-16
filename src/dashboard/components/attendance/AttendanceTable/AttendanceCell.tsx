import React from 'react';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import './JustificationModal.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

const statusOptions = [
  { className: "bi bi-x-circle-fill text-danger", label: "Ausente" },
  { className: "bi bi-check-circle-fill text-success", label: "Presente" },
  { className: "bi bi-clock-fill text-warning", label: "Tarde" },
] as const;

const AttendanceCell: React.FC<{
  attendance: any;
  handleToggleStatus: (id: number, day: string) => void;
  handleContextMenu: (event: React.MouseEvent, id: number, day: string) => void;
  handleJustificationClick: (attendance: any) => void;
  isCurrentDate: boolean;
}> = ({ attendance, handleToggleStatus, handleContextMenu, handleJustificationClick, isCurrentDate }) => {
  const { typeUser } = useSelector((state: RootState) => state.auth);
  return (
    <OverlayTrigger
      key={attendance.id}
      placement="top"
      overlay={<Tooltip id={`tooltip-${attendance.id}`}>{statusOptions[attendance.state].label}</Tooltip>}
    >
      <td
        className={`text-center attendance-icon-container ${isCurrentDate ? '' : 'no-pointer'}`}
        onClick={() => { typeUser === 'Tutor' &&  (handleToggleStatus(attendance.id, format(new Date(attendance.day), 'yyyy-MM-dd')))}}
        onContextMenu={(event) => {  typeUser === 'Tutor' && (handleContextMenu(event, attendance.id, format(new Date(attendance.day), 'yyyy-MM-dd')))}}
        style={{ fontSize: '1.5rem', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative', zIndex: 1 }}
      >
        <i className={statusOptions[attendance.state].className}
          style={{
            display: 'inline-block',
            padding: '5px',
            borderRadius: '50%',
          }}
        ></i>
        {attendance.justification && (
          <Button
            variant="info"
            size="sm"
            onClick={(e) => { e.stopPropagation(); handleJustificationClick(attendance); }}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: '0.75rem',
              padding: '0.25rem 0.5rem',
              lineHeight: '1',
              zIndex: 2
            }}
          >
            J
          </Button>
        )}
      </td>
    </OverlayTrigger>
  );
};

export default AttendanceCell;
