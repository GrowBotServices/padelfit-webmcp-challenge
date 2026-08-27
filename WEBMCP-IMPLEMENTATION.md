# Padelfit WebMCP Challenge Extension

## Scope

Padelfit was an existing React application before the WebMCP Challenge submission period. The original buyer experience includes the gear catalogue, weighted quiz, recommendation cards, and comparison table. This extension adds an agent-native co-pilot while preserving those human-facing flows.

## New WebMCP functionality

The home page registers four client-side WebMCP tools when the browser exposes `document.modelContext`:

- `search_products` searches the catalogue by category, product terms, and feature tags.
- `recommend_gear` applies the same weighted matching logic as the human quiz and returns up to three recommendations with reasons and trade-offs.
- `compare_products` places up to three catalogue items into the visible comparison table.
- `add_to_shortlist` adds up to five products to a human-review shortlist without taking a retailer or purchase action.

The tools are intentionally client-side and read-only for searching and recommendations. The two UI-mutating tools only change the visible Padelfit page state; the player remains in control of the final retailer decision.

## Human-agent experience

1. The player describes their needs to their browser agent in natural language.
2. The agent calls `recommend_gear` with structured profile fields.
3. Padelfit renders the resulting products, matching reasons, and trade-offs.
4. The agent can call `compare_products` or `add_to_shortlist`.
5. The player reviews the shortlist and chooses whether to visit a retailer.

Example request:

> Find me a comfortable racket for a regular player with tennis elbow, then compare the top two.

## Provenance

The pre-existing functionality and available history are recorded in [`PROJECT-HISTORY.md`](./PROJECT-HISTORY.md). The source export ended at revision `2694edb` dated 10 August 2026 and contained no WebMCP implementation. WebMCP work is recorded in subsequent commits in this repository.

## Local verification

```bash
npx --yes pnpm@10.4.1 check
node quiz-scoring-test.mjs
npx --yes pnpm@10.4.1 build
```

Use HTTPS in a WebMCP-compatible browser. In Chrome, enable `chrome://flags/#enable-webmcp-testing` where required by the current preview. In a compatible session, the home page displays `WebMCP tools registered` in the Gear Co-Pilot panel.
