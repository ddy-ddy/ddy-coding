import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$lib: "./src/lib"
		}
	},
	preprocess: [
		vitePreprocess(),
	],
	extensions: [".svelte"],
};

export default config;
