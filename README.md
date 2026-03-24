# Mystic UI

Components that fill the gap of *cool and beautiful components* in the **SolidJS** ecosystem. Crafted with care using **TailwindCSS**, **PandaCSS** and **Motion One**.

## Tailwind Package Quickstart

The repo root can be installed directly from GitHub as a source-only package for **Vite + SolidJS + Tailwind CSS 3.x** consumers.

```bash
npm install github:pRizz/mystic-ui
```

Configure Tailwind with the public setup helper:

```ts
import type { Config } from "tailwindcss";
import { withMysticUI } from "mystic-ui/tailwind/setup";

const config = withMysticUI({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
}) satisfies Config;

export default config;
```

Import the shared theme tokens once from your app stylesheet:

```css
@import "mystic-ui/tailwind/theme.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then import components from the package:

```tsx
import { WordRotate } from "mystic-ui";
```

`mystic-ui/tailwind` re-exports the same Tailwind component surface.

Important compatibility notes:

- Only the **Tailwind** component surface is exported from the root package.
- This package contract is intended for **Vite** projects using **SolidJS** / `vite-plugin-solid`.
- Use `solid-js@^1.9.8` or newer in the 1.x line. Earlier 1.9 releases do not export the runtime helpers required by source-shipped components.
- `mystic-ui/tailwind/setup` and `mystic-ui/tailwind/theme.css` are the supported one-time setup assets for package consumers.
- Import `mystic-ui/tailwind/theme.css` from your app stylesheet, not from `main.tsx`, so the shared tokens land in the built CSS output.
- Use class-based dark mode. Mystic components expect `.dark` on `document.documentElement`.
- Keep `skipLibCheck: true` in your app `tsconfig` for now to match the verified consumer setup.
- **Panda** components are not exported yet because they depend on generated `styled-system` files that are not shipped in the root package contract.

## Features

- **Compatible with both Tailwind and Panda** - Use with the css framework of your choice!
- **Copy+Paste Components** - As simple as it sounds.
- **CLI Support** - Add Mystic components to your projects even faster.
- **TypeScript** - Get all the intellisense you want.

## GitHub Dependency Notes

- The root package exports `mystic-ui`, `mystic-ui/tailwind`, `mystic-ui/tailwind/setup`, and `mystic-ui/tailwind/theme.css`.
- Deep imports into workspace packages such as `@mystic-ui/tailwind` are not part of the GitHub install contract.
- The GitHub package is source-only on purpose; no `dist` output is committed for this compatibility pass.

## Why?

I think by now we all know how important a good UI is for websites and applications. It's the first thing users see and it's the first thing they interact with, so it's important to get it right.

Inspite of that, I would rather focus on buiding the *heart* of the software, I guess that's why component libraries such as [shadcn/ui](https://ui.shadcn.com/) and [Park UI](https://park-ui.com/) are so popular, they allow developers to focus on the core of their software while resting assured in the fact that users will have a good first impression.

That's why I made **Mystic UI**, because currently there is no collection of *cool and beautiful components* for the SolidJS ecosystem, and I think it's important to have one.

## Acknowledgements

This project is standing on the shoulders of giants such as:


- [Magic UI](https://magicui.design/) - primary inspiration for the project and components
- [Aceternity UI](https://ui.aceternity.com/) - components
- [Eldora UI](https://eldoraui.site) - components
- [UI Layout](https://ui-layout.com) - components
- [SolidJS](https://solidjs.com/) and [Solid Start](https://start.solidjs.com/) - *obviously*

## PRs Welcome

If you want to see a component here, open an issue or create a PR. Sometimes it gets tough with just a single guy maintaining a huge project, so any help is appreciated.


Created by the [scc](https://github.com/boyter/scc) code counter:

```
───────────────────────────────────────────────────────────────────────────────
Language                 Files     Lines   Blanks  Comments     Code Complexity
───────────────────────────────────────────────────────────────────────────────
TypeScript                 254     10187      890       194     9103        204
JSON                        89       773       28         0      745          0
Markdown                     8       110       41         0       69          0
gitignore                    8       970      385       218      367          0
CSS                          5         9        0         0        9          0
TypeScript Typings           5         5        0         5        0          0
JavaScript                   4        51        5         2       44          0
SVG                          4         4        0         0        4          0
HTML                         2        26        0         0       26          0
───────────────────────────────────────────────────────────────────────────────
Total                      379     12135     1349       419    10367        204
───────────────────────────────────────────────────────────────────────────────
Estimated Cost to Develop (organic) $314,797
Estimated Schedule Effort (organic) 8.86 months
Estimated People Required (organic) 3.15
───────────────────────────────────────────────────────────────────────────────
Processed 497107 bytes, 0.497 megabytes (SI)
───────────────────────────────────────────────────────────────────────────────
```
