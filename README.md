# Official NightShift Plugin Store

This store contains two separately manifested plugins:

- **NightShift Ad Blocker** — the plugin described by the root `plugin.json`; its script and stylesheet are at the store root.
- **NightShift Interface Customization** — its manifest and assets are in `interface-customization/`.

## Current NightShift loader limitation

The current loader scans each configured store directory for exactly one root `plugin.json`. It does not scan subdirectories or read a store-level plugin list. As a result, the ad blocker is discovered and can be enabled or disabled at `nightshift://plugins`; the interface customization plugin is present in this store but is not discovered, shown in that page, or loaded. Its nested manifest is kept ready for a future loader that supports multiple plugins per store.

Making both plugins active from this one store requires a NightShift source change to discover and validate nested plugin manifests. This store does not modify NightShift source or setup configuration.

## Ad blocker behavior and limits

The ad blocker applies conservative cosmetic filtering in accessible proxied pages. It hides embedded frames from a short list of common advertising networks and elements with explicit ad labels or common Google ad markup. It watches accessible documents for newly inserted matching elements.

It does not cancel requests or filter scripts, and matching content may have downloaded before being hidden. It cannot reliably inspect cross-origin frames. First-party ads, video ads, sponsored search results, and ads without recognizable markup may remain. Narrow selectors can still hide ordinary content if a site uses one of those ad labels. Disable the ad blocker at `nightshift://plugins` if a page layout is affected; reload to apply the change.

See [AD-BLOCKER.md](AD-BLOCKER.md) and [interface-customization/README.md](interface-customization/README.md) for plugin details.
