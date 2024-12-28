import { CanvaEmbedParseError } from "./error.js";

const canvaEmbedRegex = /^https:\/\/www.canva.com\/design.*$/;

export function isValidCanvaUrl(url: string) {
	return canvaEmbedRegex.test(url);
}

export function normalizeCanvaUrl(url: string) {
	if (!isValidCanvaUrl(url)) {
		throw new CanvaEmbedParseError("Invalid Canva URL", url);
	}
	const u = new URL(url);
	u.search = "";
	u.searchParams.set("embed", "");

	return u.toString();
}
