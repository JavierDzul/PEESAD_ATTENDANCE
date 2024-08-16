
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { Student } from '../../interfaces/student';

export interface StudentState {
    isLoading: boolean;
    student: Student[];
    limit: number;
    page: number;
    total: number;
    itemSelected?: string
}



const initialState: StudentState = {
    isLoading: false,
    student: [],
    limit: 10,
    page: 1,
    total: 0,
}

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        resetStudentState: (state) => {
            state.limit = 10;
            state.page = 1;
            state.total = 0;
            state.student = [];
        },

        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },

        setStudentData: (state, action: PayloadAction<{ student: Student[]; total: number; page: number; limit: number }>) => {
            const { student, total, page, limit } = action.payload;
            state.student = student;
            state.total = total;
            state.page = page;
            state.limit = limit;
        },
        setNewStudentToList: (state, { payload }: PayloadAction<Student>) => {
            state.student = [
                payload,
                ...state.student as Student[]
            ];
        },
        updateStudentInList: (state, { payload }: PayloadAction<Student>) => {
            const index = state.student.findIndex(c => c.id === payload.id);
            if (index !== -1) {
                state.student[index] = payload;
            }
        },


    }
});

export const {
    resetStudentState,
    setIsLoading,
    setStudentData,
    setNewStudentToList,
    updateStudentInList
} = studentSlice.actions;