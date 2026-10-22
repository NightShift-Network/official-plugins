(function () {
  "use strict";

  const storageKey = "nightshift-interface-compact";
  const buttonId = "nightshift-compact-toggle";
  const pluginId = "nightshift-interface-customization";
  const themeKey = "theme";
  const themes = [
    { id: "default", label: "Night Lime" },
    { id: "ocean", label: "Ocean" },
    { id: "violet", label: "Violet" },
    { id: "ember", label: "Ember" },
  ];

  function applyTheme(themeId) {
    const theme = themes.some(option => option.id === themeId) ? themeId : "default";
    document.body.dataset.nightshiftTheme = theme;
  }

  function registerSettings() {
    const api = window.NightShiftPlugins;
    if (!api || typeof api.registerSettings !== "function") return;
    api.registerSettings(pluginId, ({ container, settings, save }) => {
      const label = document.createElement("label");
      label.className = "settings-label";
      label.htmlFor = "nightshift-interface-theme";
      label.textContent = "Color theme";

      const select = document.createElement("select");
      select.id = "nightshift-interface-theme";
      select.className = "settings-select";
      themes.forEach(theme => {
        const option = document.createElement("option");
        option.value = theme.id;
        option.textContent = theme.label;
        select.append(option);
      });
      select.value = themes.some(theme => theme.id === settings[themeKey]) ? settings[themeKey] : "default";
      select.addEventListener("change", () => {
        applyTheme(select.value);
        save({ ...settings, [themeKey]: select.value });
      });

      const help = document.createElement("p");
      help.className = "settings-help";
      help.textContent = "Applies immediately and is saved in this browser.";
      container.append(label, select, help);
    });
  }

  registerSettings();

  try {
    const settings = window.NightShiftPlugins?.getSettings(pluginId) || {};
    applyTheme(settings[themeKey]);
  } catch {
    applyTheme("default");
  }

  function start() {
    const settingsButton = document.querySelector(".settings-button");
    if (!settingsButton || document.getElementById(buttonId)) return;

    let compact = false;
    try { compact = localStorage.getItem(storageKey) === "true"; } catch {}
    document.body.classList.toggle("nightshift-compact", compact);

    const button = document.createElement("button");
    button.id = buttonId;
    button.className = "icon-button nightshift-compact-toggle";
    button.type = "button";
    button.setAttribute("aria-label", "Use compact interface");
    button.setAttribute("aria-pressed", String(compact));
    button.title = "Toggle compact interface";
    button.textContent = "Aa";
    button.addEventListener("click", () => {
      compact = !document.body.classList.contains("nightshift-compact");
      document.body.classList.toggle("nightshift-compact", compact);
      button.setAttribute("aria-pressed", String(compact));
      button.setAttribute("aria-label", compact ? "Use comfortable interface" : "Use compact interface");
      try { localStorage.setItem(storageKey, String(compact)); } catch {}
    });
    settingsButton.before(button);
    button.setAttribute("aria-label", compact ? "Use comfortable interface" : "Use compact interface");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
