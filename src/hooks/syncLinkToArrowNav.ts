import { useLocation } from "react-router-dom";
import { useAppDispatch } from "./redux";
import { pathSlice } from "../store/reducers/PathSlice";

export const useSyncLinkToArrowNav = () => {
  const location = useLocation().pathname;
  const dispatch = useAppDispatch();
  const { pushPrev, clearNext } = pathSlice.actions;

  return () => {
    dispatch(pushPrev(location));
    dispatch(clearNext());
    
    const main = document.querySelector('main')
    if (main) main.scrollTo(0, 0)
  }
}