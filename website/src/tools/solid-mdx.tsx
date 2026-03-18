// Acts like a JSX factory for compiling MDX documents.

import type { Component } from "solid-js";
import { Box, Divider, styled } from "styled-system/jsx";
import { RawCodeBlock } from "~/components/code-block";
import { StoryPreview } from "~/components/docs/story-preview";
import { Code } from "~/components/ui/code";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { Text } from "~/components/ui/text";

// biome-ignore lint/suspicious/noExplicitAny: different components have different props
export const useMDXComponents: () => Record<string, Component<any>> = () => ({
	h1: (props) => (
		<Heading as="h1" textStyle={{ base: "4xl", md: "5xl" }} mb="6" {...props} />
	),
	h2: (props) => <Heading as="h2" textStyle="3xl" mb="3" {...props} />,
	h3: (props) => <Heading as="h3" textStyle="2xl" {...props} />,
	h4: (props) => <Heading as="h4" textStyle="xl" {...props} />,
	h5: (props) => <Heading as="h5" textStyle="lg" {...props} />,
	h6: (props) => <Heading as="h6" textStyle="md" {...props} />,
	p: (props) => <Text textStyle="lg" my="4" color="fg.muted" {...props} />,
	code: (props) => <Code variant="outline" fontFamily="monospace" {...props} />,
	Text,
	Box,
	RawCodeBlock,
	StoryPreview,
	a: (props) => <Link {...props} />,
	hr: (props) => <Divider my="8" {...props} />,
	i: (props) => <i {...props} />,
	b: (props) => <b {...props} />,
	em: (props) => <em {...props} />,
	strong: (props) => <strong {...props} />,
	ol: (props) => (
		<styled.ol
			marginInlineStart="4"
			spaceY="2"
			listStyleType="decimal"
			{...props}
		/>
	),
	ul: (props) => (
		<styled.ul
			marginInlineStart="4"
			spaceY="2"
			listStyleType="disc"
			{...props}
		/>
	),
	li: (props) => <styled.li color="fg.muted" {...props} />,
	table: (props) => (
		<styled.table width="full" my="6" textAlign="left" {...props} />
	),
	thead: (props) => (
		<styled.thead
			borderBottomWidth="1px"
			borderColor="border.default"
			{...props}
		/>
	),
	tbody: (props) => <styled.tbody {...props} />,
	tr: (props) => (
		<styled.tr borderBottomWidth="1px" borderColor="border.subtle" {...props} />
	),
	th: (props) => (
		<styled.th
			py="2"
			px="3"
			fontWeight="semibold"
			color="fg.default"
			{...props}
		/>
	),
	td: (props) => <styled.td py="2" px="3" color="fg.muted" {...props} />,
	br: (props) => <br {...props} />,
});
