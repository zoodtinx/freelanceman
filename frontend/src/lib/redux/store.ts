import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { projectApi } from './apiSlices/projectApi'

const store = configureStore({
   reducer: rootReducer,
   devTools: process.env.NODE_ENV !== 'production',
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectApi.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

