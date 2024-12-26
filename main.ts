import { Plugin } from "obsidian"

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: "default"
}

const canvaEmbedRegex = /^https:\/\/www.canva.com\/design.*$/
export default class EmbedCanva extends Plugin {
	settings: MyPluginSettings

	async onload() {
		this.registerMarkdownCodeBlockProcessor("canva", (source, el) => {
			const result = canvaEmbedRegex.exec(source)
			console.log(result)
			if (!result) {
				el.createEl("span", {
					cls: "canva-embed__error",
					text: `INVALID CANVA URL ≪ ${source} ≫`
				})

				return
			}
			const url = `${result[0]}?embed`

			const wrapper = el.createEl("div", {
				cls: "canva-embed__wrapper"
			})
			const iframe = wrapper.createEl("iframe", {
				cls: "canva-embed__iframe",
				attr: {
					loading: "lazy",
					src: url
				}
			})
		})
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
	}

	async saveSettings() {
		await this.saveData(this.settings)
	}
}
