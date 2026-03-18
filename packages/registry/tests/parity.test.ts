import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "bun:test";
import {
	forkOnlyComponents,
	paritySummary,
	upstreamComponentParityManifest,
} from "../src/parity";

const workspaceRoot = path.resolve(import.meta.dir, "../../..");

function exists(relativePath: string) {
	return fs.existsSync(path.join(workspaceRoot, relativePath));
}

function read(relativePath: string) {
	return fs.readFileSync(path.join(workspaceRoot, relativePath), "utf8");
}

describe("paritySummary", () => {
	test("matches the tracked manifest counts", () => {
		expect(paritySummary.upstreamComponentCount).toBe(
			upstreamComponentParityManifest.length,
		);
		expect(paritySummary.forkOnlyComponentCount).toBe(forkOnlyComponents.length);
	});
});

describe("upstream parity manifest coverage", () => {
	test("each claimed artifact exists", () => {
		for (const component of upstreamComponentParityManifest) {
			if (component.support.tailwind) {
				expect(
					exists(`components/tailwind/src/ui/${component.id}.tsx`),
					`${component.id} should have a tailwind component`,
				).toBe(true);
				expect(
					exists(`components/tailwind/src/stories/${component.id}/default.tsx`),
					`${component.id} should have a tailwind default story`,
				).toBe(true);
				expect(
					exists(`packages/registry/tailwind/${component.id}.json`),
					`${component.id} should have a tailwind registry entry`,
				).toBe(true);
			}

			if (component.support.panda) {
				expect(
					exists(`components/panda/src/ui/${component.id}.tsx`),
					`${component.id} should have a panda component`,
				).toBe(true);
				expect(
					exists(`components/panda/src/stories/${component.id}/default.tsx`),
					`${component.id} should have a panda default story`,
				).toBe(true);
				expect(
					exists(`packages/registry/panda/${component.id}.json`),
					`${component.id} should have a panda registry entry`,
				).toBe(true);
			}

			if (component.support.docs) {
				expect(
					exists(`website/src/content/docs/${component.id}.mdx`),
					`${component.id} should have docs`,
				).toBe(true);
			}
		}
	});
});

describe("fork-only component coverage", () => {
	test("documents the claimed framework support", () => {
		for (const component of forkOnlyComponents) {
			if (component.frameworks.includes("tailwind")) {
				expect(
					exists(`components/tailwind/src/ui/${component.id}.tsx`),
					`${component.id} should have a tailwind component`,
				).toBe(true);
				expect(
					exists(`packages/registry/tailwind/${component.id}.json`),
					`${component.id} should have a tailwind registry entry`,
				).toBe(true);
			}

			if (component.frameworks.includes("panda")) {
				expect(
					exists(`components/panda/src/ui/${component.id}.tsx`),
					`${component.id} should have a panda component`,
				).toBe(true);
				expect(
					exists(`packages/registry/panda/${component.id}.json`),
					`${component.id} should have a panda registry entry`,
				).toBe(true);
			}

			if (component.docs) {
				expect(
					exists(`website/src/content/docs/${component.id}.mdx`),
					`${component.id} should have docs`,
				).toBe(true);
			}
		}
	});
});

describe("component docs quality", () => {
	test("every component doc page includes usage and props guidance", () => {
		const docsDirectory = path.join(workspaceRoot, "website/src/content/docs");
		const docsFiles = fs
			.readdirSync(docsDirectory)
			.filter((fileName) => fileName.endsWith(".mdx"));

		for (const fileName of docsFiles) {
			const contents = read(`website/src/content/docs/${fileName}`);
			expect(contents.includes("## Usage"), `${fileName} should include usage`).toBe(
				true,
			);
			expect(contents.includes("## Props"), `${fileName} should include props`).toBe(
				true,
			);
		}
	});
});
