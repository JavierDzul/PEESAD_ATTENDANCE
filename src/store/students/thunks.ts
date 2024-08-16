import { AppDispatch } from "../store";
import Swal from "sweetalert2";
import { showErrorMessage, showLoading } from "../../helpers/alerts";
import { setIsLoading, setNewStudentToList, setStudentData, updateStudentInList } from "./studentSlice";
import { apiCreateStudents, apiGetAllStudents, apiSearchStudents, apiUpdateStudents } from "../../api/student-Providers";
import { Student } from "../../interfaces/student";


export const startSetIsLoading = () => {
    return async (dispatch: AppDispatch) => {

        dispatch(setIsLoading(true));

    }
}

export const getAllStudent = (page: number = 1, limit: number = 10 ) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));

        try {
            const resp = await apiGetAllStudents(page, limit)
            dispatch(setStudentData({ student: resp.data, total: resp.total, page, limit }));
        } catch (error: any) {
            console.log(error);
            showErrorMessage(error.message);
        }

        dispatch(setIsLoading(false));
    }
}

export const createStudent = (formData: Student) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        showLoading();
        try {
            const { status, message, data } = await apiCreateStudents(formData);
            if (status) {
                dispatch(setNewStudentToList(data));
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Estudiante creado con éxito.'
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


export const updateStudent = (id: number, formData: Student) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        showLoading();
        try {
            const { status, message, data } = await apiUpdateStudents(id, formData);
            if (status) {
                dispatch(updateStudentInList(data));
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Estudiante editado con éxito.'
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

export const searchStudent = (keyword: string, page: number = 1, limit: number = 10) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        try {
            const resp = await apiSearchStudents(keyword, page, limit)
            dispatch(setStudentData({ student: resp.data, total: resp.total, page, limit }));

        } catch (error: any) {
            console.log(error);
            showErrorMessage(error.message);
        }

        dispatch(setIsLoading(false));
    }
}

