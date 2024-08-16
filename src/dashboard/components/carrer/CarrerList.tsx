import { useSelector } from "react-redux";
import { Career } from "../../../interfaces/career"
import { RootState } from "../../../store/store";
import { EditCarrerModal, SwitchControl } from ".";
import { useState } from "react";


export const CarrerList = () => {
    const  career  = useSelector((state: RootState) => state.career.careers);
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
    const handleSelectCareer = (selectedCareer: Career) => {
        setSelectedCareer(selectedCareer);
        setShowModalEdit(true);
    };
    return (

        <div className="card mt-3 p-2">
            {
                showModalEdit && <EditCarrerModal setShowModal={setShowModalEdit} career={selectedCareer} /> 
            }

            <table className="table text-center">
                <thead >
                    <tr>
                        <th scope="col">Carrera</th>
                        <th scope="col">Clave</th>
                        <th scope="col">No. Semestres</th>
                        <th scope="col">Habilitar/Deshabilitar</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {career.map((career: Career) => (
                        <tr key={career.id}>
                            <td>{career.name}</td>
                            <td>{career.key}</td>
                            <td>{career.semester}</td>
                            <td className="d-flex align-items-center justify-content-center">
                                <div className="form-check form-switch">
                                    <SwitchControl
                                        isActive={career.isActive}
                                        careerId={career.id}
                                    />
                                </div>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleSelectCareer(career)}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )

}