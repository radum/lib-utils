import { expect, test } from "vitest";
import {
	isHTMLElement,
	isDocument,
	isShadowRoot,
	isWindow,
} from "./../../utils/dom/is.js";

// Test for isHTMLElement
test("isHTMLElement should return true for HTML element", () => {
	const element = document.createElement("div");
	expect(isHTMLElement(element)).toBe(true);
});

test("isHTMLElement should return false for non-HTML element", () => {
	const textNode = document.createTextNode("Hello");
	expect(isHTMLElement(textNode)).toBe(false);
});

// Test for isDocument
test("isDocument should return true for document node", () => {
	expect(isDocument(document)).toBe(true);
});

test("isDocument should return false for non-document node", () => {
	const element = document.createElement("div");
	expect(isDocument(element)).toBe(false);
});

// Test for isShadowRoot
test("isShadowRoot should return true for ShadowRoot", () => {
	const element = document.createElement("div");
	const shadowRoot = element.attachShadow({ mode: "open" });
	expect(isShadowRoot(shadowRoot)).toBe(true);
});

test("isShadowRoot should return false for non-ShadowRoot", () => {
	const element = document.createElement("div");
	expect(isShadowRoot(element)).toBe(false);
});

// Test for isWindow
test("isWindow should return true for window object", () => {
	expect(isWindow(window)).toBe(true);
});

test("isWindow should return false for non-window object", () => {
	const element = document.createElement("div");
	expect(isWindow(element)).toBe(false);
});
