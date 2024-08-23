import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { getList } from "../../../../store/List/thunks";
import { Button, Collapse } from 'react-bootstrap';
import FilterAttendance from "./FilterAttendance";
import PartialNav from "./PartialNav";
import CreatePartialModal from "./CreatePartialModal";
import { fetchPartialsData, createPartial, createAttendance } from "../service/api";
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from "../utils/Swal";

export const AttendanceFilter: React.FC = () => {
  const { typeUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const idClass: number = useSelector((state: RootState) => state.class.selectedClass?.id as number);
  const [partials, setPartials] = useState<any[]>([]);
  const [selectedPartial, setSelectedPartial] = useState<any | null>(null);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const state = 0; // Default state value for attendance
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newPartialTitle, setNewPartialTitle] = useState<string>("");

  useEffect(() => {
    const fetchPartials = async () => {
      const partialsData = await fetchPartialsData(idClass);
      setPartials(partialsData);
      if (partialsData.length > 0) {
        setSelectedPartial(partialsData[partialsData.length - 1]);
      }
    };
    fetchPartials();
    //dispatch(getList({ id: idClass }));
  }, [idClass]);


  useEffect(() => {
    if (selectedPartial) {
      handleFilter();
    }

  }, [selectedPartial]);

  const handleFilter = () => {
    if (selectedPartial) {
      dispatch(
        getList({
          id: idClass,
          partial: selectedPartial.id,
          startDate,
          endDate,
        })
      );
    }
  };

  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    (document.getElementById("startDate") as HTMLInputElement).value = "";
    (document.getElementById("endDate") as HTMLInputElement).value = "";
    handleFilter();
  };

  const handleFilterLastAttendance = () => {
    if (selectedPartial) {
      dispatch(
        getList({
          id: idClass,
          partial: selectedPartial.id,
          lastOnly: true,
        })
      );
    }
  };

  const handleCreateAttendance = async () => {
    if ( selectedPartial) {
      const result = await showConfirmationAlert("¿Estás seguro?", "Crearás una nueva asistencia para la fecha actual.");
      if (result.isConfirmed) {
        try {
          const utcDate = new Date().toISOString().split('T')[0];
          const res = await createAttendance(idClass, selectedPartial.id, utcDate, state);
          dispatch(
            getList({
              id: idClass,
              partial: selectedPartial.id,
              startDate,
              endDate,
            })
          );
          if(res.status==true)
          showSuccessAlert('Éxito', 'Asistencia creada correctamente');
        else
        showErrorAlert('Error', res.message);

        } catch (error) {
          console.error("Error creating attendance", error);
          showErrorAlert('Error', 'Hubo un problema al crear la asistencia');
        }
      }
    } else {
      console.error("Attendance date and partial are required");
    }
  };

  const handleCreatePartial = async () => {
    try {
      if (newPartialTitle) {
        await createPartial(idClass, newPartialTitle);
        const partialsData = await fetchPartialsData(idClass);
        setPartials(partialsData);
        setShowModal(false);
        setNewPartialTitle("");
        showSuccessAlert('Éxito', 'Parcial creado correctamente');
      }
    } catch (error) {
      console.error("Error creating partial", error);
      showErrorAlert('Error', 'Hubo un problema al crear el parcial');
    }
  };

  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-end mb-2">
        <Button variant="outline-secondary" className="mr-2" onClick={() => setShowFilter(!showFilter)}>
          {showFilter ? 'Ocultar Filtro' : 'Mostrar Filtro'}
        </Button>
        {typeUser === 'Tutor' && (<Button variant="success" className="ms-2 mr-2" onClick={handleCreateAttendance}>
                Crear Asistencia
              </Button>)}
      </div>

      <PartialNav
        partials={partials}
        selectedPartial={selectedPartial}
        setSelectedPartial={setSelectedPartial}
        setShowModal={setShowModal}
      />

      <div className={`d-flex  justify-content-center `}>
        <Collapse in={showFilter}>
          <div style={{ flex: '0 1 48%' }}>
            <FilterAttendance
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              handleFilter={handleFilter}
              handleReset={handleReset}
              handleFilterLastAttendance={handleFilterLastAttendance}
            />
          </div>
        </Collapse>

        
      </div>

      <CreatePartialModal
        showModal={showModal}
        setShowModal={setShowModal}
        newPartialTitle={newPartialTitle}
        setNewPartialTitle={setNewPartialTitle}
        handleCreatePartial={handleCreatePartial}
      />
    </div>
  );
};
