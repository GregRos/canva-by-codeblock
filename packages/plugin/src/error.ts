export function ERROR(el: HTMLElement, error: Error) {
	const title = error.name ?? "Unxpected error";
	const extra = error.message;
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
