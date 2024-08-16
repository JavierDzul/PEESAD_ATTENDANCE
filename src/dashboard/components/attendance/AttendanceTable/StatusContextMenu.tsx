// src/components/AttendanceTable/StatusContextMenu.tsx
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { AttendanceState } from '../../../../interfaces/attendance';

const StatusContextMenu: React.FC<{
  contextMenu: { x: number, y: number, show: boolean, id: number | null };
  handleMenuOptionClick: (state: AttendanceState) => void;
  statusOptions: { className: string; label: string }[];
}> = ({ contextMenu, handleMenuOptionClick, statusOptions }) => {
  return (
    contextMenu.show && (
      <Dropdown.Menu
        show={true}
        style={{ position: 'fixed', top: contextMenu.y, left: contextMenu.x, zIndex: 1000 }}
      >
        {statusOptions.map((option, index) => (
          <Dropdown.Item key={index} onClick={() => handleMenuOptionClick(index as AttendanceState)}>
            <i className={option.className} style={{ marginRight: '8px' }}></i>
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    )
  );
};

export default StatusContextMenu;
