(function () {
  "use strict";

  const pluginMarker = "data-nightshift-adblock";
  const adHosts = new Set([
    "doubleclick.net",
    "googlesyndication.com",
    "googleadservices.com",
    "amazon-adsystem.com",
    "adnxs.com",
    "taboola.com",
    "outbrain.com",
    "criteo.com",
    "smartadserver.com"
  ]);
  const adSelectors = [
    "ins.adsbygoogle",
    "[data-ad]",
    "[data-advertisement]",
    "[aria-label='Advertisement' i]",
    "[aria-label='Sponsored advertisement' i]",
    "iframe[id^='google_ads_iframe']",
    "[id^='ad-container-']",
    "[id^='advertisement-']"
  ].join(",");
  const observedDocuments = new WeakSet();

  function isAdHost(hostname) {
    const host = hostname.toLowerCase().replace(/\.$/, "");
    return [...adHosts].some(domain => host === domain || host.endsWith(`.${domain}`));
  }

  function markAd(element) {
    if (!(element instanceof Element) || element.hasAttribute(pluginMarker)) return;
    element.setAttribute(pluginMarker, "true");
  }

  function trackFrame(frame) {
    if (!(frame instanceof HTMLIFrameElement) || frame.dataset.nightshiftAdblockWatched) return;
    frame.dataset.nightshiftAdblockWatched = "true";
    frame.addEventListener("load", () => {
      try { watchDocument(frame.contentDocument); } catch {}
    });
    try { watchDocument(frame.contentDocument); } catch {}
  }

  function inspectElement(element) {
    if (!(element instanceof Element)) return;
    if (element.matches("iframe[src]")) {
      try {
        if (isAdHost(new URL(element.getAttribute("src"), element.ownerDocument.baseURI).hostname)) markAd(element);
      } catch {}
      trackFrame(element);
    }
    if (element.matches(adSelectors)) markAd(element);
    element.querySelectorAll?.("iframe[src]").forEach(frame => inspectElement(frame));
    element.querySelectorAll?.(adSelectors).forEach(markAd);
  }

  function watchDocument(doc) {
    if (!doc || observedDocuments.has(doc)) return;
    observedDocuments.add(doc);
    try {
      if (!doc.documentElement) return;
      if (!doc.getElementById("nightshift-adblock-styles")) {
        const style = doc.createElement("style");
        style.id = "nightshift-adblock-styles";
        style.textContent = `[${pluginMarker}="true"]{display:none!important;visibility:hidden!important}`;
        (doc.head || doc.documentElement).append(style);
      }
      inspectElement(doc.documentElement);
      const observer = new MutationObserver(records => {
        for (const record of records) {
          if (record.type === "childList") record.addedNodes.forEach(inspectElement);
          else if (record.type === "attributes") inspectElement(record.target);
        }
      });
      observer.observe(doc.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["src", "id", "class", "data-ad", "data-advertisement", "aria-label"]
      });
      doc.querySelectorAll("iframe").forEach(trackFrame);
    } catch {}
  }

  function watchFrames() {
    document.querySelectorAll("iframe.browser-frame").forEach(trackFrame);
  }

  function start() {
    watchFrames();
    const frames = document.querySelector("#frames");
    if (frames) new MutationObserver(watchFrames).observe(frames, { childList: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
