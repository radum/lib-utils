/**
 * Checks if a value is an HTML element.
 *
 * With "instanceof" checks, prefer to use the correct window context or use property access checks (nodeType, localName)
 * ```
 * // Works but is not ideal
 * const isHTMLElement = node instanceof HTMLElement;
 * ```
 *
 * Components that use "node instanceof HTMLElement" won't work correctly when rendered in iframe environments
 * ```
 * // Slightly better
 * const win = elementRef.ownerDocument.defaultView || window;
 * const isHTMLElement = node instanceof win.HTMLElement;
 * ```
 *
 * @param {any} v - The value to check.
 * @returns {boolean} - Returns `true` if the value is an HTML element, `false` otherwise.
 */
export const isHTMLElement = (v) =>
	typeof v === "object" &&
	v?.nodeType === Node.ELEMENT_NODE &&
	typeof v?.nodeName === "string";

/**
 * Checks if the given element is a document node.
 *
 * @param {Node} el - The element to check.
 * @returns {boolean} Returns `true` if the element is a document node, `false` otherwise.
 */
export const isDocument = (el) => el.nodeType === Node.DOCUMENT_NODE;

/**
 * Checks if the given element is a window object.
 *
 * @param {Object} el - The element to check.
 * @returns {boolean} Returns `true` if the element is a window object, else `false`.
 */
export const isWindow = (el) => el != null && el === el.window;

/**
 * Checks if the given element is a VisualViewport object.
 *
 * @param {Object} el - The element to check.
 * @returns {boolean} Returns true if the element is a VisualViewport object, false otherwise.
 */
export const isVisualViewport = (el) =>
	el != null && el.constructor.name === "VisualViewport";

/**
 * Returns the name of the node or #document.
 *
 * @param {Node} node - The node to get the name from.
 * @returns {string} The name of the node.
 */
export const getNodeName = (node) => {
	if (isHTMLElement(node)) return node.localName || "";
	return "#document";
};

/**
 * Checks if a given node is a root element (html, body, #document).
 *
 * @param {Node} node - The node to check.
 * @returns {boolean} - Returns true if the node is a root element, false otherwise.
 */
export function isRootElement(node) {
	return ["html", "body", "#document"].includes(getNodeName(node));
}

/**
 * Checks if the given value is a DOM node.
 *
 * @param {Node} el - The value to check.
 * @returns {boolean} Returns `true` if the value is a DOM node, else `false`.
 */
export const isNode = (el) => el.nodeType !== undefined;

/**
 * Checks if an element is a ShadowRoot.
 *
 * @param {Node} el - The element to check.
 * @returns {boolean} - Returns true if the element is a ShadowRoot, false otherwise.
 */
export const isShadowRoot = (el) =>
	el &&
	isNode(el) &&
	el.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
	"host" in el;
