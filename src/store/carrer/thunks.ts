import { AppDispatch } from "../store";
import Swal from "sweetalert2";
import { setCareerData, setIsLoading, setNewCareerToList, setSelectedCareerDetails, updateCareerInList } from "./careerSlice";
import { showErrorMessage, showLoading } from "../../helpers/alerts";
import { apiCreateCareer, apiGetAllCareer, apiGetAllCareerById, apiSearchCareer, apiUpdateCareer } from "../../api/careers-Providers";
import { CareerDtoCreate, CareerDtoUpdate } from "../../interfaces/career";

export const startSetIsLoading = () => {
    return async (dispatch: AppDispatch) => {

        dispatch(setIsLoading(true));

    }
}

export const getAllCareer = (page: number = 1, limit: number = 10) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));

        try {
            const resp = await apiGetAllCareer(page, limit)
            dispatch(setCareerData({ career: resp.data, total: resp.total, page, limit }));
        } catch (error: any) {
            console.log(error);
            showErrorMessage(error.message);
        }

        dispatch(setIsLoading(false));
    }
}

export const createCareer = (formData: CareerDtoCreate) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        showLoading();
        try {
            const { status, message, data } = await apiCreateCareer(formData);
            if (status) {
                dispatch(setNewCareerToList(data));
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Carrera creado con éxito.'
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: message
                })
            }
        } catch (error: any) {
            console.log(error);
            showErrorMessage(error.message);
        }
    }
}

export const updateCareer = (id: number, formData: CareerDtoUpdate) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        showLoading();
        try {
            const { status, message, data } = await apiUpdateCareer(id, formData);
            if (status) {
                dispatch(updateCareerInList(data));
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Carrera editado con éxito.'
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: message
                })
            }
        } catch (error: any) {
            console.log(error);
            showErrorMessage(error.message);
        }
    }
}

export const fetchCareerById = (id: number) => {
    return async (dispatch: AppDispatch) => {
      dispatch(setIsLoading(true));
  
      try {
        const resp = await apiGetAllCareerById(id);
        if (resp.status) {
          dispatch(setSelectedCareerDetails(resp.data));
        } else {
          dispatch(setSelectedCareerDetails(null));
        }
      } catch (error: any) {
        console.log(error);
        dispatch(setSelectedCareerDetails(null));
      }
  
      dispatch(setIsLoading(false));
    }
  }
  
export const searchCareer = (keyword: string, page: number = 1, limit: number = 10) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        try {
            const resp = await apiSearchCareer(keyword, page, limit)
            dispatch(setCareerData({ career: resp.data, total: resp.total, page, limit }));

        } catch (error: any) {
            console.log(error);
            showErrorMessage(error.message);
        }

        dispatch(setIsLoading(false));
    }
}

