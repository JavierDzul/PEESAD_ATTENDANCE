import Swal from 'sweetalert2';
import {
  apiCreateClass,
  apiGetAllClass,
  apiUpdateClass,
} from '../../api/classes-Providers';
import { showErrorMessage, showLoading } from '../../helpers/alerts';
import { Class, CreateClass } from '../../interfaces/class';
import { AppDispatch, RootState } from '../store';
import {
  SetSelectedClass,
  classState,
  setClassData,
  setIsLoading,
  setNewClassToList,
  updateClassInList,
} from './classSlice';
import { getList } from '../List/thunks';

// Interfaz para los parámetros de consulta
export interface ClassQueryParams {
  page: number; // Número de página
  limit: number; // Número de resultados por página
  teacherId?: number; // ID del profesor (opcional)
  tutorId?: number; // ID del profesor (opcional)
  isDeleted?: boolean; // Indica si está eliminado (opcional)
  isCurrent?: boolean; // Indica si es actual (opcional)
  packageId?: number; // ID del paquete (opcional)
  subjectId?: string | undefined; // ID de la materia (opcional)
  semester?: string;
  idCareer?: string;
  relationCheck?: boolean;
}

export const setSelectedClass = (classId: number) => {
 
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setIsLoading(true));
    
    try {
      if(classId==-1){
        dispatch(SetSelectedClass(null));
        dispatch(getList({id:-1}))
        return;
      }
      const { classes } : classState= getState().class;
      const selectedClass = classes.find((c) => c.id === classId);
      if (selectedClass) {
        dispatch(SetSelectedClass(selectedClass));
      } else {
        throw new Error('Clase no encontrada');
      }
    } catch (error: any) {
      showErrorMessage(error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const getAllClass = (params: ClassQueryParams) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
      const resp = await apiGetAllClass(params);
      dispatch(
        setClassData({
          data: resp.data,
          total: resp.total,
          page: resp.page,
          limit: resp.limit,
        }),
      );
      // console.log(params);
      // console.log(resp);
    } catch (error: any) {
      showErrorMessage(error.message);
    }
  };
};

export const createClass = (formData: CreateClass) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await apiCreateClass(formData);
      if (resp.status) {
        dispatch(setNewClassToList(resp.status));
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Clase creada con éxito.',
        });
      }
    } catch (error: any) {
      showErrorMessage(error.message);
    }
  };
};

export const updateClass = (id: number, formData: Class) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    showLoading();
    try {
      const { status, message, data } = await apiUpdateClass(id, formData);
      if (status) {
        dispatch(updateClassInList(data));
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Clase editada con éxito.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: message,
        });
      }
    } catch (error: any) {
      console.log(error);
      showErrorMessage(error.message);
    }
  };
};
