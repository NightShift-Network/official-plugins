# NightShift Ad Blocker

This plugin applies conservative cosmetic filtering in proxied pages. It hides embedded frames whose URL belongs to a short list of widely used advertising networks, plus elements carrying explicit ad labels or common Google ad markup. It watches accessible page documents for newly inserted matching elements.

## Limits

- It does not cancel requests, filter scripts, or block tracking pixels at the network layer. Matching content may already have downloaded before it is hidden.
- It can inspect only documents the browser exposes to the NightShift page. Cross-origin frames and some site isolation arrangements are inaccessible.
- Ads served from a site's own domain, video ads, sponsored search results, and ads without recognizable markup can remain visible.
- The narrow rules can miss ads. They may hide a site element that uses one of the explicit ad labels for ordinary content.

This is a best-effort page cleanup, not a replacement for a network-level content blocker. Disable it at `nightshift://plugins` if a page layout is affected; changes take effect after reload.
