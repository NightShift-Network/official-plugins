# Official NightShift Plugin Store

This store uses an indexed layout. The root `plugin.json` names the store and lists each plugin directory in its `plugins` array. Each listed directory contains its own `plugin.json` and the assets declared by that manifest.

## Plugins

- **NightShift Ad Blocker** — `ad-blocker/`
- **NightShift Interface Customization** — `interface-customization/`

## Adding a plugin

Create a direct child directory with a safe, descriptive name, then place the plugin's `plugin.json`, script, stylesheet, and any other assets inside it. Add that directory name to the root index's `plugins` array. Keep manifest asset paths relative to the plugin directory. Do not add hidden directories, nested paths, or folders that do not contain plugins to the index.

## Ad blocker behavior and limits

The ad blocker applies conservative cosmetic filtering in accessible proxied pages. It hides embedded frames from a short list of common advertising networks and elements with explicit ad labels or common Google ad markup. It watches accessible documents for newly inserted matching elements.

It does not cancel requests or filter scripts, and matching content may have downloaded before being hidden. It cannot reliably inspect cross-origin frames. First-party ads, video ads, sponsored search results, and ads without recognizable markup may remain. Narrow selectors can still hide ordinary content if a site uses one of those ad labels. Disable the ad blocker at `nightshift://plugins` if a page layout is affected; reload to apply the change.

See [ad-blocker/AD-BLOCKER.md](ad-blocker/AD-BLOCKER.md) and [interface-customization/README.md](interface-customization/README.md) for plugin details.
