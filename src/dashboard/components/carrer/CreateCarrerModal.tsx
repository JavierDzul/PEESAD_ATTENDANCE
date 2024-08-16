import { Dispatch, FC, SetStateAction } from "react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCareer } from "../../../store/carrer/thunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const CreateCarrerModal: FC<Props> = ({ setShowModal }) => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        handleSubmit,
        errors,
        touched,
        resetForm,
        getFieldProps } = useFormik({
            initialValues: {
                name: '',
                key: '',
                semester: '',
            },
            onSubmit: async (values) => {
                dispatch(createCareer(values));
                resetForm();
                setShowModal(false)
            },
            validationSchema: Yup.object({
                name: Yup.string()
                    .required('Este campo es requerido.'),
                key: Yup.string()
                    .required('Este campo es requerido.'),
                semester: Yup.string()
                    .required('Este campo es requerido.'),
            }),

        })



    return (
        <div className="modal" tabIndex={-1} style={{ display: 'block', background: 'rgba(0,0,0,.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar carrera</h5>
                        <button
                            type="button"
                            className="btn-close btn-outline-secondary"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form
                            noValidate
                            onSubmit={handleSubmit}
                            autoComplete='off'
                            className="row mb-5">
                            <div className=" mt-3">
                                <label className="btn-outline-secondary">Carrera</label>
                                <input
                                    type="text"
                                    {...getFieldProps('name')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.name && errors.name && <span className="text-danger">{errors.name}</span>}

                            </div>
                            <div className=" mt-3">
                                <label className="btn-outline-secondary">Clave</label>
                                <input
                                    type="text"
                                    {...getFieldProps('key')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.key && errors.key && <span className="text-danger">{errors.key}</span>}

                            </div>
                            <div className=" mt-3">
                                <label className="btn-outline-secondary">No. Semestres</label>
                                <input
                                    type="text"
                                    {...getFieldProps('semester')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.semester && errors.semester && <span className="text-danger">{errors.semester}</span>}

                            </div>



                            <div className="text-end mt-4">
                                <button
                                    type='submit'
                                    className="btn btn-primary">Guardar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>)


}
