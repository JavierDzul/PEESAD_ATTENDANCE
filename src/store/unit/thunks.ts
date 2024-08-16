import { AppDispatch } from "../store";
import Swal from "sweetalert2";
import { showErrorMessage, showLoading } from "../../helpers/alerts";
import { setIsLoading, setNewUnitToList, setUnitData, updateUnitInList } from "./unitSlice";
import { Unit } from "../../interfaces/unit-campus";
import { apiCreateUnit, apiGetAllUnits, apiSearchUnit, apiUpdateUnit } from "../../api/units-Providers";

export const startSetIsLoading = () => {
    return async (dispatch: AppDispatch) => {

        dispatch(setIsLoading(true));

    }
}

export const getAllUnit = (page: number = 1, limit: number = 10) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));

        try {
            const resp = await apiGetAllUnits(page, limit);
            dispatch(setUnitData({ unit: resp.data, total: resp.total, page, limit }));

        } catch (error: any) {
            console.log(error);
            showErrorMessage(error.message);
        }

        dispatch(setIsLoading(false));
    }
}


export const createUnit = (formData: Unit) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        showLoading();
        try {
            const { status, message, data } = await apiCreateUnit(formData);
            if (status) {
                dispatch(setNewUnitToList(data));
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Unidad creado con éxito.'
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

export const updateUnit = (id: number, formData: Unit) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        showLoading();
        try {
            const { status, message, data } = await apiUpdateUnit(id, formData);
            if (status) {
                dispatch(updateUnitInList(data));
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Unidad editado con éxito.'
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

export const searchUnit = (keyword: string, page: number = 1, limit: number = 10) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        try {
            const resp = await apiSearchUnit(keyword, page, limit)
            dispatch(setUnitData({ unit: resp.data, total: resp.total, page, limit }));

        } catch (error: any) {
            console.log(error);
            showErrorMessage(error.message);
        }

        dispatch(setIsLoading(false));
    }
}
