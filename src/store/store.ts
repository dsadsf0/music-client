import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/AuthSlice";
import pathSlice from './reducers/PathSlice';
import playerSlice from './reducers/PlayerSlice';


const rootReducer = combineReducers({
  auth: authSlice,
  path: pathSlice,
  player: playerSlice
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']