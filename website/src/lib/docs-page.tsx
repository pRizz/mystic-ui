import {
	type Accessor,
	type ParentComponent,
	createContext,
	useContext,
} from "solid-js";
import type { ComponentFramework } from "./docs";

interface DocsPageContextValue {
	componentId: Accessor<string>;
	framework: Accessor<ComponentFramework>;
}

const DocsPageContext = createContext<DocsPageContextValue>();

export const DocsPageProvider: ParentComponent<DocsPageContextValue> = (
	props,
) => {
	return (
		<DocsPageContext.Provider
			value={{
				componentId: props.componentId,
				framework: props.framework,
			}}
		>
			{props.children}
		</DocsPageContext.Provider>
	);
};

export function useDocsPage() {
	const maybeContext = useContext(DocsPageContext);
	if (!maybeContext) {
		throw new Error("Docs page context is unavailable");
	}

	return maybeContext;
}
