import { getWindow } from "./env";

const OVERFLOW_RE = /auto|scroll|overlay|hidden|clip/;

/**
 * Checks if an element is an overflow element.
 * @param {HTMLElement} el - The element to check.
 * @returns {boolean} - Returns true if the element is an overflow element, false otherwise.
 */
export function isOverflowElement(el) {
	const win = getWindow(el);
	const { overflow, overflowX, overflowY, display } =
		win.getComputedStyle(el);
	return (
		OVERFLOW_RE.test(overflow + overflowY + overflowX) &&
		!["inline", "contents"].includes(display)
	);
}
