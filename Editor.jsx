import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { defaultContent } from "./content.js";

/**
 * Editor system for the SuperJack deck.
 *
 * - <ContentProvider>     — wraps the deck, manages content state + localStorage
 * - useContent()          — read-only access to current content (by dotted path)
 * - <Editable id="...">   — wraps a span/heading/cell to make it click-editable
 * - <EditorToolbar />     — pill in the corner: Edit/View toggle, Reset, Export, Import
 *
 * Storage key: "superjack-deck-content-v1" in localStorage. Bump the version
 * if you change the schema in content.js so users get fresh defaults.
 */

const STORAGE_KEY = "superjack-deck-content-v1";

// ─── Context ───────────────────────────────────────────────────────────────

const ContentCtx = createContext({
  content: defaultContent,
  editing: false,
  setEditing: () => {},
  setValue: () => {},
  reset: () => {},
});

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [editing, setEditing] = useState(false);

  // Load any saved overrides on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep-merge so newly-added schema fields fall back to defaults.
        setContent(deepMerge(defaultContent, parsed));
      }
    } catch (err) {
      console.warn("Failed to load saved deck content:", err);
    }
  }, []);

  // Save on every change (skip the very first render).
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (err) {
      console.warn("Failed to save deck content:", err);
    }
  }, [content]);

  // Update a value at a dotted path: setValue("cover.titleLeft", "SUPER")
  const setValue = useCallback((path, value) => {
    setContent((prev) => setAtPath(prev, path, value));
  }, []);

  const reset = useCallback(() => {
    if (
      confirm(
        "Reset all copy to defaults?\n\nThis clears every edit you've made in the browser and reloads the original content from content.js."
      )
    ) {
      localStorage.removeItem(STORAGE_KEY);
      setContent(defaultContent);
    }
  }, []);

  return (
    <ContentCtx.Provider value={{ content, editing, setEditing, setValue, reset }}>
      {children}
    </ContentCtx.Provider>
  );
}

// ─── Hooks ─────────────────────────────────────────────────────────────────

/** Read a value at a dotted path. Falls back to the path itself if missing. */
export function useContent(path) {
  const { content } = useContext(ContentCtx);
  return getAtPath(content, path) ?? path;
}

/** Get the full editor API (for the toolbar & Editable component). */
export function useEditor() {
  return useContext(ContentCtx);
}

// ─── <Editable> ────────────────────────────────────────────────────────────

/**
 * Wraps a piece of text. When edit mode is on, click to edit inline.
 * In view mode, renders as plain text.
 *
 * Props:
 *   - id        (required) dotted path into content, e.g. "cover.titleLeft"
 *   - as        element type to render (default "span")
 *   - multiline if true, edits in a textarea
 *   - className passed through
 *   - style     passed through
 */
export function Editable({
  id,
  as: Tag = "span",
  multiline = false,
  className = "",
  style = {},
  children, // ignored — content comes from the context
  ...rest
}) {
  const { editing, setValue } = useEditor();
  const value = useContent(id);

  if (!editing) {
    return (
      <Tag className={className} style={style} {...rest}>
        {value}
      </Tag>
    );
  }

  // Edit mode: contentEditable for single-line, textarea for multi-line.
  if (multiline) {
    return (
      <textarea
        className={className}
        style={{
          ...style,
          background: "rgba(245,124,0,0.12)",
          outline: "1.5px dashed #F57C00",
          outlineOffset: "2px",
          width: "100%",
          minHeight: "4em",
          resize: "vertical",
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
          lineHeight: "inherit",
          color: "inherit",
          letterSpacing: "inherit",
          padding: "4px 6px",
          border: "none",
          borderRadius: "2px",
        }}
        defaultValue={value}
        onBlur={(e) => setValue(id, e.target.value)}
        {...rest}
      />
    );
  }

  return (
    <Tag
      className={className}
      style={{
        ...style,
        background: "rgba(245,124,0,0.12)",
        outline: "1.5px dashed #F57C00",
        outlineOffset: "2px",
        borderRadius: "2px",
        cursor: "text",
        padding: "0 2px",
      }}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => setValue(id, e.currentTarget.textContent)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          e.currentTarget.blur();
        }
        if (e.key === "Escape") {
          e.currentTarget.textContent = value;
          e.currentTarget.blur();
        }
      }}
      {...rest}
    >
      {value}
    </Tag>
  );
}

