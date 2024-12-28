import { CanvaEmbedBlock } from "@obsidian-canva-embed/parser";

function getPropsAsDataAttributes(props: CanvaEmbedBlock) {
	const attributes = [];
	for (const [key, value] of Object.entries(props)) {
		const attrName = `data-${key}`;
		let attrValue = value;
		if (key === "size") {
			attrValue = value.join("x");
		}
		attributes.push([attrName, attrValue]);
	}
	return Object.fromEntries(attributes);
}

export function CANVA(el: HTMLElement, props: CanvaEmbedBlock) {
	const [width, height] = props.size?.map((x) => `${x}px`) ?? [
		"100%",
		"100%",
	];
	const style = `width: ${width}; height: ${height};`;
	const wrapper = el.createEl("div", {
		cls: "canva-embed__wrapper",
		attr: {
			style,
			...getPropsAsDataAttributes(props),
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
