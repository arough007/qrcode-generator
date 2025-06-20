import { useEffect, useRef } from 'react';

interface UseModalFocusOptions {
  isOpen: boolean;
  onClose: () => void;
}

export const useModalFocus = ({ isOpen, onClose }: UseModalFocusOptions) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Get all focusable elements within the modal
  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors));
  };

  // Handle keyboard navigation within modal
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = getFocusableElements(modalRef.current);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Handle Escape key
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    // Handle Tab key for focus trapping
    if (event.key === 'Tab') {
      // If no focusable elements, prevent default
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      // If only one focusable element, prevent tabbing
      if (focusableElements.length === 1) {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      // Normal tab cycling
      if (event.shiftKey) {
        // Shift + Tab: moving backwards
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: moving forwards
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  // Handle modal opening
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus the first focusable element in the modal
      const focusableElements = getFocusableElements(modalRef.current);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        // If no focusable elements, focus the modal container itself
        modalRef.current.focus();
      }

      // Add keyboard event listener
      document.addEventListener('keydown', handleKeyDown);

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle modal closing - restore focus
  useEffect(() => {
    if (!isOpen && previousFocusRef.current) {
      // Small delay to ensure modal is fully closed before restoring focus
      const timeoutId = setTimeout(() => {
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
          previousFocusRef.current = null;
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  return {
    modalRef,
    handleKeyDown,
  };
};
