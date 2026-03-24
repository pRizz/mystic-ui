# Tailwind + Mystic UI

Mystic UI can be consumed as a GitHub dependency in **Vite + SolidJS + Tailwind CSS 3.x** apps.

## Quickstart

```sh
npm install github:pRizz/mystic-ui
```

```ts
import type { Config } from "tailwindcss";
import { withMysticUI } from "mystic-ui/tailwind/setup";

const config = withMysticUI({
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
}) satisfies Config;

export default config;
```

```css
@import "mystic-ui/tailwind/theme.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

```tsx
import { RippleButton } from "mystic-ui";
```

Notes:

- `mystic-ui/tailwind` re-exports the same Tailwind components as `mystic-ui`.
- The supported package-consumer setup is Vite + SolidJS only in this pass.
- Use `solid-js@^1.9.8` or newer in the 1.x line for package consumption.
- Panda is not part of the GitHub package contract yet.
- Use class-based dark mode and keep `skipLibCheck: true` in your app `tsconfig` for the currently verified setup.
