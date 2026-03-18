# Mystic UI parity audit

This file tracks the current parity target for bringing Mystic UI as close as practical to the upstream open-source Magic UI component surface.

The machine-readable source of truth lives in `packages/registry/src/parity.ts`.

## Current snapshot

- Upstream Magic UI public components tracked: **70**
- Current Mystic overlap by name:
  - Tailwind: **44**
  - Panda: **44**
  - Docs: **44**
- Docs authoring coverage for existing component pages:
  - Pages with usage guidance: **52 / 52**
  - Pages with props guidance: **52 / 52**
- Current parity status counts:
  - Partial: **44**
  - Missing: **24**
  - Exception: **2**
- Fork-only Mystic extras tracked separately: **12**

## Infrastructure status

The core parity infrastructure is now in much better shape:

- component docs render full MDX bodies
- story previews are framework-aware
- manual install instructions read from the local in-repo registry artifacts
- the CLI resolves project-relative paths from the actual project root
- registry dependency extraction now normalizes subpath imports like `solid-icons/tb` to installable package roots

The main remaining parity work is no longer docs/rendering plumbing; it is the remaining API/runtime parity gaps and the set of still-missing upstream components.

## What "partial" means

An entry is marked `partial` when at least some local implementation exists, but one or more of the following still needs work:

- API compatibility with upstream
- runtime behavior parity
- Panda coverage
- docs coverage
- multi-demo/story coverage

## What "exception" means

An entry is marked `exception` when it is intentionally outside the current parity target unless product scope changes.

Current component exceptions are limited to:

- `tweet-card`
- `client-tweet-card`

These are excluded because they depend on React-specific infrastructure that does not map cleanly into SolidJS today.

`animated-subscribe-button` is no longer treated as an exception. Upstream now exposes a public component implementation, so Mystic tracks it as part of the normal missing backlog.

## Fork-only components

Mystic currently includes several non-upstream extras, such as:

- `flip-text`
- `gradual-spacing`
- `letter-pullup`
- `word-fade-in`
- `word-pullup`
- `spotlight`

These should remain documented as fork extras unless they are intentionally renamed, deprecated, or mapped onto upstream components during future parity work.

## Approved non-component exceptions

The following are explicitly out of scope for component parity:

- Magic UI marketing site, blog, showcase, and paid templates
- React-specific install affordances like Open in v0
- tweet embed features until a Solid-native replacement strategy exists

## Execution order

1. Maintain the parity manifest as the source of truth
2. Normalize currently overlapping components toward upstream APIs
3. Port missing components in batches
4. Re-run the parity scorecard after each batch
