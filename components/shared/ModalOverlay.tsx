import React, { ReactNode } from 'react';

interface ModalOverlayProps {
  /** Child elements to render inside the modal */
  children: ReactNode;
  /** Click handler for closing the modal when clicking outside */
  onClose?: () => void;
  /** Z-index level for the modal (default: 6000) */
  zIndex?: number;
  /** Background opacity variant */
  backdropVariant?: 'light' | 'medium' | 'dark' | 'solid';
  /** Additional CSS classes for the overlay */
  className?: string;
}

/**
 * Shared modal overlay component that provides consistent styling
 * for fixed overlays with backdrop blur across the application
 */
export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  children,
  onClose,
  zIndex = 6000,
  backdropVariant = 'medium',
  className = '',
}) => {
  const backdropClasses = {
    light: 'bg-slate-900/50 backdrop-blur-sm',
    medium: 'bg-slate-900/60 backdrop-blur-sm',
    dark: 'bg-slate-900/70 backdrop-blur-md',
    solid: 'bg-slate-900/95 backdrop-blur-md',
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only trigger onClose if clicking the overlay itself, not children
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 ${backdropClasses[backdropVariant]} flex items-center justify-center p-4 ${className}`}
      style={{ zIndex }}
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
};
