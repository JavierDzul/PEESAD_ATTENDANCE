import { axiosWithToken } from "../helpers/axios";
import { CreateJustification, JustificationQueryParams, updateJustification } from "../store/justification/thunks";

export const apiGetAllJustification = async (queryParams:JustificationQueryParams) =>{
    try {
        const searchParams = new URLSearchParams();

        if (queryParams.page !== undefined) {
          searchParams.append('page', queryParams.page.toString());
        }
      
        if (queryParams.limit !== undefined) {
          searchParams.append('limit', queryParams.limit.toString());
        }
      
       
        if (queryParams.isDeleted !== undefined) {
          searchParams.append('isDeleted', queryParams.isDeleted.toString());
        }
        if (queryParams.startDate !== undefined) {
          searchParams.append('day', queryParams.startDate.toString());
        }
        if (queryParams.studentId !== undefined) {
          searchParams.append('studentId', queryParams.studentId.toString());
        }
        if (queryParams.classId !== undefined) {
            searchParams.append('classId', queryParams.classId.toString());
          }
        if (queryParams.type !== undefined) {
          searchParams.append('type', queryParams.type.toString());
        }
      
       

        return await axiosWithToken(`/justifications/find?${searchParams.toString()}`);
    } catch (error:any) {
        console.log(error);
        return{
            status: false,
            message:error.message,
        };
    }
}

export const apiCreateJustification = async (formData: CreateJustification)=>{
    try{
         return await axiosWithToken(`/justifications/create`, formData, 'POST');
      }catch(error:any){
        console.log(error);
            return{
              status: false,
              message:error.message,
          };
      }
}

export const apiUpdateJustification = async (id:number, formData : updateJustification) => {
  try {
      return await axiosWithToken(`/justifications/update/${id}`, formData, 'PATCH');
  } catch (error:any) {
      console.log(error);
      return {
          status: false,
          message: error.message
      }
  }
}
