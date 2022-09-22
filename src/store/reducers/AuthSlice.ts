import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IAuthError from "../../types/IAuthError";
import IUser from "../../types/IUser";

interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  user: IUser;
  Error: IAuthError
}

const initState: AuthState = {
  isLoading: true,
  isAuth: false,
  user: {} as IUser,
  Error: {} as IAuthError
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<IAuthError>) {
      state.Error = action.payload
    }
  }
})

export default authSlice.reducer;
