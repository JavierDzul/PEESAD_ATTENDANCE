import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { careerSlice } from './carrer';
import { classSlice } from './Class';
import { listSlice } from './List/listSlice';
import { subjectSlice } from './subject';
import { UnitSlice } from './unit';
import { justificationSlice } from './justification/justificationSlice';
import { authApi } from '../services/api/authApi';
import { api } from '../services/peesadApi';

export const store :any= configureStore({
  reducer: {
    auth: authSlice.reducer,
    career: careerSlice.reducer,
    class: classSlice.reducer,
    subject: subjectSlice.reducer,
    unit: UnitSlice.reducer,
    list: listSlice.reducer,
    justification:justificationSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [api.reducerPath]: api.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
