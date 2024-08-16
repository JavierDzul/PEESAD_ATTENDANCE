import { axiosWithToken } from "../helpers/axios";
import { Unit } from "../interfaces/unit-campus";


export const apiGetAllUnits = async (page : number, limit : number) =>{
    try {
        return await axiosWithToken(`/unit-campus/findAll?page=${page}&limit=${limit}`);
    } catch (error:any) {
        console.log(error);
        return{
            status: false,
            message:error.message
        };
    }
}

export const apiCreateUnit = async (formData : any) => {
    try {
        return await axiosWithToken(`/unit-campus/create`, formData, 'POST');
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}

export const apiUpdateUnit = async (id:number, formData : Unit) => {
    try {
        return await axiosWithToken(`/unit-campus/update/${id}`, formData, 'PATCH');
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}

export const apiSearchUnit = async (keyword: string, page : number, limit : number) => {
    try {
        return await axiosWithToken(`/unit-campus/search?keyword=${keyword}&page=${page}&limit=${limit}`);
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}

export const apiSearchUnitById = async (id : number) => {
    try {
        return await axiosWithToken(`/unit-campus/find/${id}`);
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}