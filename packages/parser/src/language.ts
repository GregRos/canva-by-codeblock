import { CanvaEmbedParseError } from "./error.js";
import { CanvaEmbedBlockConfig } from "./types.js";

const canvasRegex = /^canva\s*/;

export function isCanvaLanguage(lang: string) {
	return canvasRegex.test(lang);
}

function parseProperty(key: string, value: string) {
	switch (key) {
		case "size":
			const sizeArr = value.split("x").map((x) => parseInt(x));
			if (sizeArr.length !== 2) {
				throw new CanvaEmbedParseError("Bad size value", value);
			}
			const [width, height] = sizeArr;
			return [width, height];
		default:
			return value;
	}
}
export function parseLanguage<
	Config extends CanvaEmbedBlockConfig = CanvaEmbedBlockConfig
>(
	lang: string
): {
	[key in keyof Config]?: Config[key];
} {
	if (!isCanvaLanguage(lang)) {
		throw new CanvaEmbedParseError("Expected canva language", lang);
	}
	const noCanva = lang.replace(canvasRegex, "");
	if (noCanva === "") {
		return {};
	}
	const kvps = noCanva.split(";;");
	const props: any = {};
	for (const kvp of kvps) {
		const arr = kvp.split("=");
		if (arr.length !== 2) {
			throw new CanvaEmbedParseError("Bad config entry", kvp);
		}
		const [key, pValue] = arr;
		const value = parseProperty(key, pValue);
		props[key] = value;
	}

	return props;
}
