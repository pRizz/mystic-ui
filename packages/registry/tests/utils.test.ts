import { describe, expect, test } from "bun:test";
import {
	extractDependencies,
	normalizeDependencySpecifier,
} from "../src/utils";

describe("normalizeDependencySpecifier()", () => {
	test("keeps root package names for normal dependencies", () => {
		expect(normalizeDependencySpecifier("motion")).toBe("motion");
	});

	test("normalizes unscoped subpath imports", () => {
		expect(normalizeDependencySpecifier("solid-icons/tb")).toBe("solid-icons");
	});

	test("normalizes scoped subpath imports", () => {
		expect(normalizeDependencySpecifier("@tsparticles/engine")).toBe(
			"@tsparticles/engine",
		);
	});

	test("ignores relative and alias imports", () => {
		expect(normalizeDependencySpecifier("./local-file")).toBeUndefined();
		expect(normalizeDependencySpecifier("@/lib/utils")).toBeUndefined();
	});
});

describe("extractDependencies()", () => {
	test("extracts root packages from mixed imports", () => {
		const content = `
import { TbMoon } from "solid-icons/tb";
import { loadSlim } from "@tsparticles/slim";
import { Dynamic } from "solid-js/web";
import { css } from "styled-system/css";
import { cn } from "@/lib/utils";
import localThing from "./local";
import type { RoughAnnotation } from "rough-notation/lib/model";
`;

		expect(extractDependencies(content)).toEqual([
			"@tsparticles/slim",
			"rough-notation",
			"solid-icons",
		]);
	});

	test("deduplicates and sorts dependencies", () => {
		const content = `
import { TbMoon } from "solid-icons/tb";
import { TbSun } from "solid-icons/tb";
import { annotate } from "rough-notation";
`;

		expect(extractDependencies(content)).toEqual([
			"rough-notation",
			"solid-icons",
		]);
	});
});
