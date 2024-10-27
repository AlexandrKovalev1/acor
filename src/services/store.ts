import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { loginApi } from './loginApi.ts'
import { modelTreeClassesApi } from './modelTreeClassesApi.ts'

export const store = configureStore({
  reducer: combineSlices(loginApi, modelTreeClassesApi),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(loginApi.middleware).concat(modelTreeClassesApi.middleware),
  devTools: true,
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
