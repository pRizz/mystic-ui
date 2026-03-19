import { fileURLToPath } from "node:url";
import contentCollections from "@content-collections/solid-start";
import { defineConfig } from "@solidjs/start/config";
import { createHighlighter } from "shiki";
import tsconfigPaths from "vite-tsconfig-paths";
import { prerenderRoutes } from "./prerender-routes";
import { resolveDeployConfig } from "./scripts/deploy-config.mjs";

/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx";
const { default: mdx } = pkg;
import remarkFrontmatter from "remark-frontmatter";
import {
	SKIP as REMARK_VISIT_SKIP,
	visit as remarkVisit,
} from "unist-util-visit";

const highlighter = await createHighlighter({
	themes: ["vesper"],
	langs: ["typescript", "tsx", "javascript", "jsx", "json", "shell"],
});

const { basePath } = resolveDeployConfig(process.env);
const viteBasePath = basePath === "/" ? "/" : `${basePath}/`;

function remarkCodeBlock() {
	return (tree) => {
		remarkVisit(tree, "code", (node, index, parent) => {
			const rawCodeBlockNode = {
				type: "mdxJsxFlowElement",
				name: "RawCodeBlock",
				attributes: [
					{
						type: "mdxJsxAttribute",
						name: "html",
						value: highlighter.codeToHtml(node.value, {
							theme: "vesper",
							lang: node.lang,
						}),
					},
					{
						type: "mdxJsxAttribute",
						name: "code",
						value: node.value,
					},
					{
						type: "mdxJsxAttribute",
						name: "lang",
						value: node.lang,
					},
				],
				children: [],
				data: {
					_mdxExplicitJsx: true,
				},
			};

			// Replace the code node with the a RawCodeBlock jsx node
			Object.assign(node, rawCodeBlockNode);
			return REMARK_VISIT_SKIP;
		});
	};
}

export default defineConfig({
	extensions: ["mdx"],
	vite: {
		base: viteBasePath,
		resolve: {
			alias: {
				clsx: fileURLToPath(
					new URL("./src/lib/shims/clsx.ts", import.meta.url),
				),
				"rough-notation": fileURLToPath(
					new URL("./src/lib/shims/rough-notation.ts", import.meta.url),
				),
				"rough-notation/lib/model": fileURLToPath(
					new URL("./src/lib/shims/rough-notation-model.ts", import.meta.url),
				),
				"solid-icons/tb": fileURLToPath(
					new URL("./src/lib/shims/solid-icons-tb.ts", import.meta.url),
				),
				"tailwind-merge": fileURLToPath(
					new URL("./src/lib/shims/tailwind-merge.ts", import.meta.url),
				),
			},
		},
		plugins: [
			tsconfigPaths(),
			contentCollections(),
			mdx.withImports({})({
				jsx: true,
				jsxImportSource: "solid-js",
				providerImportSource: "~/tools/solid-mdx",
				remarkPlugins: [remarkFrontmatter, remarkCodeBlock],
			}),
		],
	},
	server: {
		baseURL: basePath,
		static: true,
		prerender: {
			crawlLinks: true,
			failOnError: true,
			routes: prerenderRoutes,
		},
		// see https://github.com/solidjs/solid-start/issues/1614
		esbuild: { options: { target: "esnext" } },
	},
});
