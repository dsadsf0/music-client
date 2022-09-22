import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSeletor: TypedUseSelectorHook<RootState> = useSelector;