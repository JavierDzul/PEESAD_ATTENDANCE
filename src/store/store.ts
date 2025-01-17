import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { careerSlice } from './carrer';
import { classSlice } from './Class';
import { listSlice } from './List/listSlice';
import { subjectSlice } from './subject';
import { UnitSlice } from './unit';
import { justificationSlice } from './justification/justificationSlice';
import { authApi } from '../services/api/authApi';
import classReducer from './slices/classSlice';
import { peesadApi } from '../services/peesadApi';

export const store :any= configureStore({
  reducer: {
    auth: authSlice.reducer,
    career: careerSlice.reducer,
    class: classSlice.reducer,
    subject: subjectSlice.reducer,
    unit: UnitSlice.reducer,
    list: listSlice.reducer,
    justification:justificationSlice.reducer,
        classScore: classReducer,

    [authApi.reducerPath]: authApi.reducer,
    [peesadApi.reducerPath]: peesadApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, peesadApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
