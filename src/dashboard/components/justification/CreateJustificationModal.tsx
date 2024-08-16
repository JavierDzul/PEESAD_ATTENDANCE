import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createJustification } from '../../../store/justification/thunks';
import { Student } from '../../../interfaces/student'; // Importa la interfaz correcta
import { JustificationType } from './types'; // Importa el enum
import { AppDispatch, RootState } from '../../../store/store';
import './CreateJustificationModal.css'; // Importa el archivo CSS para los estilos personalizados


interface CreateJustificationModalProps {
  show: boolean;
  onHide: () => void;
  students: Student[];
}

const CreateJustificationModal: React.FC<CreateJustificationModalProps> = ({ show, onHide, students }) => {
  const selectedClass = useSelector(
    (state: RootState) => state.class.selectedClass,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [type, setType] = useState<JustificationType | undefined>(undefined);
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [studentId, setStudentId] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !description || !startDate || !endDate || !studentId) {
      setError('Todos los campos son obligatorios');
      return;
    }

   const start=  new Date(startDate);
   const end=  new Date(endDate);
        const formData = {
          type,
          description,
          startDate: start.toISOString().split('T')[0],
          endDate: end.toISOString().split('T')[0],
          studentId: studentId!,
          classId: selectedClass.id
        };
       await dispatch(createJustification(formData));
      

     
    
    
    onHide(); // Cerrar el modal
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>Crear Justificante</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formType">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  as="select"
                  value={type === undefined ? '' : type}
                  onChange={(e) => setType(e.target.value as JustificationType)}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  {Object.values(JustificationType).map((typeValue) => (
                    <option key={typeValue} value={typeValue}>
                      {typeValue}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDateRange">
                <Form.Label>Rango de Fechas</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(dates: [Date, Date]) => {
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Seleccionar rango de fechas"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formStudent">
            <Form.Label>Estudiante</Form.Label>
            <Form.Control
              as="select"
              value={studentId === undefined ? '' : studentId}
              onChange={(e) => setStudentId(Number(e.target.value))}
              required
            >
              <option value="">Seleccione un estudiante</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {`${student.name} ${student.lastName} ${student.motherLastName}`}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ingrese la descripción"
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="mr-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit" className="ms-2">
              Crear
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateJustificationModal;
