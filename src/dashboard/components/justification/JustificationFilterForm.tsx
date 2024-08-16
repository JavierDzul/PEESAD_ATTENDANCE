import React from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { JustificationType } from './types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Student } from '../../../interfaces/student'; // Importa la interfaz correcta

interface JustificationFilterFormProps {
  students: Student[];
  selectedStudentId: number | undefined;
  setSelectedStudentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  startDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  type: JustificationType | undefined;
  setType: React.Dispatch<React.SetStateAction<JustificationType | undefined>>;
  handleFilter: () => void;
  handleReset: () => void;
}

const JustificationFilterForm: React.FC<JustificationFilterFormProps> = ({
  students,
  selectedStudentId,
  setSelectedStudentId,
  searchTerm,
  setSearchTerm,
  startDate,
  setStartDate,
  type,
  setType,
  handleFilter,
  handleReset,
}) => {
  const filteredStudents = students.filter(student =>
    (student.fullName as string).toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.noControl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Form className="p-3 rounded shadow-sm bg-light">
      <Row>
        <Col md={6} xs={12}>
          <Form.Group>
            <Form.Label className="font-weight-bold">Nombre del Estudiante o No. de Control</Form.Label>
            <InputGroup>
              <Typeahead
                id="student-search"
                options={filteredStudents}
                labelKey={(option) => `${(option as Student).fullName} (${(option as Student).noControl})`}
                onInputChange={setSearchTerm}
                onChange={(selected) => {
                  const selectedStudent = selected[0] as Student | undefined;
                  if (selectedStudent) {
                    setSelectedStudentId(selectedStudent.id);
                  } else {
                    setSelectedStudentId(undefined);
                  }
                }}
                placeholder="Buscar por nombre o número de control"
                selected={
                  selectedStudentId
                    ? filteredStudents.filter((student) => student.id === selectedStudentId)
                    : []
                }
                clearButton
                className="rounded-pill"
                inputProps={{ className: "rounded-pill shadow-sm" }}
              />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={3} xs={12}>
          <Form.Group>
            <Form.Label className="font-weight-bold">Fecha</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date || undefined)}
              className="form-control rounded-pill shadow-sm"
              dateFormat="yyyy-MM-dd"
              placeholderText="Seleccionar fecha"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={3} xs={12}>
          <Form.Group>
            <Form.Label className="font-weight-bold">Tipo</Form.Label>
            <Form.Control
              as="select"
              value={type === undefined ? '' : type}
              onChange={(e) => setType(e.target.value === '' ? undefined : e.target.value as JustificationType)}
              className="rounded-pill shadow-sm"
            >
              <option value="">Todos</option>
              {Object.values(JustificationType).map((typeValue) => (
                <option key={typeValue} value={typeValue}>
                  {typeValue}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={9} xs={12} className="d-flex align-items-end justify-content-end">
          <Button variant="primary" onClick={handleFilter} className="mr-2  shadow-sm">
            Filtrar
          </Button>
          <Button variant="secondary" onClick={handleReset} className="ms-2 shadow-sm">
            Resetear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default JustificationFilterForm;
