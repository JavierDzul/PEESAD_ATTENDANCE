import { axiosWithToken } from "../helpers/axios";
import { SubjectQueryParams } from "../store/subject/thunks";

export const apiGetAllSubject = async (queryParams:SubjectQueryParams) =>{
    try {
        const searchParams = new URLSearchParams();

        if (queryParams.page !== undefined) {
          searchParams.append('page', queryParams.page.toString());
        }
      
        if (queryParams.limit !== undefined) {
          searchParams.append('limit', queryParams.limit.toString());
        }
      
        if (queryParams.idCareer !== undefined) {
          searchParams.append('idCareer', queryParams.idCareer.toString());
        }
      
        if (queryParams.isActive !== undefined) {
          searchParams.append('isActive', queryParams.isActive.toString());
        }
      
        if (queryParams.name !== undefined) {
          searchParams.append('name', queryParams.name.toString());
        }
      
        if (queryParams.semester !== undefined) {
          searchParams.append('semester', queryParams.semester.toString());
        }
      

        return await axiosWithToken(`/subjects/findAll?${searchParams.toString()}`);
    } catch (error:any) {
        console.log(error);
        return{
            status: false,
            message:error.message,
        };
    }
}