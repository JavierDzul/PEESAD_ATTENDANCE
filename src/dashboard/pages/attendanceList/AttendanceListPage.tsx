import {  useMemo, useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { stateVariants } from '../../../utils';
import JustificationModal from '../../components/attendance/AttendanceTable/JustificationModal';
import DisplayError from '../../components/shared/DisplayError';
import Loading from '../../components/shared/Loading';
import { usePartialQueryParam } from '../../hooks/usePartialQueryParam';
import { createPartial, fetchPartialsData } from '../../components/attendance/service/api';

import CreatePartialModal from '../../components/attendance/AttendanceFilter/CreatePartialModal';
import { showErrorAlert, showSuccessAlert } from '../../components/attendance/utils/Swal';
import { Partial } from '../../../interfaces/partial';
import { AttendanceQueryType, useGetAttendancesByRangeQuery } from '../../../services/api/classApi';
import { AttendanceState } from '../../../interfaces/attendance';

export default function AttendanceListPage() {
  const params = useParams<{ classId: string }>();
  const [partial = 1, setPartial] = usePartialQueryParam();
  const [partialAux, setPartialAux] = useState<Partial[]>([])
  const [showModal, setShowModal] = useState(false)
  const [newPartialTitle, setNewPartialTitle] = useState<string>("");

  const [showJustificationModal, setShowJustificationModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<{
    id: number;
    reason: string;
    justification: unknown;
  } | null>(null);
  const [justificationReason, setJustificationReason] = useState('');

  const {
    data: studentAndAttendancesResponse,
    isLoading,
    isError,
  } = useGetAttendancesByRangeQuery({
    classId: Number(params.classId),
    partial,
  });



  


  function handleJustification(attendance: {
    id: number;
    reason: string;
    justification: unknown;
  }) {
    setSelectedAttendance(attendance);
    setShowJustificationModal(true);
  }

  function handleModalClose() {
    setShowJustificationModal(false);
    setSelectedAttendance(null);
    setJustificationReason('');
  }

  const studentAndAttendances: AttendanceQueryType[] = useMemo(() => {
    return (
      studentAndAttendancesResponse?.data.map(({ student, attendances }) => ({
        student,
        totalAbsences: attendances.filter(
          (attendance) => attendance.state === 1,
        ).length,
        attendances: attendances
          .map((attendance) => {
            return {
              ...attendance,
              day: new Date(attendance.day),
            };
          })
          .sort(
            (a, b) => b.day.setHours(0, 0, 0, 0) - a.day.setHours(0, 0, 0, 0),
          ),
        // .splice(0, 5),
      })) || []
    );
  }, [studentAndAttendancesResponse]);

  if (isLoading) return <Loading />;

  if (isError) return <DisplayError />;



  const handleCreatePartial = async () => {
    try {
      if (newPartialTitle) {
        await createPartial(Number(params.classId), newPartialTitle);
        const partialsData = await fetchPartialsData(Number(params.classId));
        setPartialAux(partialsData)
        setShowModal(false);
        setNewPartialTitle("");
        showSuccessAlert('Éxito', 'Parcial creado correctamente');
      }
    } catch (error) {
      console.error("Error creating partial", error);
      showErrorAlert('Error', 'Hubo un problema al crear el parcial');
    }
  };

  return (
    <div className='pt-4 container d-flex flex-column justify-content-center align-items-center gap-4'>
      <h1>Lista de asistencia</h1>

      <div className='container-fluid d-flex'>
        <Nav variant='tabs'>
          {partialAux.map((partial: Partial) => (
            <Nav.Item key={partial.id} onClick={() => setPartial(partial.id)}>
              <Nav.Link>{partial.title}</Nav.Link>
            </Nav.Item>
          ))}
          <Nav.Link onClick={() => setShowModal(true)}>
          Crear Parcial
        </Nav.Link>
        </Nav>
      </div>

      <div className='container-fluid d-flex overflow-x-scroll'>
        <table className='table text-center'>
          <thead>
            <tr>
              <th>Alumno</th>
              {studentAndAttendances[0].attendances.map((attendance) => (
                <th key={attendance.id}>
                  {new Date(attendance.day).toLocaleDateString()}
                </th>
              ))}
              <th>Núm. de faltas</th>
            </tr>
          </thead>
          <tbody>
            {studentAndAttendances.map(
              ({ student, totalAbsences, attendances }) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  {attendances.map((attendance) => (
                    <td key={attendance.id} style={{ position: 'relative' }}>
                      <span
                        className={stateVariants({ state: attendance.state as AttendanceState })}
                      />
                      {attendance.justification && (
                        <Button
                          variant='info'
                          size='sm'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJustification({
                              id: attendance.id,
                              reason: attendance.reason || '',
                              justification: attendance.justification,
                            });
                          }}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.5rem',
                            lineHeight: '1',
                            zIndex: 2,
                          }}
                        >
                          J
                        </Button>
                      )}
                    </td>
                  ))}
                  <td>{totalAbsences}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      <CreatePartialModal
        showModal={showModal}
        setShowModal={setShowModal}
        newPartialTitle={newPartialTitle}
        setNewPartialTitle={setNewPartialTitle}
        handleCreatePartial={handleCreatePartial}
        />
      <JustificationModal
        showModal={showJustificationModal}
        canEdit={false}
        selectedAttendance={selectedAttendance}
        justificationReason={justificationReason}
        setJustificationReason={setJustificationReason}
        handleModalClose={handleModalClose}
        handleModalSave={() => {}}
      />
    </div>
  );
}
