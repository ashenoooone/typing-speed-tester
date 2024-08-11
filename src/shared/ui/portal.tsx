import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  element?: HTMLElement;
  children: ReactNode;
}

export const Portal = (props: PortalProps) => {
  const {
    element = document.querySelector('.app'),
    children,
  } = props;
  return createPortal(children, element ?? document.body);
};
