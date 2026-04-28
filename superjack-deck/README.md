# SuperJack — Seed Investor Deck

A 12-slide React pitch deck for the SuperJack handyman dispatch platform.
Built with Vite + React + Tailwind. **All copy is click-to-edit in the
browser** — toggle Edit mode and rewrite any text in place.

> **Every job supervised. Every job guaranteed.**

---

## The deck

| # | Slide | Purpose |
|---|---|---|
| 01 | Cover | Brand, tagline, ask |
| 02 | The Problem | Marketplace take rates punish pros |
| 03 | The Insight | Supervised crews > gig workers |
| 04 | The Solution | What a SuperJack is |
| 05 | How It Works | 3-step flow + scraper |
| 06 | Business Model | Zero commission as a brand principle |
| 07 | Revenue | 5 streams, tiered subscriptions |
| 08 | Market | TAM / SAM / SOM |
| 09 | Roadmap | Phase 1 → 4 |
| 10 | Tech & Moat | Market Planner + Scraper |
| 11 | The Ask | $1.5M seed, use of funds |
| 12 | Close | Founder + contact |

---

## Editing the copy

There are **two ways** to edit text in the deck. Pick whichever fits the moment.

### A) In-browser editor (fastest)

1. Open the deck (`npm run dev`, or the deployed URL)
2. Click the **Edit** pill in the top-right corner (or press `⌘E` / `Ctrl-E`)
3. Every editable string gets an orange dashed outline. Click any one and
   type. Press **Enter** to save, **Esc** to cancel.
4. Changes auto-save to your browser's localStorage as you type — refresh
   the page and they're still there.
5. When you're happy, click **Export** to download a JSON file of all your
   copy. Or hit **Copy JSON** to paste it somewhere.
6. Click **Edit** again to exit edit mode and present the deck cleanly.

> Tip: localStorage is per-browser. If you edit in Chrome and then open the
> deck in Safari, you'll see the original copy until you Import the JSON.

#### Editor toolbar buttons

| Button | What it does |
|---|---|
| **Edit / Editing** | Toggle edit mode |
| **Copy JSON** | Copies all current copy to clipboard |
| **Export** | Downloads a JSON snapshot of all copy |
| **Import** | Loads a previously-exported JSON file |
| **Reset** | Wipes localStorage and reloads the original copy |

#### Making your edits permanent

The browser editor is great for iteration, but for the production deck
(and for the GitHub repo) you'll eventually want to bake your changes into
the source. Two options:

- **Quick:** Export the JSON and keep it alongside the repo. Anyone who
  visits the deck can Import it to see your version.
- **Permanent:** Export the JSON and paste its values into
  [`src/content.js`](./src/content.js) so the new copy ships as the default.
  Then commit & push.

### B) Edit `src/content.js` directly

Every editable string in the deck lives in [`src/content.js`](./src/content.js),
organized by slide. Open it, edit any string, save — Vite hot-reloads the deck.

---

## Run locally

```bash
npm install
npm run dev
```

Then visit `http://localhost:5173`.

### Presentation controls
- `→` / `Space` / `PgDn` — next slide
- `←` / `PgUp` — previous slide
- `Home` / `End` — first / last
- `⌘E` / `Ctrl-E` — toggle edit mode
- Right-side dots — jump to any slide

> Arrow keys are disabled while you're typing in an edit field, so you
> can press them inside text without changing slides.

### Export to PDF
1. Open the deck in Chrome
2. Make sure you're **not** in Edit mode (so the orange outlines don't show)
3. Cmd/Ctrl-P
4. Destination: **Save as PDF**
5. Layout: **Landscape**
6. More settings → Paper size: **Custom (1280 × 720)** if available, otherwise A4 Landscape
7. Background graphics: **on**

The print stylesheet stacks all 12 slides and hides the editor toolbar
and nav controls.

---

## Deploy to GitHub Pages

### One-time setup

1. Create a new repo on GitHub (e.g. `superjack-deck`).
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — SuperJack seed deck"
   git branch -M main
   git remote add origin https://github.com/<you>/superjack-deck.git
   git push -u origin main
   ```
3. In your GitHub repo → **Settings → Pages** → Source: **GitHub Actions**.

The included workflow at `.github/workflows/deploy.yml` will auto-build and
deploy on every push to `main`. Live URL:

```
https://<your-username>.github.io/superjack-deck/
```

### Or deploy manually

```bash
npm run deploy
```

### Custom domain (optional)

For e.g. `deck.superjacknetwork.com`:
1. Add a `CNAME` file in `public/` containing `deck.superjacknetwork.com`
2. Point your DNS at GitHub Pages
3. Set the custom domain in **Settings → Pages**

---

## File map

```
.
├── Deck.jsx                  # The 12 slides — layout/visuals only
├── src/
│   ├── content.js            # ⭐ All editable copy lives here
│   ├── Editor.jsx            # ContentProvider, <Editable>, toolbar
│   ├── main.jsx              # React entry point
│   └── index.css             # Tailwind + print styles
├── index.html                # Loads Google Fonts
├── public/favicon.svg        # Hammer mark
├── tailwind.config.js
├── vite.config.js            # base: "./" for GitHub Pages
└── .github/workflows/        # Auto-deploy on push to main
```

If you need to **change layout, colors, or icons**, edit `Deck.jsx`.
If you need to **change wording, numbers, or stat blocks**, edit
`src/content.js` (or use the in-browser editor).

### Brand tokens (top of `Deck.jsx`)

```js
const ORANGE   = "#F57C00";
const CHARCOAL = "#171717";
const CREAM    = "#F5F1EA";
```

### Add a slide

1. Build a new `SlideX` component in `Deck.jsx` using
   `<SlideShell index={...} total={...} kickerId="newSlide.kicker">`
2. Add a new section to `src/content.js`
3. Add the component to the `SLIDES` array near the bottom of `Deck.jsx`

---

## Stack

- **Vite** — fast dev + production build
- **React 18** — component model
- **Tailwind CSS** — utility classes
- **lucide-react** — icons
- **Google Fonts** — Bebas Neue, Fraunces, JetBrains Mono

No analytics. No tracking. No external CMS. The deck is yours.

---

## License

Private. Investor confidential. © 2026 SuperJack Network.
