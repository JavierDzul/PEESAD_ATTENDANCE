import React from "react";
import { Card, Button } from 'react-bootstrap';

const CreateAttendance: React.FC<{
  handleCreateAttendance: () => void;
}> = ({
  handleCreateAttendance
}) => {
  return (
    <div style={{ flex: '0 1 48%' }}>
      <Card className="shadow-sm h-100">
        <Card.Body>
          <Card.Title>Crear Asistencia</Card.Title>
          <div className="row">
            <div className="col-md-12">
              
            </div>
           
            <div className="col-md-12">
              <Button variant="success" className="w-100 mt-3" onClick={handleCreateAttendance}>
                Crear Asistencia
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateAttendance;
