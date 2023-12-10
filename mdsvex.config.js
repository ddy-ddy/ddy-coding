import path from "path";
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
    extensions: [".md"],
    layout: path.resolve(
        __dirname,
        "./src/lib/components/mdsvex/mdsvex.svelte"
    ),
    smartypants: {
        quotes: false,
        ellipses: false,
        backticks: false,
        dashes: false
    },
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [rehypeSlug]
};
