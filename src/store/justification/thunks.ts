import Swal from "sweetalert2";
import { apiCreateJustification, apiGetAllJustification, apiUpdateJustification } from "../../api/justification-Providers";
import { showErrorMessage } from "../../helpers/alerts";
import { AppDispatch } from "../store";
import { setIsLoading, setJustificationData, setNewJustificationToList, updateJustificationInList } from "./justificationSlice";


export interface CreateJustification{
    type: string;
    description: string;
    startDate: string;
    endDate:string;
    studentId: number;
    classId:number
}
export interface JustificationQueryParams {
    page: number; // Número de página
    limit: number; // Número de resultados por página
    isDeleted?: boolean; // Indica si está eliminado (opcional)
   studentId?:number;
   startDate?:string;
   type?:string
   classId?:number
  }

  export const getAllJustifications = (params: JustificationQueryParams) => {
    return async (dispatch: AppDispatch) => {
      dispatch(setIsLoading(true));
      try {
        const resp = await apiGetAllJustification(params);
        dispatch(
          setJustificationData({
            data: resp.data,
            total: resp.total,
            page: resp.page,
            limit: resp.limit,
          }),
        );
         console.log(params);
        console.log(resp);
      } catch (error: any) {
        showErrorMessage(error.message);
      }
    };
  };

  export const createJustification = (formData: CreateJustification) => {
    return async (dispatch: AppDispatch) => {
      try{  
        const resp = await apiCreateJustification(formData);
        if (resp.status){ 
          dispatch(setNewJustificationToList(resp.data));
        
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Justificante creado con éxito.',
          });
        }
      }
      catch(e){
        showErrorMessage("Error al crear justificante"
        );

      }
      
    };
    
  };
  export interface  updateJustification  {
    type?: string,
    description?: string,
    date?: string,
    isDeleted? : boolean,

  };

  export const updateJustification = (id: number, formData:updateJustification ) => {
    return async (dispatch: AppDispatch) => {
      dispatch(setIsLoading(true));
      try {
        console.log(formData,id)
        const { status, message, data } = await apiUpdateJustification(id, formData);
        if (status) {
          console.log(data)
          dispatch(updateJustificationInList(data));
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
      dispatch(setIsLoading(false));
    };
  };