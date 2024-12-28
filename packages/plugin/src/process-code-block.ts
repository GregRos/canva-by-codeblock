import { MarkdownPostProcessorContext } from "obsidian";
import {
	CanvaEmbedBlock,
	CanvaEmbedBlockConfig,
	CanvaEmbedParseError,
	normalizeCanvaUrl,
	parseLanguage,
} from "canva-embed-parser";
export function processCodeBlock(
	source: string,
	el: HTMLElement,
	ctx: MarkdownPostProcessorContext
): CanvaEmbedBlock {
	const sectionInfo = ctx.getSectionInfo(el);
	if (!sectionInfo) {
		throw new CanvaEmbedParseError("No section info", source);
	}
	const text = sectionInfo.text.split("\n");
	const firstLine = text[sectionInfo.lineStart];
	const language = firstLine.replace(/^```/, "");
	const props = parseLanguage(language);
	const url = normalizeCanvaUrl(source);
	return {
		url,
		...props,
	} as CanvaEmbedBlock;
}
