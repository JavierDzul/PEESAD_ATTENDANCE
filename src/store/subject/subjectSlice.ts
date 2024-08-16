import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Subject } from "../../interfaces/subject";


export interface subjectState{
    isLoading: boolean;
    data: Subject[];
    limit: number;
    page: number;
    total: number;

}

const initialState: subjectState = {
    isLoading: false,
    data: [],
    limit: 1,  
    page: 1,   
    total: 0, 
  };


  export const subjectSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        resetSubjectState: (state) => {
            state.limit = 10;
            state.page = 1;
            state.total = 0;
            state.data = [];
        },

        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },

        setSubjectData: (state, action: PayloadAction<{ data: Subject[]; total: number; page: number; limit: number }>) => {
            const { data, total, page, limit } = action.payload;
            state.data = data
            state.total = total;
            state.page = page;
            state.limit = limit;
        },
        setNewSubjectToList: (state, { payload }: PayloadAction<Subject>) => {
            state.data= [
                payload,
                ...state.data as Subject[]
            ];
        },
        updateSubjectInList: (state, { payload }: PayloadAction<Subject>) => {
            const index = state.data.findIndex(c => c.id === payload.id);
            if (index !== -1) {
                state.data[index] = payload;
            }
        },


    }
});
  
export const {
    resetSubjectState,
    setIsLoading,
    setSubjectData,
    setNewSubjectToList,
    updateSubjectInList
} = subjectSlice.actions;