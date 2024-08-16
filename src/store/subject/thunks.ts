import { apiGetAllSubject } from "../../api/subjects-Providers";
import { AppDispatch } from "../store";
import { setIsLoading, setSubjectData } from "./subjectSlice";

export interface SubjectQueryParams {
    page: number; // Número de página
    limit: number; // Número de resultados por página
    isActive?:string;
    name?:string;
    idCareer?:string;
    semester?:string
  }
export const getAllSubject=(params: SubjectQueryParams)=>{
    return async (dispatch: AppDispatch)=>{
        if (params.page==0){
            dispatch(setSubjectData({ data: [], total: 0, page:0, limit:0 }));
            return;
        }
        dispatch(setIsLoading(true));
        try{
            const resp = await apiGetAllSubject(params)
            dispatch(setSubjectData({ data: resp.data, total: resp.total, page:resp.page, limit:resp.limit }));
        }catch(error:any){
            console.log(error);
        }
    }
}