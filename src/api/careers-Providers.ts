import { axiosWithToken } from "../helpers/axios";
import { CareerDtoUpdate } from "../interfaces/career";


export const apiGetAllCareer = async (page : number, limit : number) =>{
    try {
        return await axiosWithToken(`/career/findAll?page=${page}&limit=${limit}`);
    } catch (error:any) {
        console.log(error);
        return{
            status: false,
            message:error.message,
        };
    }
}
export const apiCreateCareer = async (formData : any) => {
    try {
        return await axiosWithToken(`/career/create`, formData, 'POST');
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}

export const apiUpdateCareer = async (id:number, formData : CareerDtoUpdate) => {
    try {
        return await axiosWithToken(`/career/update/${id}`, formData, 'PATCH');
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}
export const apiGetAllCareerById = async (id:number) => {
    try {
        return await axiosWithToken(`/career/find/${id}`, 'PATCH');
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}

export const apiSearchCareer = async (keyword: string, page : number, limit : number) => {
    try {
        return await axiosWithToken(`/career/search?keyword=${keyword}&page=${page}&limit=${limit}`);
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}

export const apiSearchCareerById = async (id: number) => {
    try {
        return await axiosWithToken(`/career/find/${id}`);
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}