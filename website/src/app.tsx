import { MetaProvider, Title } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { type ParentComponent, Show, Suspense } from "solid-js";
import "@fontsource-variable/rubik";
import "./app.css";
import { Navbar } from "./components/navbar";

const Layout: ParentComponent = (props) => {
	const location = useLocation();
	const showChrome = () =>
		!location.pathname.startsWith("/gallery-preview/") &&
		!location.pathname.startsWith("/gallery/");

	return (
		<>
			<Show when={showChrome()}>
				<Navbar />
			</Show>
			<Suspense>{props.children}</Suspense>
		</>
	);
};

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Title>Mystic UI</Title>

					<Layout>{props.children}</Layout>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
