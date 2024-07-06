import { isHTMLElement, isDocument, isShadowRoot, isWindow } from "./is";

/**
 * Returns the document object associated with the given element.
 * If the element itself is a document, it is returned directly.
 * If the element is a window object, the document object of the window is returned.
 * If the element is neither a document nor a window, the owner document of the element is returned.
 * If the element does not have an owner document, the default document object is returned.
 *
 * @param {Element | Window | Node | Document | null} el - The element for which to retrieve the document object.
 * @returns {Document} The document object associated with the given element.
 */
export function getDocument(el) {
	if (isDocument(el)) return el;
	if (isWindow(el)) return el.document;
	return el?.ownerDocument ?? document;
}

/**
 * Returns the document element of the given element.
 *
 * @param {Element | Window | Node | Document | null} el - The element for which to retrieve the document element.
 * @returns {HTMLElement} The document element.
 */
export function getDocumentElement(el) {
	return getDocument(el).documentElement;
}

/**
 * Returns the window object associated with the given element.
 * If the element is a shadow root, it returns the window object associated with its host.
 * If the element is a document, it returns the default view of the document.
 * If the element is an HTML element, it returns the default view of the owner document.
 * If none of the above conditions are met, it returns the global window object.
 *
 * * ```
 * // Works but not ideal
 * const resizeObserver = new ResizeObserver(callback);
 *
 * // Better, Always use the correct window reference when instantiating observers.
 * // This ensures the component works in custom window contexts like iframes, window(.)open, or Electron.
 * const resizeObserver = new win.ResizeObserver(callback);
 * ```
 *
 * @param {Node | ShadowRoot | Document | undefined} el - The element for which to retrieve the window object.
 * @returns {Window} The window object associated with the given element.
 */
export function getWindow(el) {
	if (isShadowRoot(el)) return getWindow(el.host);
	if (isDocument(el)) return el.defaultView ?? window;
	if (isHTMLElement(el)) return el.ownerDocument?.defaultView ?? window;
	return window;
}

/**
 * Retrieves the active element within a given DOM element or document.
 * If the active element is within a shadow root, it will traverse the shadow DOM
 * to find the ultimate active element.
 *
 * @param {HTMLElement} el - The DOM element or document to search within.
 * @returns {HTMLElement} - The active element.
 */
export function getActiveElement(el) {
	const doc = getDocument(el);
	let activeElement = doc.activeElement;
	while (activeElement?.shadowRoot) {
		const el = activeElement.shadowRoot.activeElement;
		if (el === activeElement) break;
		else activeElement = el;
	}
	return activeElement;
}
