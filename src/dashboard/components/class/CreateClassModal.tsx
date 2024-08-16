import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Class } from '../../../interfaces/class';
import { Package } from '../../../interfaces/package';
import { ApiResponse } from '../../../interfaces/response';
import { ApiResponseAll } from '../../../interfaces/response-all';
import { Subject } from '../../../interfaces/subject';
import { Teacher } from '../../../interfaces/teacher';
import { createClassSchema } from '../../../schemas/class.schema';

type CreateClassModalProps = {
  onDismiss: () => void;
};

export default function CreateClassModal({ onDismiss }: CreateClassModalProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      package: '',
      subject: '',
      teacher: '',
    },
    onSubmit: () => {
      handleCreateClass();
      console.log(
        `Created with: ${values.package}, ${values.subject} and ${values.teacher}`,
      );
      onDismiss();
    },
    validationSchema: createClassSchema,
  });

  useEffect(() => {
    Promise.all([
      axios.get<ApiResponseAll<Package>>(
        'http://localhost:3000/api/package/findAll?page=1&limit=0&isActive=true',
      ),
      axios.get<ApiResponseAll<Subject>>(
        'http://localhost:3000/api/subjects/findAll?page=1&limit=0&isActive=true',
      ),
      axios.get<ApiResponseAll<Teacher>>(
        'http://localhost:3000/api/teachers?page=1&limit=0&isActive=true',
      ),
    ])
      .then(([packages, subjects, teachers]) => {
        setPackages(packages.data.data);
        setSubjects(subjects.data.data);
        setTeachers(teachers.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCreateClass = async () => {
    try {
      const response = await axios.post<ApiResponse<Class>>(
        'http://localhost:3000/api/class/create',
        {
          package_id: values.package,
          subject_id: values.subject,
          teacher_id: values.teacher,
        },
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className='modal'
      tabIndex={-1}
      style={{ display: 'block', background: 'rgba(0, 0, 0, .5)' }}
    >
      <div
        className='modal-dialog modal-lg modal-dialog-centered'
        role='document'
      >
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Nueva clase</h5>
            <button
              type='button'
              className='btn-close btn-outline-secondary'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={onDismiss}
            ></button>
          </div>

          <div className='modal-body'>
            <div className='container'>
              <form noValidate onSubmit={handleSubmit} autoComplete='off'>
                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='package'>Paquete</label>
                    <select
                      className='form-select mt-2'
                      id='package'
                      name='package'
                      value={values.package}
                      onChange={handleChange}
                    >
                      <option value=''>Selecciona una opción</option>
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name}
                        </option>
                      ))}
                    </select>
                    {errors.package && touched.package && (
                      <span className='text-danger'>{errors.package}</span>
                    )}
                  </div>
                  <div className='col-md-6 mb-'>
                    <label htmlFor='subject'>Materia</label>
                    <select
                      className='form-select mt-2'
                      id='subject'
                      name='subject'
                      value={values.subject}
                      onChange={handleChange}
                    >
                      <option value=''>Selecciona una opción</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                    {errors.subject && touched.subject && (
                      <span className='text-danger'>{errors.subject}</span>
                    )}
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='teacher'>Maestro</label>
                  <select
                    className='form-select mt-2'
                    id='teacher'
                    name='teacher'
                    value={values.teacher}
                    onChange={handleChange}
                  >
                    <option value=''>Selecciona una opción</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.user.fullName}
                      </option>
                    ))}
                  </select>
                  {errors.teacher && touched.teacher && (
                    <span className='text-danger'>{errors.teacher}</span>
                  )}
                </div>

                <button
                  type='submit'
                  className='btn btn-primary btn-large btn-block'
                >
                  Crear clase
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
