
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { Unit } from '../../interfaces/unit-campus';


export interface UnitState {
    isLoading: boolean;
    unit: Unit[];
    limit: number;
    page: number;
    total: number;
}

const initialState: UnitState = {
    isLoading: false,
    unit: [],
    limit: 10,
    page: 1,
    total: 0,
}

export const UnitSlice = createSlice({
    name: 'unit',
    initialState,
    reducers: {
        resetUnitState: (state) => {
            state.limit = 10;
            state.page = 1;
            state.total = 0;
            state.unit = [];
        },

        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },

        setUnitData: (state, action: PayloadAction<{ unit: Unit[]; total: number; page: number; limit: number }>) => {
            const { unit, total, page, limit } = action.payload;
            state.unit = unit;
            state.total = total;
            state.page = page;
            state.limit = limit;
        },
        setNewUnitToList: (state, { payload }: PayloadAction<Unit>) => {
            state.unit = [
                payload,
                ...state.unit as Unit[]
            ];
        },
        updateUnitInList: (state, { payload }: PayloadAction<Unit>) => {
            const index = state.unit.findIndex(c => c.id === payload.id);
            if (index !== -1) {
                state.unit[index] = payload;
            }
        },


    }
});

export const {
    resetUnitState,
    setIsLoading,
    setUnitData,
    setNewUnitToList,
    updateUnitInList
} = UnitSlice.actions;
