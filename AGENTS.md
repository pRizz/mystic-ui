# Agent Hints

## GitHub Package Surface

- The repo root is the GitHub install surface.
- Keep the public package contract limited to:
  - `mystic-ui`
  - `mystic-ui/tailwind`
- Do not expose Panda from the root package until its generated `styled-system` output is part of the shipped package surface.
- Do not add a root `prepare` script that installs git hooks automatically. This repo is also consumed as a GitHub dependency, so `prepare` would run in consumer installs.

## When To Run Package Checks

- If you touch any of these paths, run `bun run check:github-package` before committing:
  - `package.json`
  - `bun.lock`
  - `.npmignore`
  - `README.md`
  - `components/tailwind/src/**`
- If the check says dependencies are missing, run `bun install`.

## Pre-Commit Hook

- The tracked hook lives at `.githooks/pre-commit`.
- Install it locally with `bun run githooks:install`.
- The hook only runs for staged GitHub-package-surface changes and prints package-specific hints before running the verification script.
