/**
 * Create keydown events for button-like behavior on non interactive elements.
 * @param onClick - Function to be called on keydown.
 * @returns A keydown event handler function.
 */
export const createKeydownEvent = (onClick?: () => void) => {
  if (!onClick) return undefined;

  return (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") onClick();
  };
};
