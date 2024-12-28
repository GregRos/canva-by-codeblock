import { EmbedProps } from "src/parse";

export function CANVA(el: HTMLElement, props: EmbedProps) {
	const [width, height] = props.size?.map((x) => `${x}px`) ?? [
		"100%",
		"100%",
	];
	const style = `width: ${width}; height: ${height};`;
	const wrapper = el.createEl("div", {
		cls: "canva-embed__wrapper",
		attr: {
			style,
		},
	});
	const iframe = wrapper.createEl("iframe", {
		cls: "canva-embed__iframe",
		attr: {
			loading: "lazy",
			src: props.url,
		},
	});
}
