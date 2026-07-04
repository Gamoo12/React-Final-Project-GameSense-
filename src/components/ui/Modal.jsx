import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * Reusable animated modal window rendered through a React portal.
 * Closes on backdrop click and on the Escape key.
 */
function Modal({ isOpen, onClose, children, labelledBy }) {
  const backdropRef = useRef(null);

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === backdropRef.current) onClose();
  };

  return createPortal(
    <div
      ref={backdropRef}
      className="modal"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
