import { EmbedError } from "src/error";

export function ERROR(el: HTMLElement, error: Error) {
	let title = "Unxpected error";
	let extra = error.message;
	if (error instanceof EmbedError) {
		title = error.title;
		extra = error.extra;
	}
	const err = el.createEl("div", {
		cls: "canva-embed__error",
	});
	err.createEl("div", {
		cls: "canva-embed__error-legend",
		text: "canva-embed error",
	});
	err.createEl("div", {
		cls: "canva-embed__error-title",
		text: title,
	});
	err.createEl("div", {
		cls: "canva-embed__error-url",
		text: extra,
	});
}
