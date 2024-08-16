import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { updateJustification } from '../../../store/justification/thunks';
import { Justification } from './types';

interface EditJustificationModalProps {
  show: boolean;
  justification: Justification;
  handleClose: () => void;
}

const EditJustificationModal: React.FC<EditJustificationModalProps> = ({ show, justification, handleClose }) => {
  const [type, setType] = useState(justification.type);
  const [description, setDescription] = useState(justification.description);
 // const [date, setDate] = useState(new Date(justification.date).toISOString().split('T')[0]);
  const dispatch = useDispatch<AppDispatch>();

  const handleSaveChanges = async () => {
    const formData = {
      type,
      description,
      //date,
    };

    await dispatch(updateJustification(justification.id, formData));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Justificante</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formType">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="Médico">Médico</option>
              <option value="Enfermedad Familiar">Enfermedad Familiar</option>
              <option value="Actividad Escolar">Actividad Escolar</option>
              <option value="Personal">Personal</option>
              <option value="Legal">Legal</option>
              <option value="Duelo">Duelo</option>
              <option value="Viaje">Viaje</option>
              <option value="Religioso">Religioso</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          {/* <Form.Group controlId="formDate">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditJustificationModal;
