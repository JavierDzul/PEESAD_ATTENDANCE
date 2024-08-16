import { Justification } from "../../interfaces/justification";
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
export interface justificationState{
        isLoading: boolean;
        justifications: Justification[];
        selectedJustification: Justification | null;
        limit: number;
        page: number;
        total: number;
}

const initialState: justificationState = {
    isLoading: false,
    justifications: [],
    selectedJustification: null, // Inicializado como null
    limit: 10,
    page: 1,
    total: 0,
  };

export const justificationSlice = createSlice({
    name: 'justifications',
    initialState,
    reducers: {
      resetJustificationState: (state) => {
        state.limit = 10;
        state.page = 1;
        state.total = 0;
        state.justifications = [];
        state.selectedJustification = null; 
      },
  
      setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
        state.isLoading = payload;
      },
  
      setJustificationData: (
        state,
        action: PayloadAction<{
          data: Justification[];
          total: number;
          page: number;
          limit: number;
        }>,
      ) => {
        const { data, total, page, limit } = action.payload;
        state.justifications = data;
        state.total = total;
        state.page = page;
        state.limit = limit;
      },
      setNewJustificationToList: (state, { payload }: PayloadAction<Justification>) => {
        state.justifications = [payload, ...(state.justifications as Justification[])];
      },
      updateJustificationInList: (state, { payload }: PayloadAction<Justification>) => {
        const index = state.justifications.findIndex((c) => c.id === payload.id);
        if (index !== -1) {
          console.log(state.justifications, index)
          state.justifications[index] = payload;
        }
      },
      SetSelectedJustification: (state, { payload }: PayloadAction<Justification>) => {
        state.selectedJustification = payload; 
      },
    },
  });

  export const {
    resetJustificationState,
    setIsLoading,
    setJustificationData,
    setNewJustificationToList,
    updateJustificationInList,
    SetSelectedJustification, // Asegúrate de exportar la nueva acción
  } = justificationSlice.actions;