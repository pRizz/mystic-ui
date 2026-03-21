# Mystic UI Website

The website for Mystic UI is created using the [Solid Start](https://start.solidjs.com/) framework and the Mystic UI (*duhh*), [Park UI](https://park-ui.com/) and [PandaCSS](https://panda-css.com/) libraries.

## Deployment modes

The website can be built for a standalone/root deployment or for a GitHub Pages
project site.

### Environment variables

- `BASE_PATH`: Highest-priority override for the deployed site path.
  - Examples: `/`, `/mystic-ui`, `/gallery`
- `DEPLOY_TARGET`: Optional deployment target hint.
  - `github-pages` derives `BASE_PATH` from `GITHUB_REPOSITORY` when no
    explicit `BASE_PATH` is provided.
  - Any other value, or no value, defaults to standalone behavior.

### Precedence

The website resolves its public base path in this order:

1. `BASE_PATH`
2. `DEPLOY_TARGET=github-pages` plus `GITHUB_REPOSITORY`
3. `/`

### Common commands

Build for a standalone site at the root path:

```bash
BASE_PATH=/ bun run --filter @mystic-ui/website build
```

Build for GitHub Pages with automatic repo-subpath detection:

```bash
DEPLOY_TARGET=github-pages bun run --filter @mystic-ui/website build:pages
```

The GitHub Actions Pages workflow also accepts an optional repository variable
named `PAGES_BASE_PATH`. Set it to `/` for a root/custom-domain deployment or to
another subpath when the site should live below the domain root.

Build for a custom subpath:

```bash
BASE_PATH=/marketing bun run --filter @mystic-ui/website build:pages
```

Run the smoke test against the default root deployment:

```bash
bun run --filter @mystic-ui/website smoke:test
```

Run the smoke test against a repo-subpath deployment:

```bash
PLAYWRIGHT_BASE_PATH=/mystic-ui bun run --filter @mystic-ui/website smoke:test
```