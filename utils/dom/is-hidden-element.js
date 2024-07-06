/**
 * Checks if an element is hidden.
 *
 * @param {HTMLElement} node - The element to check.
 * @returns {boolean} - Returns true if the element is hidden, false otherwise.
 */
export function isHiddenElement(node) {
	if (node.parentElement && isHiddenElement(node.parentElement)) return true;
	return node.hidden;
}
