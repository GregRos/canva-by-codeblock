import { MarkdownPostProcessorContext } from "obsidian";
import { EmbedError } from "src/error";
import { EmbedLangProps, getPropsFromFirstLine } from "./language";
import { normalizeWithEmbedQuery } from "./url";
export interface EmbedProps extends EmbedLangProps {
	url: string;
}

export function processEmbed(
	source: string,
	el: HTMLElement,
	ctx: MarkdownPostProcessorContext
): EmbedProps {
	const sectionInfo = ctx.getSectionInfo(el);
	if (!sectionInfo) {
		throw new EmbedError("No section info", source);
	}
	const text = sectionInfo.text.split("\n");
	const firstLine = text[sectionInfo.lineStart];
	const props = getPropsFromFirstLine(firstLine);
	const url = normalizeWithEmbedQuery(source);
	return {
		url,
		...props,
	};
}
