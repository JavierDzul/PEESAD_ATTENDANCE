import { axiosWithToken } from "../helpers/axios";
import { AttendanceUpdate } from "../interfaces/attendance";
import { ListQueryParams } from "../store/List/thunks";

export const apiGetAllList = async (queryParams:ListQueryParams) =>{
    try {
        const searchParams = new URLSearchParams();
        if (queryParams.lastOnly !== undefined) {
          searchParams.append('lastOnly', queryParams.lastOnly.toString());
        }
        if (queryParams.partial !== undefined) {
            searchParams.append('partial', queryParams.partial.toString());
          }

        if (queryParams.id !== undefined) {
          searchParams.append('classId', queryParams.id.toString());
        }
      
        if (queryParams.startDate !== undefined) {
          searchParams.append('startDate', queryParams.startDate.toString());
        }
      
        if (queryParams.endDate !== undefined) {
          searchParams.append('endDate', queryParams.endDate.toString());
        }
       

        return await axiosWithToken(`/attendance/by-Range?${searchParams.toString()}`);
    } catch (error:any) {
        console.log(error);
        return{
            status: false,
            message:error.message,
        };
    }
}

export const apiUpdateList = async (id:number, formData : AttendanceUpdate) => {
    try {
        return await axiosWithToken(`/attendance/update/${id}`, formData, 'PATCH');
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
  }
  