// React-safety: mutate only Text nodes' nodeValue and a narrow allowlist of
// user-facing attributes (placeholder, title, aria-label, aria-placeholder,
// alt). Never touch innerHTML, element.textContent, event handlers, or
// structural attributes — React owns those and will clobber us or detach
// event listeners. The allowlist covers placeholders, tooltips, and the ARIA
// surfaces that screen-reader-announced error messages ride on.

(() => {
  const DEFAULT_LANG = "ja";
  const SKIP_PARENT_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT"]);
  const TRANSLATABLE_ATTRS = [
    "placeholder",
    "title",
    "aria-label",
    "aria-placeholder",
    "aria-description",
    "alt",
  ];

  let dictionaries = {};
  let activeLang = DEFAULT_LANG;
  let lookup = new Map();
  let observer = null;
  let pendingNodes = new Set();
  let rafId = 0;

  function shouldSkip(textNode) {
    const parent = textNode.parentNode;
    if (!parent || parent.nodeType !== Node.ELEMENT_NODE) return true;
    if (SKIP_PARENT_TAGS.has(parent.tagName)) return true;
    if (parent.isContentEditable) return true;
    return false;
  }

  function translateString(raw) {
    if (typeof raw !== "string" || !raw) return null;
    const trimmed = raw.trim();
    if (!trimmed) return null;
    const hit = lookup.get(trimmed);
    if (hit === undefined) return null;
    const leading = raw.slice(0, raw.indexOf(trimmed));
    const trailing = raw.slice(raw.indexOf(trimmed) + trimmed.length);
    return leading + hit + trailing;
  }

  function translateAttributes(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return;
    for (const attr of TRANSLATABLE_ATTRS) {
      if (!el.hasAttribute(attr)) continue;
      const next = translateString(el.getAttribute(attr));
      if (next !== null && el.getAttribute(attr) !== next) {
        el.setAttribute(attr, next);
      }
    }
  }

  function walkAttributes(root) {
    if (!root) return;
    if (root.nodeType === Node.ELEMENT_NODE) translateAttributes(root);
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    // One querySelectorAll per subtree is cheaper than a TreeWalker for
    // element-only traversal, and React's updates are usually shallow.
    const selector = TRANSLATABLE_ATTRS.map((a) => `[${a}]`).join(",");
    const els = root.querySelectorAll(selector);
    for (const el of els) translateAttributes(el);
  }

  function translateTextNode(node) {
    if (shouldSkip(node)) return;
    const next = translateString(node.nodeValue);
    if (next !== null && node.nodeValue !== next) node.nodeValue = next;
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (shouldSkip(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    let n;
    while ((n = walker.nextNode())) translateTextNode(n);
    walkAttributes(root);
  }

  function flushPending() {
    rafId = 0;
    const nodes = pendingNodes;
    pendingNodes = new Set();
    nodes.forEach(walk);
  }

  function schedule(node) {
    pendingNodes.add(node);
    if (!rafId) rafId = requestAnimationFrame(flushPending);
  }

  function buildLookup() {
    lookup = new Map();
    const translations = (dictionaries && dictionaries.translations) || {};
    // Shape: { "<English term>": { "<lang code>": "<translated>" } }
    // Missing codes fall through silently — that term stays in English.
    for (const [englishTerm, perLang] of Object.entries(translations)) {
      if (!perLang || typeof perLang !== "object") continue;
      const translated = perLang[activeLang];
      if (typeof translated === "string" && translated) {
        lookup.set(englishTerm, translated);
      }
    }
  }

  function startObserver() {
    if (observer) observer.disconnect();
    if (lookup.size === 0) return; // English / empty dictionary: do nothing.
    observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "childList") {
          m.addedNodes.forEach((n) => schedule(n));
        } else if (m.type === "characterData") {
          schedule(m.target);
        } else if (m.type === "attributes") {
          // React re-rendered an element with a fresh placeholder/title/etc.
          // Re-translate just this element; don't re-walk the whole subtree.
          if (m.target && m.target.nodeType === Node.ELEMENT_NODE) {
            translateAttributes(m.target);
          }
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: TRANSLATABLE_ATTRS,
    });
  }

  function stopObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function applyLanguage(lang) {
    activeLang = lang || DEFAULT_LANG;
    buildLookup();
    if (lookup.size === 0) {
      // Passthrough mode (English/none). Leave the DOM alone — a full page
      // reload from the popup restores original copy.
      stopObserver();
      return;
    }
    walk(document.body);
    startObserver();
  }

  async function loadDictionaries() {
    const url = chrome.runtime.getURL("languages.json");
    const res = await fetch(url);
    dictionaries = await res.json();
  }

  function readLang() {
    return new Promise((resolve) => {
      chrome.storage.sync.get({ language: DEFAULT_LANG }, (out) => resolve(out.language));
    });
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync" || !changes.language) return;
    applyLanguage(changes.language.newValue);
  });

  (async () => {
    try {
      await loadDictionaries();
      const lang = await readLang();
      applyLanguage(lang);
    } catch (err) {
      console.warn("[OneSignal Translator] init failed:", err);
    }
  })();
})();
