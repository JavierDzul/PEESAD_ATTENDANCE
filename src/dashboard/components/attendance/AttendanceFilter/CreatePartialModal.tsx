import React from "react";
import { Modal, Button, Form } from 'react-bootstrap';

const CreatePartialModal: React.FC<{
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  newPartialTitle: string;
  setNewPartialTitle: React.Dispatch<React.SetStateAction<string>>;
  handleCreatePartial: () => void;
}> = ({ showModal, setShowModal, newPartialTitle, setNewPartialTitle, handleCreatePartial }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Parcial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPartialTitle">
            <Form.Label>Título del Parcial</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el título del parcial"
              value={newPartialTitle}
              onChange={(e) => setNewPartialTitle(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleCreatePartial}>
          Crear Parcial
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePartialModal;
