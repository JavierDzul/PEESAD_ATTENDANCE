import { useEffect } from "react";
import unitIcon from "../../../assets/icons/unit.png"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { Class } from "../../../interfaces/class";
import defaultUserImage from "../../../assets/icons/userpicture.png"
import { NavLink } from "react-router-dom";
import { setSelectedClass } from "../../../store/Class/thunks";


export const ListList = () => {
    const dispatch = useDispatch<AppDispatch>();

    
    const {classes} = useSelector((state:RootState)=>  state.class);
    const urlImage = import.meta.env.VITE_API_URL_AUTH
    const {typeUser, user } = useSelector((state: RootState) => state.auth);
    const username = user.name + user.lastName + user.motherLastName

    useEffect(()=>{
        console.log(username)
        
    })

    return (


        <div className="accordion w-75" id="accordionExample">
           

            {
                classes.
                filter((cls: Class) => ((username == (cls.teacher.user.name? cls.teacher.user.name + cls.teacher.user.lastName + cls.teacher.user.motherLastName : "")) || (username == (cls.tutor?.user.name? cls.tutor?.user.name + cls.tutor?.user.lastName + cls.tutor?.user.motherLastName : "")))).
                map((cls: Class) => (
                    <div className="accordion-item" key={cls.id}>
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#clase-${cls.id}`} aria-expanded="true" aria-controls={`clase-${cls.id}`}>
                                <div className="d-flex align-items-center">
                                    <img
                                        style={{ borderRadius: '100%' }}
                                        width="35"
                                        className='me-2'
                                        src={unitIcon}
                                        alt="class image" />
                                    <span><strong>{cls.package.name} - {cls.subject.name}</strong> {/* El server no regresa carrera en clase cls.subject.career.name*/} </span>

                                </div>

                            </button>
                        </h2>
                        <div id={`clase-${cls.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">                           
                         <div className="accordion-body">
                             <div className="d-flex flex-column justify-content-center align-items-center flex-md-row justify-content-md-between align-items-md-start">
                                <div className="d-flex flex-column align-items-center mt-2">
                                    <img
                                        height={100}
                                        className="me-2 rounded-circle"
                                        style={{ width: '100%', maxWidth: '100px', objectFit: 'cover' }}
                                        src={cls.teacher.user.picture === "none" ? defaultUserImage : `${urlImage}/files/users/${cls.teacher.user.picture}`}
                                        alt="User image"
                                        onError={(e) => e.currentTarget.src = defaultUserImage}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="d-flex flex-column  m-3">
                                    <span className=""><strong>Profesor:</strong> {cls.teacher.user.name} {cls.teacher.user.lastName} {cls.teacher.user.motherLastName}</span>
                                    <span className=""><strong>Unidad: </strong>{cls.package.unitCampus.name}</span>
                                    <span className=""><strong>Clave: </strong>{cls.subject.clave}</span>
                                </div>
                                 <div className="mt-auto me-2 mb-2">
                                    <NavLink  type="button"
                                        className="btn btn-primary" 
                                        onClick={()=>{dispatch(setSelectedClass(cls.id))}}
                                        to={`/justification?&classId=${cls.id}`}
                                        >Administrar Justificantes</NavLink>
                    
                                </div>
                                
                                <div className="mt-auto mb-2">
                                    <NavLink
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={()=>{dispatch(setSelectedClass(cls.id))}}
                                         to="/attendance">
                                        <span className='fs-6'>{typeUser == "Tutor" ? "Pasar lista" : "Ver lista"  }</span>
                                    </NavLink>
                                </div>
                            </div>




                        </div>
                        </div>

                    </div>
                ))
            }

        </div>

    )
}