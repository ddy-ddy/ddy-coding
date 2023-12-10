import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-auto";
import { mdsvex } from 'mdsvex';
import { mdsvexOptions } from "./mdsvex.config.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$lib: "./src/lib"
		}
	},
	preprocess: [
		vitePreprocess({
			style: {
				css: {
					postcss: join(__dirname, "postcss.config.cjs")
				}
			}
		}),
		mdsvex(mdsvexOptions)
	],
	extensions: [".svelte", ".md"],
};

export default config;