// ─── <EditorToolbar> ───────────────────────────────────────────────────────

export function EditorToolbar() {
  const { editing, setEditing, content, reset } = useEditor();
  const [copied, setCopied] = useState(false);
  const fileInput = useRef(null);

  // Keyboard shortcut: Cmd/Ctrl-E toggles edit mode
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setEditing((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setEditing]);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `superjack-deck-content-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.warn("Clipboard copy failed:", err);
    }
  };

  const importJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const merged = deepMerge(defaultContent, parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        location.reload();
      } catch (err) {
        alert("Invalid JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // reset so the same file can be re-imported
  };

  const btn = {
    base:
      "h-8 px-3 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-1.5 transition hover:opacity-80",
  };

  return (
    <div
      className="fixed top-4 right-4 z-[60] flex items-center gap-1 print:hidden"
      style={{
        backgroundColor: "#171717",
        color: "#F5F1EA",
        border: "1px solid #171717",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      }}
    >
      <button
        className={btn.base}
        style={{
          backgroundColor: editing ? "#F57C00" : "transparent",
          color: editing ? "#171717" : "#F5F1EA",
          fontWeight: editing ? 700 : 400,
        }}
        onClick={() => setEditing((p) => !p)}
        title="Toggle edit mode (⌘E)"
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: editing ? "#171717" : "#F57C00" }} />
        {editing ? "Editing" : "Edit"}
      </button>

      {editing && (
        <>
          <div className="w-px h-5" style={{ backgroundColor: "rgba(245,241,234,0.2)" }} />

          <button className={btn.base} onClick={copyJson} title="Copy JSON to clipboard">
            {copied ? "Copied ✓" : "Copy JSON"}
          </button>

          <button className={btn.base} onClick={exportJson} title="Download JSON file">
            Export
          </button>

          <button
            className={btn.base}
            onClick={() => fileInput.current?.click()}
            title="Load JSON file"
          >
            Import
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={importJson}
          />

          <div className="w-px h-5" style={{ backgroundColor: "rgba(245,241,234,0.2)" }} />

          <button
            className={btn.base}
            onClick={reset}
            title="Reset all copy to defaults"
            style={{ color: "#ff8c1a" }}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
}

// Help banner that explains how editing works on first load.
export function EditModeHint() {
  const { editing } = useEditor();
  if (!editing) return null;
  return (
    <div
      className="fixed top-16 right-4 z-[59] max-w-[280px] p-3 text-[11px] leading-relaxed font-mono print:hidden"
      style={{
        backgroundColor: "#F5F1EA",
        color: "#171717",
        border: "1px solid #171717",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      }}
    >
      <div className="font-bold uppercase tracking-[0.2em] text-[10px] mb-1.5" style={{ color: "#F57C00" }}>
        Edit mode
      </div>
      Click any orange-outlined text to edit. <strong>Enter</strong> to save,
      <strong> Esc</strong> to cancel. Changes auto-save to your browser. Use{" "}
      <strong>Export</strong> to download your final JSON.
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function getAtPath(obj, path) {
  if (!path) return undefined;
  return path.split(".").reduce((acc, key) => {
    if (acc == null) return undefined;
    // Support array indices: "problem.pains.0.stat"
    if (Array.isArray(acc) && /^\d+$/.test(key)) return acc[Number(key)];
    return acc[key];
  }, obj);
}

function setAtPath(obj, path, value) {
  const keys = path.split(".");
  const root = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur = root;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const next = cur[key];
    const cloned = Array.isArray(next) ? [...next] : { ...next };
    cur[key] = cloned;
    cur = cloned;
  }
  cur[keys[keys.length - 1]] = value;
  return root;
}

function deepMerge(base, override) {
  if (Array.isArray(base) && Array.isArray(override)) {
    // For arrays, prefer the override (so deletions stick) but pad with base.
    return override;
  }
  if (
    base &&
    typeof base === "object" &&
    override &&
    typeof override === "object" &&
    !Array.isArray(base) &&
    !Array.isArray(override)
  ) {
    const out = { ...base };
    for (const k of Object.keys(override)) {
      out[k] = deepMerge(base[k], override[k]);
    }
    return out;
  }
  return override !== undefined ? override : base;
}
