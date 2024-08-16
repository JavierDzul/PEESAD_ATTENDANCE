import React from 'react';
import { Button, Collapse, Card, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { Justification } from './types';

interface JustificationTableRowProps {
  justification: Justification;
  isOpen: boolean;
  onRowClick: (id: number) => void;
  onEditClick: (justification: Justification) => void;
}

const JustificationTableRow: React.FC<JustificationTableRowProps> = ({
  justification,
  isOpen,
  onRowClick,
  onEditClick,
}) => {
  const formatExtendedDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return new Date(dateStr).toLocaleDateString('es-ES', options);
  };

  return (
    <>
      <tr
        onClick={() => onRowClick(justification.id)}
        style={{ cursor: 'pointer', backgroundColor: isOpen ? '#f9f9f9' : 'white' }}
      >

        <td>{new Date(justification.startDate).toLocaleDateString()}</td>
        <td>{new Date(justification.endDate).toLocaleDateString()}</td>

        <td>{justification.type}</td>
        <td>{`${justification.student.name} ${justification.student.lastName} ${justification.student.motherLastName}`}</td>
        <td className="text-center">
          <Button
            variant={isOpen ? "outline-primary" : "primary"}
            onClick={(e) => {
              e.stopPropagation();
              onRowClick(justification.id);
            }}
            aria-controls={`collapse-${justification.id}`}
            aria-expanded={isOpen}
            className="mr-2"
          >
            {isOpen ? 'Ocultar' : 'Ver Más'}
          </Button>
          <Button
          className="ms-2"
            variant="outline-primary"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick(justification);
            }}
          >
            Editar
          </Button>
        </td>
      </tr>
      <tr>
        <td colSpan={4} className="p-0">
          <Collapse in={isOpen}>
            <div id={`collapse-${justification.id}`}>
              <Card className="m-3 shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="text-center text-primary">Detalles del Justificante</Card.Title>
                  <Row>
                    <Col md={6}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Fecha de inicio:</strong> {formatExtendedDate(justification.startDate)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Fecha de fin:</strong> {formatExtendedDate(justification.endDate)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Tipo:</strong> <Badge bg="secondary">{justification.type}</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Estudiante:</strong> {`${justification.student.name} ${justification.student.lastName} ${justification.student.motherLastName}`}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Número de control:</strong> {justification.student.noControl}
                        </ListGroup.Item>
                        {justification.attachment && (
                          <ListGroup.Item>
                            <strong>Adjunto:</strong> <a href={justification.attachment} target="_blank" rel="noopener noreferrer">Ver Adjunto</a>
                          </ListGroup.Item>
                        )}
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      <Card>
                        <Card.Header className="bg-primary text-white">Descripción</Card.Header>
                        <Card.Body className="bg-light">
                          <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{justification.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Collapse>
        </td>
      </tr>
    </>
  );
};

export default JustificationTableRow;
