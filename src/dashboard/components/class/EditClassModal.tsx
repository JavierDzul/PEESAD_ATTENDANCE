import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Class } from '../../../interfaces/class';
import { Package } from '../../../interfaces/package';
import { ApiResponse } from '../../../interfaces/response';
import { ApiResponseAll } from '../../../interfaces/response-all';
import { Subject } from '../../../interfaces/subject';
import { Teacher } from '../../../interfaces/teacher';
import { updateClassSchema } from '../../../schemas/class.schema';

type EditClassModalProps = {
  cls: Class;
  onDismiss: () => void;
};

export default function EditClassModal({
  cls,
  onDismiss,
}: EditClassModalProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      package: cls.package.id.toString(),
      subject: cls.subject.id.toString(),
      teacher: cls.teacher.id ? cls.teacher.id.toString() : '',
      isCurrent: cls.isCurrent,
      isDeleted: cls.isDeleted,
    },
    onSubmit: () => {
      handleUpdateClass();
      console.log(
        `Edited with: ${values.package}, ${values.subject} and ${values.teacher}`,
      );
      onDismiss();
    },
    validationSchema: updateClassSchema,
  });

  useEffect(() => {
    Promise.all([
      axios.get<ApiResponseAll<Package>>(
        'https://academico.peesadqroo.com/api/package/findAll?page=1&limit=0&isActive=true',
      ),
      axios.get<ApiResponseAll<Subject>>(
        'https://academico.peesadqroo.com/api/subjects/findAll?page=1&limit=0&isActive=true',
      ),
      axios.get<ApiResponseAll<Teacher>>(
        'https://academico.peesadqroo.com/api/teachers?page=1&limit=0&isActive=true',
      ),
    ])
      .then(([packages, subjects, teachers]) => {
        setPackages(packages.data.data);
        setSubjects(subjects.data.data);
        setTeachers(teachers.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleUpdateClass = async () => {
    try {
      const response = await axios.patch<ApiResponse<Class>>(
        `https://academico.peesadqroo.com/api/class/update/${cls.id}`,
        {
          packageId: values.package,
          subjectId: values.subject,
          teacherId: values.teacher,
          isCurrent: values.isCurrent,
          isDeleted: values.isDeleted,
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
            <h5 className='modal-title'>Editar clase</h5>
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
                    <label htmlFor='package' className='btn-outline-secondary'>
                      Paquete
                    </label>
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
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='subject' className='btn-outline-secondary'>
                      Materia
                    </label>
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
                  <label htmlFor='teacher' className='btn-outline-secondary'>
                    Maestro
                  </label>
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
                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <div className='form-check form-switch form-check-reverse'>
                      <input
                        type='checkbox'
                        name='isCurrent'
                        id='isCurrent'
                        className='form-check-input'
                        role='switch'
                        checked={values.isCurrent}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor='isCurrent'
                        className='btn-outline-secondary'
                      >
                        Está habilitada
                      </label>
                      {errors.isCurrent && touched.isCurrent && (
                        <span className='text-danger'>{errors.isCurrent}</span>
                      )}
                    </div>
                  </div>
                  <div className='col-md-6 mb-3'>
                    <div className='form-check form-switch form-check-reverse'>
                      <input
                        type='checkbox'
                        name='isDeleted'
                        id='isDeleted'
                        className='form-check-input'
                        role='switch'
                        checked={values.isDeleted}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor='isDeleted'
                        className='btn-outline-secondary'
                      >
                        Está eliminada
                      </label>
                      {errors.isDeleted && touched.isDeleted && (
                        <span className='text-danger'>{errors.isDeleted}</span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type='submit'
                  className='btn btn-primary btn-large btn-block'
                >
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
