import type { ReactNode } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const DrawerOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 100;
`;

const DrawerContent = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  z-index: 101;
  overflow-y: auto;

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const CloseButton = styled.button`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  width: fit-content;
`;

export const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }

    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [isOpen]);

  return (
    <>
      <DrawerOverlay $isOpen={isOpen} onClick={onClose} aria-hidden={!isOpen} />
      <DrawerContent
        $isOpen={isOpen}
        data-testid="drawer"
        aria-modal={isOpen}
        aria-hidden={!isOpen}
      >
        <CloseButton type="button" onClick={onClose}>
          Close
        </CloseButton>
        {children}
      </DrawerContent>
    </>
  );
};
