(function () {
  "use strict";

  const storageKey = "nightshift-interface-compact";
  const buttonId = "nightshift-compact-toggle";

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
