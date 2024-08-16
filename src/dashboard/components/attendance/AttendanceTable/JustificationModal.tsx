import React from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import './JustificationModal.css';

const JustificationModal: React.FC<{
  showModal: boolean;
  canEdit: boolean;
  selectedAttendance: { id: number; reason: string; justification: any } | null;
  justificationReason: string;
  setJustificationReason: React.Dispatch<React.SetStateAction<string>>;
  handleModalClose: () => void;
  handleModalSave: () => void;
}> = ({
  showModal,
  canEdit,
  selectedAttendance,
  justificationReason,
  setJustificationReason,
  handleModalClose,
  handleModalSave,
}) => {
  return (
    <Modal show={showModal} onHide={handleModalClose} centered size='lg'>
      <Modal.Header closeButton className='modal-header-custom'>
        <Modal.Title>Detalles de Justificación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedAttendance && selectedAttendance.justification ? (
          <Container>
            <Card className='justification-card'>
              <Card.Body>
                <Card.Title className='card-title-custom'>
                  Justificación
                </Card.Title>
                <Row className='mb-3'>
                  <Col xs={4} className='field-label'>
                    <strong>Tipo:</strong>
                  </Col>
                  <Col xs={8}>{selectedAttendance.justification.type}</Col>
                </Row>
                <Row className='mb-3'>
                  <Col xs={4} className='field-label'>
                    <strong>Descripción:</strong>
                  </Col>
                  <Col xs={8} className='field-value'>
                    {selectedAttendance.justification.description}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        ) : (
          canEdit && (
            <Form>
              <Form.Group controlId='justificationReason'>
                <Form.Label>Razón de la justificación</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={5}
                  value={justificationReason}
                  onChange={(e) => setJustificationReason(e.target.value)}
                  className='textarea-custom'
                />
              </Form.Group>
            </Form>
          )
        )}
      </Modal.Body>
      <Modal.Footer className='modal-footer-custom'>
        <Button variant='secondary' onClick={handleModalClose}>
          Cerrar
        </Button>
        {canEdit && !selectedAttendance?.justification && (
          <Button variant='primary' onClick={handleModalSave}>
            Guardar cambios
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default JustificationModal;
