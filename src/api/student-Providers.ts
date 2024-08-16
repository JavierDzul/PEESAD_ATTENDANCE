import { axiosWithToken } from "../helpers/axios";
import { Student } from "../interfaces/student";


export const apiGetAllStudents = async (page : number, limit : number) =>{
    try {
        return await axiosWithToken(`/class/findStudents?page=${page}&limit=${limit}`);
    } catch (error:any) {
        console.log(error);
        return{
            status: false,
            message:error.message,
        };
    }
}
export const apiCreateStudents = async (formData : Student) => {
    try {
        
        return await axiosWithToken(`/students/create`, formData, 'POST');
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}

export const apiMultiCreateStudents = async (formData : Student[], idCareer: number, idUnitCampus: number, semester: number) => {
    try {
        
        return await axiosWithToken(`/students/multicreate`, {formData,idCareer,idUnitCampus,semester}, 'POST');
    } catch (error:any) {
        return {
            status: false,
            message: error
        }
    }
}

export const apiUpdateStudents = async (id:number, formData : Student) => {
    try {
        return await axiosWithToken(`/students/update/${id}`, formData, 'PATCH');
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}

export const apiSearchStudents = async (keyword: string, page : number, limit : number) => {
    try {
        return await axiosWithToken(`/students/search?keyword=${keyword}&page=${page}&limit=${limit}`);
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}