import { useEffect } from "react";
import unitIcon from "../../../assets/icons/unit.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { Class } from "../../../interfaces/class";
import defaultUserImage from "../../../assets/icons/userpicture.png";
import { NavLink } from "react-router-dom";
import { setSelectedClass } from "../../../store/Class/thunks";

export const ListList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { classes } = useSelector((state: RootState) => state.class);
    const urlImage = import.meta.env.VITE_API_URL_AUTH;
    const { typeUser } = useSelector((state: RootState) => state.auth);
    //const username = user.name + user.lastName + user.motherLastName;

    // Obtener el nombre del periodo actual
    const currentPeriod = classes.find((cls: Class) => cls.period?.isCurrent)?.period?.name || "Periodo actual no encontrado";

    // Agrupar las clases por subperiodo
    const classesBySubperiod = classes.reduce((acc: any, cls: any) => {
        const subperiodName = cls.subperiod?.name || "Sin subperiodo";
        if (!acc[subperiodName]) {
            acc[subperiodName] = [];
        }
        acc[subperiodName].push(cls);
        return acc;
    }, {});

    useEffect(() => {
        console.log("Classes data in ListList:", classes);
    }, [classes]);

    return (
        <div className="accordion w-75" id="accordionExample">
            <h2 className="text-center mb-4">{`Periodo Actual: ${currentPeriod}`}</h2>
            <div className="p-4">
                <div className="alert alert-info mb-0">
                    <strong>Nota:</strong> Las clases y materias mostradas se han seleccionado en función de la carrera asignada a usted como tutor. Solo se muestran las materias vinculadas a esa carrera. Además, las clases se agrupan por subperiodo. Si alguna clase asignada no aparece, podría ser debido a que el subperiodo no está activo o la materia no está relacionada con su carrera. <strong>Contacte al administrador</strong> si necesita ayuda adicional.

                    <br /><br />
                    <strong>Lista de Subperiodos:</strong>
                    <ul className="mt-2">
                        {Object.values(classesBySubperiod).map((subperiodClasses) => {
                            const classesArray = subperiodClasses as Class[]; // Convertimos a un array de `Class`

                            // Verificamos que haya al menos un elemento en el array
                            if (classesArray.length > 0) {
                                const { name, startDate, endDate } = classesArray[0].subperiod;
                                return (
                                    <li key={name}>
                                        <strong>{name}:</strong> desde {new Date(startDate).toLocaleDateString()} hasta {new Date(endDate).toLocaleDateString()}
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            </div>
            {Object.keys(classesBySubperiod).map((subperiodName) => {
                const subperiodClasses = classesBySubperiod[subperiodName];
                const isCurrentSubperiod = subperiodClasses[0]?.subperiod?.isCurrent;

                return (
                    <div key={subperiodName} className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className={`accordion-button ${!isCurrentSubperiod ? "disabled" : ""}`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#subperiod-${subperiodName}`}
                                aria-expanded="true"
                                aria-controls={`subperiod-${subperiodName}`}
                                disabled={!isCurrentSubperiod} // Deshabilitar expansión si el subperiodo no está activo
                            >
                                <strong>{subperiodName}</strong>
                            </button>
                        </h2>
                        <div
                            id={`subperiod-${subperiodName}`}
                            className={`accordion-collapse collapse ${isCurrentSubperiod ? "show" : ""}`}
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                {subperiodClasses.map((cls: any) => (
                                    <div className="accordion-item" key={cls.id}>
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#clase-${cls.id}`}
                                                aria-expanded="true"
                                                aria-controls={`clase-${cls.id}`}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        style={{ borderRadius: "100%" }}
                                                        width="35"
                                                        className="me-2"
                                                        src={unitIcon}
                                                        alt="class image"
                                                    />
                                                    <span>
                                                        <strong>
                                                            {cls.package.name} - {cls.subject.name}
                                                        </strong>
                                                    </span>
                                                </div>
                                            </button>
                                        </h2>
                                        <div
                                            id={`clase-${cls.id}`}
                                            className="accordion-collapse collapse"
                                            data-bs-parent={`#subperiod-${subperiodName}`}
                                        >
                                            <div className="accordion-body">
                                                <div className="d-flex flex-column justify-content-center align-items-center flex-md-row justify-content-md-between align-items-md-start">
                                                    <div className="d-flex flex-column align-items-center mt-2">
                                                        <img
                                                            height={100}
                                                            className="me-2 rounded-circle"
                                                            style={{ width: "100%", maxWidth: "100px", objectFit: "cover" }}
                                                            src={
                                                                cls.teacher.user.picture === "none"
                                                                    ? defaultUserImage
                                                                    : `${urlImage}/files/users/${cls.teacher.user.picture}`
                                                            }
                                                            alt="User image"
                                                            onError={(e) => (e.currentTarget.src = defaultUserImage)}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column m-3">
                                                        <span>
                                                            <strong>Profesor:</strong> {cls.teacher.user.name}{" "}
                                                            {cls.teacher.user.lastName} {cls.teacher.user.motherLastName}
                                                        </span>
                                                        <span>
                                                            <strong>Unidad: </strong>
                                                            {cls.package.unitCampus.name}
                                                        </span>
                                                        <span>
                                                            <strong>Clave: </strong>
                                                            {cls.subject.clave}
                                                        </span>
                                                    </div>
                                                    <div className="mt-auto me-2 mb-2">
                                                        <NavLink
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={() => {
                                                                dispatch(setSelectedClass(cls.id));
                                                            }}
                                                            to={`/justification?&classId=${cls.id}`}
                                                        >
                                                            Administrar Justificantes
                                                        </NavLink>
                                                    </div>
                                                    <div className="mt-auto mb-2">
                                                        <NavLink
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            onClick={() => {
                                                                dispatch(setSelectedClass(cls.id));
                                                            }}
                                                            to="/attendance"
                                                            aria-disabled={!isCurrentSubperiod}
                                                            tabIndex={!isCurrentSubperiod ? -1 : 0}
                                                        >
                                                            <span className="fs-6">
                                                                {typeUser === "Tutor" ? "Pasar lista" : "Ver lista"}
                                                            </span>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
