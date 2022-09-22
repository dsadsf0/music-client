import React, { Dispatch, memo, RefObject, SetStateAction } from 'react'
import BaseProps from '../../../../types/BaseProps'
import ButtonSTD from '../../../UI/buttons/ButtonSTD'
import SideBarDialog from '../side_bar_Dialog/SideBarDialog'

interface Props extends BaseProps {
  btnClassName?: string;
  isActive: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  rootRef: RefObject<HTMLElement>;
  title: string;
  text: string;
  children?: React.ReactNode;
}

const SideBarPopupButton = memo(({ btnClassName, isActive, setActive, title, text, children, rootRef }: Props) => {
  return (
    <>
      <ButtonSTD
        style='base'
        className={`${btnClassName}`}
        onClick={() => {
          setActive(!isActive)
        }}
      >
        {children}
      </ButtonSTD>
      <SideBarDialog
        isActive={isActive}
        setActive={setActive}
        rootRef={rootRef}
        title={title}
        text={text}
      />
    </>
  )
})

export default SideBarPopupButton