import React from 'react';

export default interface BaseProps {
  className?: string;
  disabled?: boolean;
  href?: string;
  src?: string;
  onClick?: (e: React.MouseEvent ) => void;
}