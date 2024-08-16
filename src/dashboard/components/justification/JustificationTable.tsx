import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Justification } from './types';
import JustificationTableRow from './JustificationTableRow';
import EditJustificationModal from './EditJustificationModal';

interface JustificationTableProps {
  justifications: Justification[];
}

const JustificationTable: React.FC<JustificationTableProps> = ({ justifications }) => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedJustification, setSelectedJustification] = useState<Justification | null>(null);

  const handleRowClick = (id: number) => {
    setOpenRow(openRow === id ? null : id);
  };

  const handleEditClick = (justification: Justification) => {
    setSelectedJustification(justification);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJustification(null);
  };

  return (
    <>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Inicio Fecha</th>
            <th>Fin Fecha</th>
            <th>Tipo</th>
            <th>Estudiante</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {justifications.map((justification) => (
            <JustificationTableRow
              key={justification.id}
              justification={justification}
              isOpen={openRow === justification.id}
              onRowClick={handleRowClick}
              onEditClick={handleEditClick}
            />
          ))}
        </tbody>
      </Table>

      {selectedJustification && (
        <EditJustificationModal
          show={showModal}
          justification={selectedJustification}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default JustificationTable;
