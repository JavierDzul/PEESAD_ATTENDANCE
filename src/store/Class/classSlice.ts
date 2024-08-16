import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Class } from '../../interfaces/class';

export interface classState {
  isLoading: boolean;
  classes: Class[];
  selectedClass: Class | null; // Nueva propiedad para la clase seleccionada
  limit: number;
  page: number;
  total: number;
}

const initialState: classState = {
  isLoading: false,
  classes: [],
  selectedClass: null, // Inicializado como null
  limit: 10,
  page: 1,
  total: 0,
};

export const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    resetClassState: (state) => {
      state.limit = 10;
      state.page = 1;
      state.total = 0;
      state.classes = [];
      state.selectedClass = null; // Reset también de la clase seleccionada
    },

    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    setClassData: (
      state,
      action: PayloadAction<{
        data: Class[];
        total: number;
        page: number;
        limit: number;
      }>,
    ) => {
      const { data, total, page, limit } = action.payload;
      state.classes = data;
      state.total = total;
      state.page = page;
      state.limit = limit;
    },
    setNewClassToList: (state, { payload }: PayloadAction<Class>) => {
      state.classes = [payload, ...(state.classes as Class[])];
    },
    updateClassInList: (state, { payload }: PayloadAction<Class>) => {
      const index = state.classes.findIndex((c) => c.id === payload.id);
      if (index !== -1) {
        state.classes[index] = payload;
      }
    },
    SetSelectedClass: (state, { payload }: PayloadAction<Class|null>) => {
      state.selectedClass = payload; // Nuevo reducer para establecer la clase seleccionada
    },
  },
});

export const {
  resetClassState,
  setIsLoading,
  setClassData,
  setNewClassToList,
  updateClassInList,
  SetSelectedClass, // Asegúrate de exportar la nueva acción
} = classSlice.actions;
