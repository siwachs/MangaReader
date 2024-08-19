/**
 * Create keydown events for button-like behavior on non interactive elements.
 * @param onClick - Function to be called on keydown.
 * @returns A keydown event handler function.
 */
const getKeydownEvent = (onClick?: () => void) => {
  return !onClick
    ? undefined
    : (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      };
};

export default getKeydownEvent;
