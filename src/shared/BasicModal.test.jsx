import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import BasicModal from './BasicModal';

describe('BasicModal', () => {
  const mockOnClose = vi.fn();
  const modalContent = 'Test Modal Content';

  beforeEach(() => {
    // Clear mock calls between tests
    mockOnClose.mockClear();
  });

  it('should not render when isOpen is false', () => {
    render(
      <BasicModal isOpen={false} onClose={mockOnClose}>
        {modalContent}
      </BasicModal>
    );

    expect(screen.queryByText(modalContent)).not.toBeInTheDocument();
  });

  it('should render content when isOpen is true', () => {
    render(
      <BasicModal isOpen={true} onClose={mockOnClose}>
        {modalContent}
      </BasicModal>
    );

    expect(screen.getByText(modalContent)).toBeInTheDocument();
  });

  it('should call onClose when clicking overlay', () => {
    const { container } = render(
      <BasicModal isOpen={true} onClose={mockOnClose}>
        {modalContent}
      </BasicModal>
    );

    const overlay = container.getElementsByClassName('modal-overlay')[0];
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when clicking modal content', () => {
    const { container } = render(
      <BasicModal isOpen={true} onClose={mockOnClose}>
        {modalContent}
      </BasicModal>
    );

    const modalContentElement =
      container.getElementsByClassName('modal-content')[0];
    fireEvent.click(modalContentElement);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should set body overflow to hidden when modal is open', () => {
    render(
      <BasicModal isOpen={true} onClose={mockOnClose}>
        {modalContent}
      </BasicModal>
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should reset body overflow when modal is closed', () => {
    const { rerender } = render(
      <BasicModal isOpen={true} onClose={mockOnClose}>
        {modalContent}
      </BasicModal>
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <BasicModal isOpen={false} onClose={mockOnClose}>
        {modalContent}
      </BasicModal>
    );

    expect(document.body.style.overflow).toBe('unset');
  });

  it('should reset body overflow when unmounted', () => {
    const { unmount } = render(
      <BasicModal isOpen={true} onClose={mockOnClose}>
        {modalContent}
      </BasicModal>
    );

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('unset');
  });
});
