import { memo } from "react";
import { Link } from "react-router-dom";
import { useSyncLinkToArrowNav } from "../../../hooks/syncLinkToArrowNav";
import classNameCheck from "../../../scrtipts/classNameCheck";
import BaseProps from "../../../types/BaseProps";

interface Props extends BaseProps {
  children?: React.ReactNode;
  to: string;
}

const LinkStd = memo(({ className, children, to, onClick }: Props) => {

  const sync = useSyncLinkToArrowNav();

  const click = (e: React.MouseEvent) => {
    onClick && onClick(e)
    sync()
  }

  return (
    <Link
      className={`${classNameCheck(className)}`}
      to={to}
      onClick={click}
    >
      {children}
    </Link>
  )
})

export default LinkStd