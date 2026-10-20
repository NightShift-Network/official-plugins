# NightShift Interface Customization

Adds an `Aa` button beside Settings in the NightShift header. The button toggles a compact layout with shorter browser bars, a narrower sidebar, and less padding on internal pages. The choice is saved in local storage on the current device. Press the button again to restore the comfortable spacing.

The toggle is additive and leaves the address field, navigation buttons, tabs, and Settings control in place. The current NightShift loader only discovers the root `plugin.json` of each store, so this nested plugin is not yet loaded or listed at `nightshift://plugins`. Once the loader supports multiple manifests per store, it can be managed there and changes will take effect after reload.
