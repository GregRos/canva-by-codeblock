import { EmbedError } from "src/error";

const canvaEmbedRegex = /^https:\/\/www.canva.com\/design.*$/;

export function normalizeWithEmbedQuery(url: string) {
	if (!isValidCanvaUrl(url)) {
		throw new EmbedError("Invalid Canva URL", url);
	}
	const u = new URL(url);
	u.searchParams.set("embed", "");
	return u.toString();
}

function isValidCanvaUrl(url: string) {
	return canvaEmbedRegex.test(url);
}
