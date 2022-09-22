import React, { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classNameCheck from '../../../../scrtipts/classNameCheck';
import BaseProps from '../../../../types/BaseProps';
import cl from './arrowBack.module.css';
import { useAppDispatch } from './../../../../hooks/redux';
import { pathSlice } from './../../../../store/reducers/PathSlice';

interface Props extends BaseProps {
  isActive: boolean;
}

const ArrowBack = memo(({ className, isActive }: Props) => {
  
  const active = isActive ? '_active' : '';
  const navigator = useNavigate();
  const location = useLocation().pathname;
  const { pushNext, popPrev } = pathSlice.actions;
  const dispatch = useAppDispatch();
  const back = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(`.${cl._active}`)) {
      dispatch(pushNext(location));
      dispatch(popPrev());
      navigator(-1);
    }
  }

  return (
    <div 
      className={`${cl.arrow} ${classNameCheck(className)} ${classNameCheck(cl[active])}`}
      onClick={back}
    >
      <svg role="img" height="24" width="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"></path>
      </svg>
    </div>
  )
})

export default ArrowBack
