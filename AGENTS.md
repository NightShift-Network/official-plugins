# Store Maintenance Guide

These instructions apply to the `nightshift-official` plugin store and its descendants.

## Store layout

- Root `plugin.json` is the store index. Its `plugins` array lists direct child plugin directories.
- `ad-blocker/` contains the NightShift Ad Blocker manifest, script, stylesheet, and `AD-BLOCKER.md` implementation notes.
- `interface-customization/plugin.json`, `plugin.js`, and `plugin.css` define NightShift Interface Customization.
- `interface-customization/README.md` describes its compact-layout toggle and current availability.
- `README.md` is the user-facing store overview and explains the indexed layout and how to add a plugin.
- `.gitignore` excludes local machine files, logs, environment files, and optional tool output.
- `.gitattributes` normalizes text files to LF.

Each plugin manifest uses the loader's `id`, `name`, optional `description` and `version`, and optional `script` and `styles` fields. Asset paths are relative to the directory containing that plugin's manifest. Keep IDs unique, stable, and within the loader's accepted character and length limits.

## Current loader behavior

NightShift supports indexed stores: the root `plugin.json` contains a `plugins` array of direct child directory names, and each listed directory contains one plugin manifest. Keep the index synchronized with actual plugin directories. Do not describe a plugin as available unless it is listed and its manifest assets exist.

Do not edit NightShift source or setup configuration from this store. If loader support is requested, make that change in the NightShift source checkout only when explicitly authorized, and update the store documentation to match the implemented discovery rules.

## Plugin behavior and safety

- Keep the ad blocker conservative and cosmetic. It does not perform network request filtering; document any new selectors, host rules, and likely page impact.
- Keep interface changes additive. Do not cover, move, disable, or intercept address, navigation, tab, fullscreen, or Settings controls.
- Plugin scripts run in the NightShift page with its browser permissions. Treat new scripts and external dependencies as trusted-code changes; avoid adding dependencies unless essential.
- Preserve local preference keys and avoid overwriting unrelated browser storage.
- Keep each plugin's user-facing behavior and limitations in its README and keep the store overview synchronized.

## Git and verification

Keep generated output, credentials, local environment files, and editor state out of Git. There is no build system or automated test suite in this store. For changes, parse every edited `plugin.json`, verify each declared script and stylesheet exists relative to its manifest, and run `node --check` on changed JavaScript. Browser behavior still requires manual verification in NightShift; syntax and manifest checks alone do not establish runtime support.

Before changing plugin assumptions, inspect the current NightShift source `AGENTS.md`, the README Plugins section, and the live loader implementation. They define the active store discovery and asset URL behavior.
