import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { ClassQueryParams, getAllClass } from "../../../store/Class/thunks";
import { useEffect, useState } from "react";
import { getAllCareer } from "../../../store/carrer/thunks";
import { getAllSubject } from "../../../store/subject/thunks";
import { Subject } from "../../../interfaces/subject";
import { CareerState } from "../../../store/carrer";

export const            SearchClass = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { careers }: CareerState = useSelector((state: RootState) => state.career);
    const subjects: Subject[] = useSelector((state: RootState) => state.subject.data);

    const [semesters, setSemesters] = useState<number[] | undefined>(undefined);
    const [career, setCareer] = useState<string | undefined>(undefined);
    const [subject, setSubject] = useState<string | undefined>(undefined);
    const [semester, setSemester] = useState<string | undefined>(undefined);
    const [params, setParams] = useState<ClassQueryParams>({ page: 1, limit: 10 });

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>, inputName: string) => {
        const value = event.target.value;

        switch (inputName) {
            case 'career':
                setCareer(value);
                setSubject(undefined);
                setSemesters(undefined);
                if (value) {
                    const selectedCareer = careers.find((item) => item.id === +value);
                    const maxSemester = selectedCareer ? parseInt(selectedCareer.semester) : 0;
                    setSemesters(Array.from({ length: maxSemester }, (_, i) => i + 1));
                    dispatch(getAllSubject({ page: 1, limit: 1000, idCareer: value, semester, isActive: 'true' }));
                } else {
                    setSemester(undefined);
                    dispatch(getAllSubject({ page: 1, limit: 1000, isActive: 'true' }));
                }
                break;
            case 'semester':
                setSemester(value);
                setSubject(undefined);
                if (value) {
                    dispatch(getAllSubject({ page: 1, limit: 1000, idCareer: career, semester: value, isActive: 'true' }));
                } else {
                    dispatch(getAllSubject({ page: 1, limit: 1000, isActive: 'true' }));
                }
                break;
            case 'subject':
                setSubject(value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setParams({ page: 1, limit: 10, idCareer: career, semester, subjectId: subject, isDeleted: false });
    }, [career, semester, subject]);

    useEffect(() => {
        dispatch(getAllCareer(1, 100));
        dispatch(getAllSubject({ page: 1, limit: 1000, isActive: 'true' }));
    }, [dispatch]);

    useEffect(() => {
        console.log(params);
        dispatch(getAllClass(params));
    }, [params, dispatch]);

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Buscar Clases</h4>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label">Carrera</label>
                                <select
                                    className="form-select"
                                    value={career || ''}
                                    onChange={(e) => handleOnChange(e, 'career')}
                                >
                                    <option value="">Seleccione una opción</option>
                                    {careers.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label">Semestre</label>
                                <select
                                    className="form-select"
                                    value={semester || ''}
                                    onChange={(e) => handleOnChange(e, 'semester')}
                                    disabled={!semesters}
                                >
                                    <option value="">Seleccione una opción</option>
                                    {semesters?.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label">Materia</label>
                                <select
                                    className="form-select"
                                    value={subject || ''}
                                    onChange={(e) => handleOnChange(e, 'subject')}
                                >
                                    <option value="">Seleccione una opción</option>
                                    {subjects.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
