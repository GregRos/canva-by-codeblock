export class EmbedError extends Error {
	constructor(readonly title: string, readonly extra: string) {
		super(`${title}: ${extra}`);
	}
}
