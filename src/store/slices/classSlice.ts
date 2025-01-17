// src/store/slices/classSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Class } from '../../interfaces/class';

interface ClassState {
  selectedClass: Class | null;
}

const initialState: ClassState = {
  selectedClass: null,
};

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    selectClass(state, action) {
      state.selectedClass = action.payload;
    },
  },
});

export const { selectClass } = classSlice.actions;
export default classSlice.reducer;