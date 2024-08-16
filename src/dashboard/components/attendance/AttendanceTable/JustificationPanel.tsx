import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Table } from 'react-bootstrap';
import axios from 'axios';

const JustificationPanel: React.FC = () => {
  const [justifications, setJustifications] = useState<any[]>([]);
  const [newJustification, setNewJustification] = useState<string>('');
  const [editJustification, setEditJustification] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');

  useEffect(() => {
    fetchJustifications();
  }, []);

  const fetchJustifications = async () => {
    try {
      const response = await axios.get('/api/justifications');
      setJustifications(response.data);
    } catch (error) {
      console.error('Error fetching justifications', error);
    }
  };

  const handleAddJustification = async () => {
    try {
      const response = await axios.post('/api/justifications', { title: newJustification });
      setJustifications([...justifications, response.data]);
      setNewJustification('');
    } catch (error) {
      console.error('Error adding justification', error);
    }
  };

  const handleDeleteJustification = async (id: number) => {
    try {
      await axios.delete(`/api/justifications/${id}`);
      setJustifications(justifications.filter(j => j.id !== id));
    } catch (error) {
      console.error('Error deleting justification', error);
    }
  };

  const handleEditJustification = (justification: any) => {
    setEditJustification(justification);
    setEditTitle(justification.title);
  };

  const handleUpdateJustification = async () => {
    if (editJustification) {
      try {
        const response = await axios.put(`/api/justifications/${editJustification.id}`, { title: editTitle });
        setJustifications(justifications.map(j => (j.id === editJustification.id ? response.data : j)));
        setEditJustification(null);
        setEditTitle('');
      } catch (error) {
        console.error('Error updating justification', error);
      }
    }
  };

  return (
    <Card className="mt-3">
      <Card.Header>Configuración de Justificantes</Card.Header>
      <Card.Body>
        <Form className="mb-3">
          <Form.Group>
            <Form.Label>Nuevo Justificante</Form.Label>
            <Form.Control
              type="text"
              value={newJustification}
              onChange={(e) => setNewJustification(e.target.value)}
              placeholder="Ingrese el título del justificante"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddJustification}>
            Agregar Justificante
          </Button>
        </Form>

        {editJustification && (
          <Form className="mb-3">
            <Form.Group>
              <Form.Label>Editar Justificante</Form.Label>
              <Form.Control
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Ingrese el nuevo título del justificante"
              />
            </Form.Group>
            <Button variant="success" onClick={handleUpdateJustification}>
              Actualizar Justificante
            </Button>
            <Button variant="secondary" className="ml-2" onClick={() => setEditJustification(null)}>
              Cancelar
            </Button>
          </Form>
        )}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {justifications.map((justification) => (
              <tr key={justification.id}>
                <td>{justification.id}</td>
                <td>{justification.title}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditJustification(justification)}>
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleDeleteJustification(justification.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default JustificationPanel;
