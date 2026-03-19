import type { BundledLanguage } from "shiki";

function escapeHtml(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

export function renderCodeHtml(code: string, lang: BundledLanguage = "tsx") {
	return `<pre class="shiki vesper" tabindex="0"><code class="language-${lang}">${escapeHtml(
		code,
	)}</code></pre>`;
}
