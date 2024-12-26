import { EmbedError } from "src/error";

export interface EmbedLangProps {
	size?: [number, number];
}

export function getPropsFromFirstLine(lang: string): EmbedLangProps {
	const noCanva = lang.replace(/^```canva\s*/, "");
	if (noCanva === "") {
		return {};
	}
	const kvps = noCanva.split(" ");
	const props: EmbedLangProps = {};
	for (const kvp of kvps) {
		const arr = kvp.split("=");
		if (arr.length !== 2) {
			throw new EmbedError("Bad config entry", kvp);
		}
		const [key, value] = arr;
		if (key === "size") {
			const sizeArr = value.split("x").map((x) => parseInt(x));
			if (sizeArr.length !== 2) {
				throw new EmbedError("Bad size value", value);
			}
			const [width, height] = sizeArr;
			props.size = [width, height];
		}
	}

	return props;
}
