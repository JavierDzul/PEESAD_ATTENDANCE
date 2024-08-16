import React from "react";
import { Card, Button } from 'react-bootstrap';

const FilterAttendance: React.FC<{
  startDate: string | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  endDate: string | undefined;
  setEndDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleFilter: () => void;
  handleReset: () => void;
  handleFilterLastAttendance: () => void;
}> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleFilter,
  handleReset,
  handleFilterLastAttendance
}) => {
  return (
    <div style={{ flex: '0 1 48%' }}>
      <Card className="shadow-sm h-100">
        <Card.Body>
          <Card.Title>Filtrar Asistencias</Card.Title>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="startDate">Fecha de Inicio</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Seleccione la fecha de inicio"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="endDate">Fecha de Fin</label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="Seleccione la fecha de fin"
                />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col text-center">
              <Button variant="primary" className="w-100" onClick={handleFilter}>
                Filtrar
              </Button>
              <Button variant="outline-secondary" className="w-100 mt-2" onClick={handleReset}>
                Resetear Rango
              </Button>
              <Button variant="outline-primary" className="w-100 mt-2" onClick={handleFilterLastAttendance}>
                Mostrar Última Asistencia
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FilterAttendance;
