import * as yup from 'yup';

export const createClassSchema = yup.object().shape({
  package: yup.string().required('Este campo es requerido.'),
  subject: yup.string().required('Este campo es requerido.'),
  teacher: yup.string().required('Este campo es requerido.'),
});

export const updateClassSchema = yup.object().shape({
  package: yup.string().required('Este campo es requerido.'),
  subject: yup.string().required('Este campo es requerido.'),
  teacher: yup.string().required('Este campo es requerido.'),
  isCurrent: yup.boolean().required('Este campo es requerido.'),
  isDeleted: yup.boolean().required('Este campo es requerido.'),
});
