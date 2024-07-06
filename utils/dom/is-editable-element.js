import { getWindow } from "./env";
import { isHTMLElement } from "./is";

/**
 * Checks if an element is editable.
 *
 * @param {HTMLElement | EventTarget | null} el - The element to check.
 * @returns {boolean} Returns `true` if the element is editable, `false` otherwise.
 */
export function isEditableElement(el) {
	if (el == null || !isHTMLElement(el)) {
		return false;
	}

	try {
		const win = getWindow(el);
		return (
			(el instanceof win.HTMLInputElement && el.selectionStart != null) ||
			/(textarea|select)/.test(el.localName) ||
			el.isContentEditable
		);
	} catch {
		return false;
	}
}
