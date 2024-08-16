import { Class } from '../../../interfaces/class';
import defaultUserImage from "../../../assets/icons/userpicture.png";

export type HeaderClassProps = {
    cls: Class;
};

const HeaderClass = ({ cls }: HeaderClassProps) => {
    const urlImage = import.meta.env.VITE_API_URL_AUTH;

    return (
        <header className="bg-light p-3">
            <div className="container-fluid">
                <div className="row align-items-center">
                <div className="col-md-2 d-flex justify-content-center align-items-center">
                    <img
                        src={cls.teacher.user.picture === "none" ? defaultUserImage : `${urlImage}/files/users/${cls.teacher.user.picture}`}
                        alt="Imagen del profesor"
                        style={{ width: '100%', maxWidth: '200px', objectFit: 'cover' }}
                        className="rounded-circle img-fluid"
                        onError={(e) => e.currentTarget.src = defaultUserImage}
                        loading="lazy"
                    />
                </div>

                    <div className="col-md-10">
                        <div className="row text-md-start">
                            <div className="col-md-4">
                                <h5><strong>Profesor:</strong> {cls.teacher.user.name} {cls.teacher.user.lastName} {cls.teacher.user.motherLastName}</h5>
                                <p className="mb-0"><strong>Materia y Paquete:</strong> {cls.package.name} - {cls.subject.name}</p>
                                <p className="mb-0"><strong>Semestre:</strong> {cls.subject.semester}</p>
                                <p className="mb-0"><strong>Clave de Materia:</strong> {cls.subject.clave}</p>
        
                            </div>
                            <div className="col-md-8 mt-auto">
                                <p className="mb-0"><strong>Unidad Académica:</strong> {cls.package.unitCampus.name}</p>
                                <p className="mb-0"><strong>Dirección:</strong> {cls.package.unitCampus.location}</p>
                                <p className="mb-0"><strong>Clave Unidad:</strong> {cls.package.unitCampus.key}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderClass;
