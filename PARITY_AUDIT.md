# Mystic UI parity audit

This file tracks the current parity target for bringing Mystic UI as close as practical to the upstream open-source Magic UI component surface.

The machine-readable source of truth lives in `packages/registry/src/parity.ts`.

## Current snapshot

- Upstream Magic UI public components tracked: **70**
- Current Mystic overlap by name:
  - Tailwind: **23**
  - Panda: **23**
  - Docs: **23**
- Current parity status counts:
  - Partial: **22**
  - Missing: **45**
  - Exception: **3**
- Fork-only Mystic extras tracked separately: **12**

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

- `animated-subscribe-button`
- `tweet-card`
- `client-tweet-card`

These are excluded because they either lack a public upstream registry artifact or depend on React-specific infrastructure that does not map cleanly into SolidJS today.

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
2. Fix docs rendering and framework-aware previews
3. Normalize currently overlapping components toward upstream APIs
4. Port missing components in batches
5. Re-run the parity scorecard after each batch
