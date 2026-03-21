import { MetaProvider, Title } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { type ParentComponent, Show, Suspense } from "solid-js";
import "@fontsource-variable/rubik";
import "./app.css";
import { Navbar } from "./components/navbar";
import { ThemeProvider } from "./components/theme-provider";

const Layout: ParentComponent = (props) => {
	const location = useLocation();
	const showChrome = () =>
		!location.pathname.startsWith("/gallery-preview/") &&
		!location.pathname.startsWith("/gallery/") &&
		!location.pathname.startsWith("/demos/");

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
			base={import.meta.env.SERVER_BASE_URL}
			root={(props) => (
				<MetaProvider>
					<Title>Mystic UI</Title>
					<ThemeProvider>
						<Layout>{props.children}</Layout>
					</ThemeProvider>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
