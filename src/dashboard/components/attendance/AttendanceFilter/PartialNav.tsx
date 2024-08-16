import React from "react";
import { Nav } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const PartialNav: React.FC<{
  partials: any[];
  selectedPartial: any;
  setSelectedPartial: React.Dispatch<React.SetStateAction<any | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ partials, selectedPartial, setSelectedPartial, setShowModal }) => {
  const { typeUser } = useSelector((state: RootState) => state.auth);
  return (
    <Nav variant="tabs" activeKey={selectedPartial?.id} className="mb-3">
      {partials.map(partial => (
        <Nav.Item key={partial.id}>
          <Nav.Link eventKey={partial.id} onClick={() => setSelectedPartial(partial)}>
            {partial.title}
          </Nav.Link>
        </Nav.Item>
      ))}
      { typeUser === 'Profesor' &&  (<Nav.Item>
        <Nav.Link onClick={() => setShowModal(true)}>
          Crear Parcial
        </Nav.Link>
      </Nav.Item>)}
    </Nav>
  );
};

export default PartialNav;
