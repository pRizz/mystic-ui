import { A, useLocation } from "@solidjs/router";
import { useStore } from "@tanstack/solid-store";
import type { Component } from "solid-js";
import { css } from "styled-system/css";
import { Container, Flex, HStack } from "styled-system/jsx";
import { store } from "~/lib/store";
import { ThemeSwitcher } from "./theme-switcher";
import { Badge } from "./ui/badge";

const forkRepositoryUrl = "https://github.com/pRizz/mystic-ui";

const navbarIconButtonClass = css({
	alignItems: "center",
	borderRadius: "l2",
	color: "fg.default",
	cursor: "pointer",
	display: "inline-flex",
	height: "8",
	justifyContent: "center",
	minWidth: "12",
	px: "3",
	transitionDuration: "normal",
	transitionProperty: "common",
	_hover: {
		backgroundColor: "bg.default",
	},
});

const DocsSideNavToggle = () => {
	const location = useLocation();
	const open = useStore(store, (state) => state.sideNavOpen);

	if (!location.pathname.startsWith("/docs/")) {
		return null;
	}

	return (
		<button
			type="button"
			class={css({
				alignItems: "center",
				borderRadius: "l2",
				color: "fg.default",
				cursor: "pointer",
				display: "inline-flex",
				fontSize: "sm",
				fontWeight: "medium",
				height: "8",
				hideFrom: "md",
				justifyContent: "center",
				minWidth: "12",
				px: "3",
				transitionDuration: "normal",
				transitionProperty: "common",
				_hover: {
					backgroundColor: "bg.default",
				},
			})}
			onClick={() =>
				store.setState((state) => ({
					...state,
					sideNavOpen: !state.sideNavOpen,
				}))
			}
		>
			{open() ? "Close" : "Menu"}
		</button>
	);
};

export const Navbar: Component = () => {
	return (
		<Flex
			height="12"
			align="center"
			position="sticky"
			top="0"
			zIndex="docked"
			backgroundColor="bg.canvas/75"
			backdropFilter="auto"
			backdropBlur="md"
		>
			<Container w="full">
				<HStack justify="space-between">
					<HStack>
						<DocsSideNavToggle />
						<A href="/" class={css({ textStyle: "lg", fontWeight: "bold" })}>
							Mystic UI
						</A>
						<Badge>alpha</Badge>
						<HStack gap="3" hideBelow="md" ml="4">
							<A
								href="/docs/panda"
								class={css({ color: "fg.muted", textStyle: "sm" })}
							>
								Docs
							</A>
							<A
								href="/gallery"
								class={css({ color: "fg.muted", textStyle: "sm" })}
							>
								Gallery
							</A>
						</HStack>
					</HStack>
					<HStack gap="1">
						<a
							href={forkRepositoryUrl}
							target="_blank"
							aria-label="GitHub"
							class={navbarIconButtonClass}
							rel="noreferrer"
						>
							GitHub
						</a>
						<ThemeSwitcher />
					</HStack>
				</HStack>
			</Container>
		</Flex>
	);
};
