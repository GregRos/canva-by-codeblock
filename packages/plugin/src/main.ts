import { MarkdownPostProcessorContext, Plugin } from "obsidian";
import { ERROR } from "./error";
import { CANVA } from "./canva";
import { processCodeBlock } from "./process-code-block";
import "./embed-styling.scss";
export default class EmbedCanva extends Plugin {
	async onload() {
		this.registerMarkdownCodeBlockProcessor("canva", (source, el, ctx) => {
			try {
				const embedInfo = processCodeBlock(source, el, ctx);
				CANVA(el, embedInfo);
			} catch (error) {
				ERROR(el, error);
			}
		});
	}

	onunload() {}

	async loadSettings() {}

	async saveSettings() {}
}
