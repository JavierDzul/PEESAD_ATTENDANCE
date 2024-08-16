import 'bootstrap-icons/font/bootstrap-icons.css';
import { format, isSameDay, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listState } from '../../../../store/List/listSlice';
import { updateList } from '../../../../store/List/thunks';
import { AppDispatch, RootState } from '../../../../store/store';
import AttendanceRow from './AttendanceRow';
import './AttendanceTable.css';
import JustificationModal from './JustificationModal';
import JustificationPanel from './JustificationPanel';
import ReasonModal from './ReasonModal';
import StatusContextMenu from './StatusContextMenu';
import { getLatestDate, sortAttendances, sortListByName } from './utils';
import { AttendanceState } from '../../../../interfaces/attendance';

const statusOptions: { className: string; label: string }[] = [
  { className: 'bi bi-x-circle-fill text-danger', label: 'Ausente' },
  { className: 'bi bi-check-circle-fill text-success', label: 'Presente' },
  { className: 'bi bi-clock-fill text-warning', label: 'Tarde' },
];

export const AttendanceTable: React.FC = () => {
  const { typeUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { list }: listState = useSelector((state: RootState) => state.list);

  const [showModal, setShowModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<{
    id: number;
    reason: string;
    justification: any;
  } | null>(null);
  const [justificationReason, setJustificationReason] = useState('');
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    show: boolean;
    id: number | null;
  }>({ x: 0, y: 0, show: false, id: null });
  const [showReasonModal, setShowReasonModal] = useState<{
    show: boolean;
    reason: string;
  }>({ show: false, reason: '' });

  const sortedList = sortListByName(sortAttendances(list));
  const latestDate = getLatestDate(sortedList);

  const handleToggleStatus = (id: number, day: string): void => {
    const isCurrentDate = isSameDay(parseISO(day), new Date(latestDate!));
    const attendance = list
      .flatMap((item) => item.attendances)
      .find((att) => att.id === id);

    if (attendance) {
      if (attendance.state === 3) {
        setShowReasonModal({ show: true, reason: attendance.reason || '' });
        return;
      }
      if (!isCurrentDate) {
        // if (attendance.state !== 3) {
        //   setSelectedAttendance({ id, reason: attendance.reason || '' });
        //   setShowModal(true);
        // }
      } else {
        const nextState = (attendance.state + 1) % statusOptions.length;
        if (nextState === 3) {
          setSelectedAttendance({
            id,
            reason: attendance.reason || '',
            justification: attendance.justification,
          });
          setShowModal(true);
        } else {
          dispatch(updateList(id, { state: nextState as AttendanceState }));
        }
      }
    }
  };

  const handleJustificationClick = (attendance: any): void => {
    setSelectedAttendance({
      id: attendance.id,
      reason: attendance.reason || '',
      justification: attendance.justification,
    });
    setShowModal(true);
  };

  const handleContextMenu = (
    event: React.MouseEvent,
    id: number,
    day: string,
  ) => {
    event.preventDefault();
    if (isSameDay(parseISO(day), new Date(latestDate!))) {
      setContextMenu({ x: event.clientX, y: event.clientY, show: true, id });
    }
  };

  const handleMenuOptionClick = (state: AttendanceState) => {
    if (contextMenu.id !== null) {
      if (state === 3) {
        const attendance = list
          .flatMap((item) => item.attendances)
          .find((att) => att.id === contextMenu.id);
        setSelectedAttendance({
          id: contextMenu.id,
          reason: attendance?.reason || '',
          justification: attendance?.justification,
        });
        setShowModal(true);
      } else {
        dispatch(updateList(contextMenu.id, { state }));
      }
      setContextMenu({ x: 0, y: 0, show: false, id: null });
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAttendance(null);
    setJustificationReason('');
  };

  const handleModalSave = () => {
    if (selectedAttendance !== null) {
      dispatch(
        updateList(selectedAttendance.id, {
          state: 3,
          reason: justificationReason,
        }),
      );
    }
    handleModalClose();
  };

  const handleReasonModalClose = () => {
    setShowReasonModal({ show: false, reason: '' });
  };

  const handleDocumentClick = () => {
    if (contextMenu.show) {
      setContextMenu({ x: 0, y: 0, show: false, id: null });
    }
  };

  const showJustificationPanel=false;



  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [contextMenu.show]);

  return (
    <div className='container mt-4'>
      {showJustificationPanel && <JustificationPanel />}
      {list.length > 0 &&
        sortedList.length > 0 &&
        sortedList[0].attendances.length > 0 && (
          <div className='table-responsive'>
            <Table hover className='shadow-sm'>
              <thead className='table-light'>
                <tr>
                  <th>Alumno</th>
                  {sortedList[0].attendances.map(
                    (attendance: { id: number; day: string | Date }) => (
                      <th key={attendance.id} className='text-center'>
                        <span className='d-none d-md-inline'>
                          {format(new Date(attendance.day), 'dd/MM/yyyy')}
                        </span>
                        <span className='d-md-none'>
                          {format(new Date(attendance.day), 'dd/MM')}
                        </span>
                      </th>
                    ),
                  )}
                  { typeUser === 'Tutor' &&  (<th className='text-center'>Opciones</th>)}
                </tr>
              </thead>
              <tbody>
                {sortedList.map((item) => (
                  <AttendanceRow
                    key={item.student.id}
                    item={item}
                    latestDate={latestDate}
                    handleToggleStatus={handleToggleStatus}
                    handleJustificationClick={handleJustificationClick}
                    handleContextMenu={handleContextMenu}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        )}
      <StatusContextMenu
        contextMenu={contextMenu}
        handleMenuOptionClick={handleMenuOptionClick}
        statusOptions={statusOptions}
      />
      <JustificationModal
        showModal={showModal}
        canEdit={true}
        selectedAttendance={selectedAttendance}
        justificationReason={justificationReason}
        setJustificationReason={setJustificationReason}
        handleModalClose={handleModalClose}
        handleModalSave={handleModalSave}
      />
      <ReasonModal
        showReasonModal={showReasonModal}
        handleReasonModalClose={handleReasonModalClose}
      />
    </div>
  );
};

export default AttendanceTable;
