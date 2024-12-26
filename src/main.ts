import { MarkdownPostProcessorContext, Plugin } from "obsidian";
import { CANVA } from "./elements/canva";
import { ERROR } from "./elements/error";
import { EmbedError } from "./error";
import { processEmbed } from "./parse";

export default class EmbedCanva extends Plugin {
	async onload() {
		this.registerMarkdownCodeBlockProcessor("canva", (source, el, ctx) => {
			try {
				const embedInfo = processEmbed(source, el, ctx);
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
