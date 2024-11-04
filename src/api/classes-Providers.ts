import { axiosWithoutToken, axiosWithToken } from "../helpers/axios";
import { Class, CreateClass } from "../interfaces/class";
import { ClassQueryParams } from "../store/Class/thunks";
/*
export const apiGetAllClass = async (queryParams:ClassQueryParams) =>{
    try {
        const searchParams = new URLSearchParams();

        if (queryParams.page !== undefined) {
          searchParams.append('page', queryParams.page.toString());
        }
      
        if (queryParams.limit !== undefined) {
          searchParams.append('pageSize', queryParams.limit.toString());
        }
      
        if (queryParams.teacherId !== undefined) {
          searchParams.append('teacherId', queryParams.teacherId.toString());
        }
        if (queryParams.idCareer !== undefined) {
          searchParams.append('idCareer', queryParams.idCareer.toString());
        }
        if (queryParams.semester !== undefined) {
          searchParams.append('semester', queryParams.semester.toString());
        }
        if (queryParams.isDeleted !== undefined) {
          searchParams.append('isDeleted', queryParams.isDeleted.toString());
        }
      
        if (queryParams.isCurrent !== undefined) {
          searchParams.append('isCurrent', queryParams.isCurrent.toString());
        }
      
        if (queryParams.packageId !== undefined) {
          searchParams.append('packageId', queryParams.packageId.toString());
        }
      
        if (queryParams.subjectId !== undefined) {
          searchParams.append('subjectId', queryParams.subjectId.toString());
        }

        if (queryParams.relationCheck !== undefined) {
          searchParams.append('relationCheck', queryParams.relationCheck.toString());
        }

        const response = await axiosWithoutToken(`/class/findAll?${searchParams.toString()}`);
        console.log(response);
        return response; 
    } catch (error:any) {
        console.log(error);
        return{
            status: false,
            message:error.message,
        };
    }
}*/

export const apiGetAllClass = async (queryParams: ClassQueryParams) => {
  try {
    const searchParams = new URLSearchParams();
    const TypeUser = localStorage.getItem("TypeUser");
    const teacherId = localStorage.getItem("teacherId");

    if (TypeUser === "Profesor") {
      if (teacherId) {
        searchParams.append("teacherId", teacherId);
      } else {
        throw new Error("teacherId no encontrado en localStorage");
      }
    }
    else if (TypeUser === "Tutor") {
      if (teacherId) {
        searchParams.append("tutorId", teacherId);
      } else {
        throw new Error("teacherId no encontrado en localStorage");
      }
    }

    if (queryParams.page !== undefined) {
      searchParams.append("page", queryParams.page.toString());
    }

    if (queryParams.limit !== undefined) {
      searchParams.append("pageSize", queryParams.limit.toString());
    }

    const response = await axiosWithoutToken(`/class/findAll?${searchParams.toString()}`);
    console.log("API response:", response.data);
    return response;
  } catch (error: any) {
    console.log("Error en apiGetAllClass:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};

export const apiCreateClass = async (formData: CreateClass) => {
  try {
    return await axiosWithToken(`/class/create`, formData, 'POST');
  } catch (error: any) {
    console.log(error);
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
}


export const apiUpdateClass = async (id: number, formData: Class) => {
  try {
    return await axiosWithToken(`/class/update/${id}`, formData, 'PATCH');
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message
    }
  }
}

