// src/components/AttendanceTable/ReasonModal.tsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ReasonModal: React.FC<{
  showReasonModal: { show: boolean, reason: string };
  handleReasonModalClose: () => void;
}> = ({ showReasonModal, handleReasonModalClose }) => {
  return (
    <Modal show={showReasonModal.show} onHide={handleReasonModalClose} centered>
      <Modal.Header closeButton className="bg-light" style={{ borderBottom: 'none' }}>
        <Modal.Title className="text-primary">Motivo del Justificante</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-white" style={{ padding: '2rem' }}>
        <p style={{ fontSize: '1.1rem' }}>{showReasonModal.reason}</p>
      </Modal.Body>
      <Modal.Footer className="bg-light" style={{ borderTop: 'none', justifyContent: 'center' }}>
        <Button variant="primary" onClick={handleReasonModalClose} style={{ borderRadius: '0.5rem', background: 'linear-gradient(90deg, #007bff, #0056b3)', borderColor: '#004085' }}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReasonModal;
