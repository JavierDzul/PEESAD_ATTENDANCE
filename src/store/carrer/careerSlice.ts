
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { Career } from '../../interfaces/career';

export interface CareerState {
    isLoading: boolean;
    careers: Career[];
    limit: number;
    page: number;
    total: number;
    selectedCareerDetails: Career | null;

}



const initialState: CareerState = {
    isLoading: false,
    careers: [],
    limit: 10,
    page: 1,
    total: 0,
    selectedCareerDetails: null,

}

export const careerSlice = createSlice({
    name: 'career',
    initialState,
    reducers: {
        resetCareerState: (state) => {
            state.limit = 10;
            state.page = 1;
            state.total = 0;
            state.careers = [];
        },

        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },

        setSelectedCareerDetails: (state, action: PayloadAction<Career | null>) => {
            state.selectedCareerDetails = action.payload;
          },

        setCareerData: (state, action: PayloadAction<{ career: Career[]; total: number; page: number; limit: number }>) => {
            const { career, total, page, limit } = action.payload;
            state.careers = career;
            state.total = total;
            state.page = page;
            state.limit = limit;
        },
        setNewCareerToList: (state, { payload }: PayloadAction<Career>) => {
            state.careers = [
                payload,
                ...state.careers as Career[]
            ];
        },
        updateCareerInList: (state, { payload }: PayloadAction<Career>) => {
            const index = state.careers.findIndex(c => c.id === payload.id);
            if (index !== -1) {
                state.careers[index] = payload;
            }
        },


    }
});

export const {
    resetCareerState,
    setIsLoading,
    setCareerData,
    setNewCareerToList,
    updateCareerInList,
    setSelectedCareerDetails
} = careerSlice.actions;