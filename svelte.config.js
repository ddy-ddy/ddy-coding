/*
 * @Author: ddy-ddy
 * @Date: 2023-11-29 17:57:20
 * @LastEditTime: 2023-11-29 18:19:48
 * @Github: https://github.com/ddy-ddy
 * @Website: https://ddy-ddy.com
 */
import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$lib: "./src/lib"
		}
	},
	preprocess: [vitePreprocess({})],
};

export default config;
