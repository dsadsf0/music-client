import React, { memo } from 'react';
import BaseProps from '../../../../types/BaseProps';
import cl from './arrowForward.module.css';
import classNameCheck from './../../../../scrtipts/classNameCheck';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSeletor } from '../../../../hooks/redux';
import { pathSlice } from '../../../../store/reducers/PathSlice';

interface Props extends BaseProps {}

const ArrowForward = memo(({ className }: Props) => {
  const { nextPath } = useAppSeletor(state => state.path)
  const active = nextPath.length ? '_active' : '';
  const navigator = useNavigate();
  const location = useLocation().pathname;
  const { pushPrev, popNext } = pathSlice.actions;
  const dispatch = useAppDispatch();
  const forward = (e:React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(`.${cl._active}`)) {
      dispatch(pushPrev(location));
      dispatch(popNext());
      navigator(1);
    }
  }

  return (
    <div 
      className={`${cl.arrow} ${classNameCheck(className)} ${classNameCheck(cl[active])}`}
      onClick={forward}
    >
      <svg role="img" height="24" width="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z"></path>
      </svg>
    </div>
  )
})

export default ArrowForward
