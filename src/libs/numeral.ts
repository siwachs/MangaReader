/**
 * Formats a number into "K", "M", or "B" notation.
 * @param {value} value - The number to format.
 * @returns {string} - The formatted number as a string.
 */
export default function numeral(value: number) {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + "B"; // Billion
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + "M"; // Million
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + "K"; // Thousand
  } else {
    return value?.toString(); // Less than a thousand
  }
}
