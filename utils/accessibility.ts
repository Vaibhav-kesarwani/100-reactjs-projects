// Accessibility utilities for React components

// Generate unique ID for ARIA relationships
export function generateId(prefix: string = 'element'): string {
  return ${prefix}-;
}

// Keyboard navigation handler
export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void
): void {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      onEnter?.();
      break;
    case 'Escape':
      onEscape?.();
      break;
    case 'ArrowUp':
      event.preventDefault();
      onArrowUp?.();
      break;
    case 'ArrowDown':
      event.preventDefault();
      onArrowDown?.();
      break;
  }
}

// Check if element is visible
export function isElementVisible(element: HTMLElement): boolean {
  return (
    element.offsetWidth > 0 ||
    element.offsetHeight > 0 ||
    element.getClientRects().length > 0
  );
}

// Trap focus within a container
export function trapFocus(event: KeyboardEvent, container: HTMLElement): void {
  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  if (event.key === 'Tab') {
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }
}
