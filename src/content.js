/**
 * SuperJack Deck — Content
 *
 * All editable copy lives here. Edit this file directly OR use the
 * in-browser editor (toggle "Edit" in the bottom-right) and export
 * the modified JSON back into this file when you're done.
 *
 * Schema:
 *   - Each slide is a top-level key
 *   - Each editable string has a unique path (e.g. "cover.title")
 *   - Arrays of items have stable keys for stat blocks, pillars, etc.
 *
 * The <Editable id="..."> component looks up its content here.
 */

export const defaultContent = {
  // Brand-wide
  brand: {
    name: "SuperJack",
    tagline: "Every job supervised. Every job guaranteed.",
    domain: "superjacknetwork.com",
    confidential: "Confidential",
    confidentialSub: "For prospective investors",
    roundLabel: "Seed Round 2026",
  },

  // ── 01 Cover ──
  cover: {
    pill: "Seed Round · $1.5M",
    titleLeft: "SUPER",
    titleRight: "JACK",
    subtitle: "The handyman dispatch network where",
    subtitleAccent: "every job is supervised",
    subtitleEnd: ".",
    stats: [
      { id: "ticket", label: "Avg ticket", value: "$350" },
      { id: "cats", label: "Cat. expansion", value: "25 svcs" },
      { id: "target", label: "Year-2 target", value: "$485K MRR" },
    ],
    markStamp: "EST. 2026 · PHX · AZ",
  },

  // ── 02 Problem ──
  problem: {
    kicker: "The Problem",
    titleA: "Every",
    titleB: "marketplace",
    titleC: "punishes the person doing the work.",
    body: "Thumbtack, Angi, TaskRabbit, HomeAdvisor — they take 8–30% of every job, force pros into bidding wars, and send unqualified labor to homeowners who get burned and stop trusting the platform.",
    pains: [
      {
        id: "p1",
        stat: "68%",
        label: "of homeowners",
        body: "say they can't find a handyman they trust.",
      },
      {
        id: "p2",
        stat: "$30B+",
        label: "U.S. handyman spend",
        body: "fragmented across 200K+ solo operators.",
      },
      {
        id: "p3",
        stat: "3.2★",
        label: "average competitor rating",
        body: "across the top 5 dispatch apps in 2025.",
      },
    ],
  },

  // ── 03 Insight ──
  insight: {
    kicker: "The Insight",
    eyebrow: "What we figured out",
    titleA: "A",
    titleB: "supervised crew",
    titleC: "beats a solo gig worker on every dimension that matters.",
    quote:
      "The SuperJack is the boss, not a gig worker. That changes everything — pricing, quality, retention, brand.",
    table: [
      { id: "t1", a: "Quality control", b: "None on-site", c: "Owner supervises" },
      { id: "t2", a: "Scaling capacity", b: "1 person", c: "Crew of 3–8" },
      { id: "t3", a: "Job completion", b: "Single trade", c: "Multi-trade" },
      { id: "t4", a: "Accountability", b: "Anonymous", c: "Brand-staked" },
      { id: "t5", a: "Pricing power", b: "Race to bottom", c: "Premium ticket" },
    ],
  },

  // ── 04 Solution ──
  solution: {
    kicker: "The Solution",
    titleA: "Meet the",
    titleB: "SuperJack.",
    body: "A vetted handyman business owner, GC, or building super who personally supervises every job. We dispatch jobs to them. They run the crew. The homeowner gets a guarantee. We never take a cut of their work.",
    pillars: [
      {
        id: "vetted",
        title: "Vetted",
        body: "License, insurance, portfolio, and reference checks before any job lands in their phone.",
      },
      {
        id: "supervised",
        title: "Supervised",
        body: "The SuperJack is on-site or on-call for every job. Their crew. Their reputation. Their money.",
      },
      {
        id: "subscribed",
        title: "Subscribed",
        body: "Pros pay flat monthly fees for job flow. Zero commission. Zero bidding. 100% of tips to them.",
      },
    ],
  },

  // ── 05 How It Works ──
  how: {
    kicker: "How It Works",
    titleA: "Three steps.",
    titleB: "Zero friction.",
    steps: [
      {
        id: "s1",
        n: "01",
        t: "Client posts a job",
        b: "Homeowner or PM posts the job. Free. Photos, zip, urgency, budget. 90-second flow.",
      },
      {
        id: "s2",
        n: "02",
        t: "Tiered dispatch",
        b: "Premium SuperJacks see it first. Pro tier next. Starter after 24h. The job gets grabbed by the right pro for the zip.",
      },
      {
        id: "s3",
        n: "03",
        t: "Supervised + reviewed",
        b: "SuperJack runs the job. Client confirms completion, rates 3 dimensions, optionally tips. SuperJack can respond.",
      },
    ],
    callout:
      "Recruitment scraper auto-finds and onboards new SuperJacks the moment a zip hits a job-density signal — supply expands as demand creates it.",
    calloutLead: "Recruitment scraper",
  },

  // ── 06 Business Model ──
  model: {
    kicker: "Business Model",
    titleA: "We never",
    titleB: "take a cut",
    titleC: "of the work.",
    body: "This is a brand principle, not a pricing decision. It's the single sharpest weapon against incumbents who siphon 8–30% off every job. It's why pros switch. It's why they stay.",
    bullets: [
      { id: "b1", t: "Flat-rate monthly subscriptions" },
      { id: "b2", t: "100% of tips to the SuperJack" },
      { id: "b3", t: "Optional payment processing as a perk, not a tax" },
      { id: "b4", t: "Pay-per-lead is a sample, not a strategy" },
    ],
    competitors: {
      title: "Competitor Take Rates",
      rows: [
        { id: "c1", name: "Angi", rate: 23 },
        { id: "c2", name: "Thumbtack", rate: 18 },
        { id: "c3", name: "TaskRabbit", rate: 30 },
        { id: "c4", name: "HomeAdvisor", rate: 15 },
      ],
      ourLabel: "SuperJack",
      ourRate: "0%",
      ourNote: "No commission. Ever. Period.",
    },
  },

  // ── 07 Revenue ──
  revenue: {
    kicker: "Revenue Streams",
    titleA: "Five streams.",
    titleB: "One flywheel.",
    tiers: [
      { id: "starter", name: "Starter", price: "$99.95", zips: "1 zip", jobs: "10 jobs/mo" },
      { id: "pro", name: "Pro", price: "$179", zips: "3 zips", jobs: "30 jobs/mo" },
      { id: "premium", name: "Premium", price: "$299.95", zips: "10 zips", jobs: "Unlimited", highlight: true },
      { id: "ppl", name: "Pay-per-lead", price: "$35", zips: "1 zip", jobs: "Per job", muted: true },
    ],
    streams: [
      { id: "subs", label: "Subscriptions", note: "Primary. 7-day trial. Annual = 2 months free.", weight: 70 },
      { id: "zips", label: "Zip code add-ons", note: "$15–$25/zip/mo. Tiered to drive upgrades.", weight: 12 },
      { id: "ppl", label: "Pay-per-lead", note: "$35/job. Vetted non-subs. Auto-nudge to subscribe.", weight: 8 },
      { id: "client", label: "Client upgrades", note: "Urgent dispatch $19.99 / Verified-only $29.99.", weight: 6 },
      { id: "pay", label: "SuperJack Pay", note: "Optional in-app processing. 0% on tips.", weight: 4 },
    ],
  },

  // ── 08 Market ──
  market: {
    kicker: "The Market",
    titleA: "$600B",
    titleB: "and rising.",
    body: "The U.S. home services market is projected to cross $600B by 2027. The handyman and small-job slice — our entry wedge — is $30B+ and growing as boomers age in place and millennials buy homes they don't know how to fix.",
    rows: [
      { id: "tam", label: "TAM", value: "$600B", sub: "U.S. home services", pct: 100 },
      { id: "sam", label: "SAM", value: "$30B", sub: "Handyman & small-job dispatch", pct: 50 },
      { id: "som", label: "SOM (Yr 5)", value: "$120M", sub: "8 metros, 5K subscribed pros", pct: 20 },
    ],
    factoids: [
      { id: "f1", n: "25", l: "service categories" },
      { id: "f2", n: "18", l: "home + 7 vehicle" },
      { id: "f3", n: "3.9M", l: "U.S. handyman businesses" },
      { id: "f4", n: "94%", l: "are 1–5 person shops" },
    ],
  },

  // ── 09 Roadmap ──
  roadmap: {
    kicker: "Traction & Roadmap",
    titleA: "From 1 metro to",
    titleB: "8.",
    phases: [
      { id: "p1", p: "P1", t: "Launch", when: "Mo 1–3", g: "50 pros, 100+ jobs", c: "Phoenix / Surprise" },
      { id: "p2", p: "P2", t: "Expand", when: "Mo 4–6", g: "175 pros · $28K MRR", c: "+ 5 categories, 2nd metro" },
      { id: "p3", p: "P3", t: "Deepen", when: "Mo 7–12", g: "700 pros · $147K MRR", c: "PM channel, 6 metros" },
      { id: "p4", p: "P4", t: "Scale", when: "Year 2", g: "1,850 pros · $485K MRR", c: "8 metros, annual push" },
    ],
    builds: [
      { id: "built", label: "Built", pct: "80%", body: "Frontend SPA, public flows, signup, review, profile, dashboard shell." },
      { id: "wip", label: "In progress", pct: "15%", body: "Pro dashboard sub-pages, GHL workflows, Stripe wiring, AI Market Planner." },
      { id: "next", label: "Next", pct: "5%", body: "Scraper deployment, SuperJack Pay (Stripe Connect), 2nd-metro expansion." },
    ],
  },

  // ── 10 Tech / Moat ──
  moat: {
    kicker: "Tech & Moat",
    titleA: "Two systems",
    titleB: "no competitor",
    titleC: "is building.",
    cards: [
      {
        id: "m1",
        tag: "01 / AI",
        title: "Market Planner",
        body: "Pros score themselves on 6 readiness criteria across 25 service categories. Claude returns a personalized expansion analysis: opportunity rankings, demand signals, 30/60/90 roadmap. Their answers feed back into our targeted client acquisition — pros tell us where to drum up demand.",
        chips: ["Claude API", "Supabase Edge", "Demand signals → GHL"],
      },
      {
        id: "m2",
        tag: "02 / Supply",
        title: "Recruitment Scraper",
        body: "When a zip hits a job-density signal with fewer than 5 active SuperJacks, our agent scrapes Thumbtack, Angi, and Google Maps for vetted candidates and pushes them through a Claude-Haiku-driven extraction pipeline into GHL outreach. Supply scales the moment demand calls for it.",
        chips: ["Python · Playwright", "Claude Haiku", "Auto-onboard pipeline"],
      },
    ],
    stack: [
      { id: "s1", n: "Lovable", d: "React SPA frontend" },
      { id: "s2", n: "Supabase", d: "Auth · DB · Edge Functions" },
      { id: "s3", n: "GoHighLevel", d: "Workflow & dispatch CRM" },
      { id: "s4", n: "Stripe", d: "Subscriptions · Connect" },
    ],
  },

  // ── 11 Ask ──
  ask: {
    kicker: "The Ask",
    raisingLabel: "Raising",
    amount: "$1.5M",
    terms: "18-month runway. Seed round. SAFE.",
    body: "To reach 700 subscribed SuperJacks across 6 metros, $147K MRR, and Series-A-ready unit economics — without ever taking a cut of the work.",
    useLabel: "Use of funds",
    uses: [
      { id: "u1", label: "Engineering & product", pct: 35, note: "Dashboard build-out · scraper · Market Planner" },
      { id: "u2", label: "Pro acquisition (paid + scraper)", pct: 30, note: "Scaling supply across 6 metros" },
      { id: "u3", label: "Client demand gen", pct: 20, note: "PM channel + homeowner brand" },
      { id: "u4", label: "Ops & vetting", pct: 10, note: "License/insurance verification at scale" },
      { id: "u5", label: "Reserve", pct: 5, note: "Optionality + bridge" },
    ],
    milestones: [
      { id: "m1", n: "18mo", l: "runway" },
      { id: "m2", n: "6", l: "metros by month 12" },
      { id: "m3", n: "700", l: "subscribed SuperJacks" },
      { id: "m4", n: "$1.7M", l: "annualized run rate at exit" },
    ],
  },

  // ── 12 Close ──
  close: {
    kicker: "Let's Build",
    titleA: "Every job",
    titleB: "supervised.",
    titleC: "Every job",
    titleD: "guaranteed.",
    body: "We're building the only handyman dispatch platform that treats the pro as the customer and the homeowner as the guest of honor. Both win. We win because they do.",
    founderLabel: "Founder",
    founderName: 'Doc — "Clev"',
    founderBio:
      "Solo builder, founder of FBX modular housing, deep background in SIP/modular construction, real estate, and licensed-provider dispatch (American National Notary). Lovable + Supabase + Python stack. Ships fast.",
    contactLabel: "Contact",
    contacts: [
      { id: "c1", k: "web", v: "superjacknetwork.com" },
      { id: "c2", k: "email", v: "invest@superjacknetwork.com" },
      { id: "c3", k: "deck", v: "superjack.deck/seed-2026" },
    ],
    cta: "Now booking diligence calls",
  },
};
