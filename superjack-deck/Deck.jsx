import React, { useState, useEffect, useCallback } from "react";
import {
  ShieldCheck,
  Wrench,
  DollarSign,
  Zap,
  ArrowRight,
  ArrowLeft,
  Brain,
  Map as MapIcon,
  CheckCircle2,
} from "lucide-react";
import {
  ContentProvider,
  Editable,
  EditorToolbar,
  EditModeHint,
  useContent,
} from "./src/Editor.jsx";

/**
 * SuperJack — Seed Investor Deck
 *
 * All copy comes from ./src/content.js via <Editable id="...">.
 * Toggle edit mode (top-right pill or ⌘E) to click-edit any text.
 */

const ORANGE = "#F57C00";
const CHARCOAL = "#171717";
const CREAM = "#F5F1EA";

// ---------- Reusable bits ----------

const SlideShell = ({ children, index, total, kickerId }) => {
  const brandName = useContent("brand.name");
  const round = useContent("brand.roundLabel");
  const tagline = useContent("brand.tagline");
  const domain = useContent("brand.domain");

  return (
    <div
      className="relative w-full min-h-screen flex flex-col"
      style={{ backgroundColor: CREAM, color: CHARCOAL }}
    >
      {/* Top rail */}
      <div className="flex items-center justify-between px-8 md:px-16 pt-6 md:pt-8 text-[11px] tracking-[0.25em] uppercase font-mono">
        <div className="flex items-center gap-3">
          <span
            className="inline-block w-2.5 h-2.5"
            style={{ backgroundColor: ORANGE }}
          />
          <span className="font-semibold">{brandName}</span>
          <span className="opacity-40">/</span>
          <span className="opacity-70">{round}</span>
        </div>
        <div className="opacity-60">
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      {/* Section kicker */}
      {kickerId && (
        <div className="px-8 md:px-16 mt-10 md:mt-14">
          <div
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase font-mono pb-2 border-b"
            style={{ borderColor: CHARCOAL }}
          >
            <span style={{ color: ORANGE }}>§ {String(index).padStart(2, "0")}</span>
            <Editable id={kickerId} />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="flex-1 px-8 md:px-16 py-10 md:py-12">{children}</div>

      {/* Bottom rail */}
      <div
        className="px-8 md:px-16 py-4 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase font-mono border-t"
        style={{ borderColor: "rgba(23,23,23,0.15)" }}
      >
        <span className="opacity-60">{tagline}</span>
        <span className="opacity-60">{domain}</span>
      </div>
    </div>
  );
};

const Display = ({ children, className = "", style = {} }) => (
  <h1
    className={`font-display leading-[0.9] tracking-tight ${className}`}
    style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif', ...style }}
  >
    {children}
  </h1>
);

const Serif = ({ children, className = "", style = {} }) => (
  <span
    className={`italic ${className}`}
    style={{ fontFamily: '"Fraunces", Georgia, serif', ...style }}
  >
    {children}
  </span>
);

// ---------- SLIDE 01 — COVER ----------

const SlideCover = (p) => {
  const stats = useContent("cover.stats") || [];
  return (
    <SlideShell {...p}>
      <div className="grid md:grid-cols-12 gap-8 h-full items-center mt-6">
        <div className="md:col-span-8">
          <div
            className="text-[11px] tracking-[0.3em] uppercase font-mono mb-6 inline-block px-2 py-1"
            style={{ backgroundColor: CHARCOAL, color: CREAM }}
          >
            <Editable id="cover.pill" />
          </div>

          <Display className="text-[clamp(72px,14vw,200px)]" style={{ color: CHARCOAL }}>
            <Editable id="cover.titleLeft" />
            <span style={{ color: ORANGE }}>
              <Editable id="cover.titleRight" />
            </span>
          </Display>

          <div
            className="mt-2 text-[clamp(20px,2.4vw,32px)] font-light leading-tight max-w-2xl"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            <Editable id="cover.subtitle" />{" "}
            <span className="italic" style={{ color: ORANGE }}>
              <Editable id="cover.subtitleAccent" />
            </span>
            <Editable id="cover.subtitleEnd" />
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl">
            {stats.map((s, i) => (
              <Stat
                key={s.id}
                labelId={`cover.stats.${i}.label`}
                valueId={`cover.stats.${i}.value`}
              />
            ))}
          </div>
        </div>

        <div className="md:col-span-4 hidden md:flex flex-col items-end gap-6">
          <ToolMark stampId="cover.markStamp" />
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-[0.3em] font-mono opacity-60">
              <Editable id="brand.confidential" />
            </div>
            <div className="text-[11px] uppercase tracking-[0.3em] font-mono opacity-60 mt-1">
              <Editable id="brand.confidentialSub" />
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

const Stat = ({ labelId, valueId }) => (
  <div className="border-t pt-3" style={{ borderColor: CHARCOAL }}>
    <div className="text-[10px] tracking-[0.3em] uppercase font-mono opacity-70">
      <Editable id={labelId} />
    </div>
    <div
      className="text-3xl font-display mt-1"
      style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif' }}
    >
      <Editable id={valueId} />
    </div>
  </div>
);

const ToolMark = ({ stampId }) => {
  const stamp = useContent(stampId);
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" className="opacity-90">
      <circle cx="90" cy="90" r="86" fill="none" stroke={CHARCOAL} strokeWidth="2" />
      <circle
        cx="90"
        cy="90"
        r="68"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth="1"
        strokeDasharray="2,4"
      />
      <g transform="translate(90 90) rotate(-30)">
        <rect x="-30" y="-8" width="60" height="16" fill={CHARCOAL} />
        <rect x="-2" y="-2" width="40" height="4" fill={ORANGE} />
        <rect x="-44" y="-3" width="14" height="6" fill={CHARCOAL} />
      </g>
      <text
        x="90"
        y="160"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="8"
        letterSpacing="3"
        fill={CHARCOAL}
      >
        {stamp}
      </text>
    </svg>
  );
};

// ---------- SLIDE 02 — THE PROBLEM ----------

const SlideProblem = (p) => {
  const pains = useContent("problem.pains") || [];
  return (
    <SlideShell {...p} kickerId="problem.kicker">
      <div className="grid md:grid-cols-12 gap-10 mt-6">
        <div className="md:col-span-7">
          <Display className="text-[clamp(48px,7vw,100px)]">
            <Editable id="problem.titleA" />{" "}
            <span style={{ color: ORANGE }}>
              <Editable id="problem.titleB" />
            </span>
            <br />
            <Editable id="problem.titleC" />
          </Display>
          <p
            className="mt-8 max-w-xl text-lg leading-relaxed"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            <Editable id="problem.body" multiline />
          </p>
        </div>

        <div className="md:col-span-5 space-y-3">
          {pains.map((pn, i) => (
            <PainCard
              key={pn.id}
              statId={`problem.pains.${i}.stat`}
              labelId={`problem.pains.${i}.label`}
              bodyId={`problem.pains.${i}.body`}
            />
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

const PainCard = ({ statId, labelId, bodyId }) => (
  <div
    className="p-5 border-l-4"
    style={{ backgroundColor: CHARCOAL, color: CREAM, borderColor: ORANGE }}
  >
    <div className="flex items-baseline gap-3">
      <div
        className="text-4xl font-display"
        style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif', color: ORANGE }}
      >
        <Editable id={statId} />
      </div>
      <div className="text-[11px] uppercase tracking-[0.25em] font-mono opacity-70">
        <Editable id={labelId} />
      </div>
    </div>
    <div className="text-sm mt-2 leading-snug">
      <Editable id={bodyId} />
    </div>
  </div>
);

// ---------- SLIDE 03 — THE INSIGHT ----------

const SlideInsight = (p) => {
  const rows = useContent("insight.table") || [];
  return (
    <SlideShell {...p} kickerId="insight.kicker">
      <div className="grid md:grid-cols-12 gap-10 mt-6 items-center">
        <div className="md:col-span-6">
          <div className="text-[10px] tracking-[0.3em] uppercase font-mono mb-6 opacity-60">
            <Editable id="insight.eyebrow" />
          </div>
          <Display className="text-[clamp(44px,6vw,84px)]">
            <Editable id="insight.titleA" />
            <span style={{ color: ORANGE }}>
              {" "}
              <Editable id="insight.titleB" />{" "}
            </span>
            <Editable id="insight.titleC" />
          </Display>
        </div>

        <div className="md:col-span-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ borderBottom: `2px solid ${CHARCOAL}` }}>
                <th className="text-left py-3 font-mono uppercase tracking-[0.2em] text-[10px]">
                  Dimension
                </th>
                <th className="text-left py-3 font-mono uppercase tracking-[0.2em] text-[10px]">
                  Gig worker
                </th>
                <th
                  className="text-left py-3 font-mono uppercase tracking-[0.2em] text-[10px]"
                  style={{ color: ORANGE }}
                >
                  SuperJack
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: "1px solid rgba(23,23,23,0.15)" }}>
                  <td className="py-3 font-medium">
                    <Editable id={`insight.table.${i}.a`} />
                  </td>
                  <td className="py-3 opacity-60">
                    <Editable id={`insight.table.${i}.b`} />
                  </td>
                  <td className="py-3 font-semibold" style={{ color: ORANGE }}>
                    <Editable id={`insight.table.${i}.c`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <blockquote
            className="mt-8 pl-5 border-l-2 italic text-lg leading-snug"
            style={{ fontFamily: '"Fraunces", Georgia, serif', borderColor: ORANGE }}
          >
            <Editable id="insight.quote" multiline />
          </blockquote>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------- SLIDE 04 — THE SOLUTION ----------

const SlideSolution = (p) => {
  const pillars = useContent("solution.pillars") || [];
  const icons = {
    vetted: <ShieldCheck className="w-5 h-5" />,
    supervised: <Wrench className="w-5 h-5" />,
    subscribed: <DollarSign className="w-5 h-5" />,
  };
  return (
    <SlideShell {...p} kickerId="solution.kicker">
      <div className="mt-4">
        <Display className="text-[clamp(56px,9vw,140px)]">
          <Editable id="solution.titleA" />
          <br />
          <span style={{ color: ORANGE }}>
            <Editable id="solution.titleB" />
          </span>
        </Display>

        <p
          className="mt-6 max-w-3xl text-xl leading-snug"
          style={{ fontFamily: '"Fraunces", Georgia, serif' }}
        >
          <Editable id="solution.body" multiline />
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {pillars.map((pl, i) => (
            <Pillar
              key={pl.id}
              icon={icons[pl.id] || <ShieldCheck className="w-5 h-5" />}
              titleId={`solution.pillars.${i}.title`}
              bodyId={`solution.pillars.${i}.body`}
            />
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

const Pillar = ({ icon, titleId, bodyId }) => (
  <div
    className="p-6 border-t-2"
    style={{ borderColor: ORANGE, backgroundColor: "rgba(23,23,23,0.04)" }}
  >
    <div
      className="w-9 h-9 flex items-center justify-center mb-4"
      style={{ backgroundColor: CHARCOAL, color: ORANGE }}
    >
      {icon}
    </div>
    <div
      className="text-2xl font-display tracking-wide"
      style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif' }}
    >
      <Editable id={titleId} />
    </div>
    <div className="mt-2 text-sm leading-relaxed opacity-80">
      <Editable id={bodyId} multiline />
    </div>
  </div>
);

// ---------- SLIDE 05 — HOW IT WORKS ----------

const SlideHow = (p) => {
  const steps = useContent("how.steps") || [];
  return (
    <SlideShell {...p} kickerId="how.kicker">
      <div className="mt-6">
        <Display className="text-[clamp(40px,5.5vw,76px)]">
          <Editable id="how.titleA" />{" "}
          <Serif style={{ color: ORANGE }}>
            <Editable id="how.titleB" />
          </Serif>
        </Display>

        <div
          className="grid md:grid-cols-3 gap-0 mt-12 border-t border-b"
          style={{ borderColor: CHARCOAL }}
        >
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`p-6 ${i < steps.length - 1 ? "md:border-r" : ""}`}
              style={{ borderColor: "rgba(23,23,23,0.2)" }}
            >
              <div
                className="text-6xl font-display"
                style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif', color: ORANGE }}
              >
                <Editable id={`how.steps.${i}.n`} />
              </div>
              <div className="text-xl font-semibold mt-2">
                <Editable id={`how.steps.${i}.t`} />
              </div>
              <div className="mt-3 text-sm leading-relaxed opacity-80 max-w-xs">
                <Editable id={`how.steps.${i}.b`} multiline />
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 p-5 flex items-center gap-4 max-w-3xl"
          style={{ backgroundColor: CHARCOAL, color: CREAM }}
        >
          <Zap className="w-5 h-5 flex-shrink-0" style={{ color: ORANGE }} />
          <div className="text-sm leading-snug">
            <span className="font-semibold">
              <Editable id="how.calloutLead" />
            </span>{" "}
            <Editable id="how.callout" multiline />
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------- SLIDE 06 — BUSINESS MODEL ----------

const SlideModel = (p) => {
  const bullets = useContent("model.bullets") || [];
  const competitors = useContent("model.competitors.rows") || [];
  return (
    <SlideShell {...p} kickerId="model.kicker">
      <div className="grid md:grid-cols-12 gap-10 mt-6">
        <div className="md:col-span-7">
          <Display className="text-[clamp(48px,7vw,100px)]">
            <Editable id="model.titleA" />
            <br />
            <span style={{ color: ORANGE }}>
              <Editable id="model.titleB" />
            </span>
            <br />
            <Editable id="model.titleC" />
          </Display>
          <p
            className="mt-6 text-lg leading-relaxed max-w-xl"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            <Editable id="model.body" multiline />
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {bullets.map((b, i) => (
              <li key={b.id} className="flex items-start gap-3">
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: ORANGE }}
                />
                <Editable id={`model.bullets.${i}.t`} />
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <div className="p-6" style={{ backgroundColor: CHARCOAL, color: CREAM }}>
            <div className="text-[11px] uppercase tracking-[0.3em] font-mono opacity-70 mb-3">
              <Editable id="model.competitors.title" />
            </div>
            {competitors.map((c, i) => (
              <div key={c.id} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>
                    <Editable id={`model.competitors.rows.${i}.name`} />
                  </span>
                  <span className="opacity-70">{c.rate}%</span>
                </div>
                <div className="h-1.5 bg-white/10">
                  <div
                    className="h-full"
                    style={{ width: `${c.rate * 2.5}%`, backgroundColor: "#ff8c1a" }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold" style={{ color: ORANGE }}>
                  <Editable id="model.competitors.ourLabel" />
                </span>
                <span className="font-bold" style={{ color: ORANGE }}>
                  <Editable id="model.competitors.ourRate" />
                </span>
              </div>
              <div className="h-1.5 bg-white/10">
                <div className="h-full" style={{ width: "0%", backgroundColor: ORANGE }} />
              </div>
              <div className="text-[11px] opacity-60 mt-2 italic">
                <Editable id="model.competitors.ourNote" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------- SLIDE 07 — REVENUE ----------

const SlideRevenue = (p) => {
  const tiers = useContent("revenue.tiers") || [];
  const streams = useContent("revenue.streams") || [];
  return (
    <SlideShell {...p} kickerId="revenue.kicker">
      <div className="mt-6">
        <Display className="text-[clamp(40px,5.5vw,72px)]">
          <Editable id="revenue.titleA" />{" "}
          <Serif style={{ color: ORANGE }}>
            <Editable id="revenue.titleB" />
          </Serif>
        </Display>

        <div className="grid md:grid-cols-12 gap-6 mt-10">
          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            {tiers.map((t, i) => (
              <Tier
                key={t.id}
                i={i}
                highlight={t.highlight}
                muted={t.muted}
              />
            ))}
          </div>

          <div className="md:col-span-5 space-y-4">
            {streams.map((s, i) => (
              <RevRow key={s.id} i={i} weight={s.weight} />
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

const Tier = ({ i, highlight, muted }) => (
  <div
    className="p-5 border"
    style={{
      backgroundColor: highlight ? CHARCOAL : "transparent",
      color: highlight ? CREAM : CHARCOAL,
      borderColor: highlight ? CHARCOAL : "rgba(23,23,23,0.25)",
      opacity: muted ? 0.55 : 1,
    }}
  >
    <div className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-70">
      <Editable id={`revenue.tiers.${i}.name`} />
    </div>
    <div
      className="text-4xl font-display mt-1"
      style={{
        fontFamily: '"Bebas Neue", "Oswald", sans-serif',
        color: highlight ? ORANGE : CHARCOAL,
      }}
    >
      <Editable id={`revenue.tiers.${i}.price`} />
    </div>
    <div className="text-xs mt-2 opacity-80">
      <Editable id={`revenue.tiers.${i}.zips`} /> &middot;{" "}
      <Editable id={`revenue.tiers.${i}.jobs`} />
    </div>
  </div>
);

const RevRow = ({ i, weight }) => (
  <div>
    <div className="flex justify-between items-baseline">
      <div className="font-semibold text-sm">
        <Editable id={`revenue.streams.${i}.label`} />
      </div>
      <div className="text-[11px] font-mono opacity-60">~{weight}%</div>
    </div>
    <div className="h-[3px] bg-black/10 mt-1.5">
      <div className="h-full" style={{ width: `${weight}%`, backgroundColor: ORANGE }} />
    </div>
    <div className="text-xs mt-1.5 opacity-70 italic">
      <Editable id={`revenue.streams.${i}.note`} />
    </div>
  </div>
);

// ---------- SLIDE 08 — MARKET ----------

const SlideMarket = (p) => {
  const rows = useContent("market.rows") || [];
  const factoids = useContent("market.factoids") || [];
  return (
    <SlideShell {...p} kickerId="market.kicker">
      <div className="grid md:grid-cols-12 gap-10 mt-6">
        <div className="md:col-span-7">
          <Display className="text-[clamp(56px,8vw,120px)]">
            <Editable id="market.titleA" />
            <br />
            <span style={{ color: ORANGE }}>
              <Editable id="market.titleB" />
            </span>
          </Display>
          <p
            className="mt-6 text-lg leading-relaxed max-w-xl"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            <Editable id="market.body" multiline />
          </p>
        </div>

        <div className="md:col-span-5 space-y-4">
          {rows.map((r, i) => (
            <MarketRow key={r.id} i={i} pct={r.pct} />
          ))}
        </div>
      </div>

      <div
        className="mt-12 p-5 grid grid-cols-2 md:grid-cols-4 gap-6 border-t"
        style={{ borderColor: CHARCOAL }}
      >
        {factoids.map((f, i) => (
          <div key={f.id}>
            <div
              className="text-5xl font-display"
              style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif', color: ORANGE }}
            >
              <Editable id={`market.factoids.${i}.n`} />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] font-mono opacity-70 mt-1">
              <Editable id={`market.factoids.${i}.l`} />
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
};

const MarketRow = ({ i, pct }) => (
  <div className="border-t pt-3" style={{ borderColor: CHARCOAL }}>
    <div className="flex items-baseline justify-between">
      <div className="text-[11px] uppercase tracking-[0.3em] font-mono opacity-70">
        <Editable id={`market.rows.${i}.label`} />
      </div>
      <div
        className="text-4xl font-display"
        style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif' }}
      >
        <Editable id={`market.rows.${i}.value`} />
      </div>
    </div>
    <div className="h-1 bg-black/10 mt-2">
      <div className="h-full" style={{ width: `${pct}%`, backgroundColor: ORANGE }} />
    </div>
    <div className="text-xs mt-1.5 opacity-60">
      <Editable id={`market.rows.${i}.sub`} />
    </div>
  </div>
);

// ---------- SLIDE 09 — ROADMAP ----------

const SlideRoadmap = (p) => {
  const phases = useContent("roadmap.phases") || [];
  const builds = useContent("roadmap.builds") || [];
  return (
    <SlideShell {...p} kickerId="roadmap.kicker">
      <div className="mt-6">
        <Display className="text-[clamp(40px,5.5vw,72px)]">
          <Editable id="roadmap.titleA" />{" "}
          <Serif style={{ color: ORANGE }}>
            <Editable id="roadmap.titleB" />
          </Serif>
        </Display>

        <div className="mt-12 relative">
          <div
            className="absolute left-0 right-0 top-[34px] h-[2px]"
            style={{ backgroundColor: CHARCOAL }}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {phases.map((s, i) => (
              <div key={s.id} className="relative">
                <div className="flex items-center justify-center">
                  <div
                    className="w-[18px] h-[18px] rounded-full relative z-10"
                    style={{
                      backgroundColor: i === 0 ? ORANGE : CHARCOAL,
                      boxShadow: `0 0 0 4px ${CREAM}`,
                    }}
                  />
                </div>
                <div className="text-center mt-4">
                  <div
                    className="text-[10px] uppercase tracking-[0.3em] font-mono"
                    style={{
                      color: i === 0 ? ORANGE : CHARCOAL,
                      opacity: i === 0 ? 1 : 0.6,
                    }}
                  >
                    <Editable id={`roadmap.phases.${i}.p`} /> &middot;{" "}
                    <Editable id={`roadmap.phases.${i}.when`} />
                  </div>
                  <div
                    className="text-3xl font-display mt-1"
                    style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif' }}
                  >
                    <Editable id={`roadmap.phases.${i}.t`} />
                  </div>
                  <div className="text-sm font-semibold mt-2">
                    <Editable id={`roadmap.phases.${i}.g`} />
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    <Editable id={`roadmap.phases.${i}.c`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {builds.map((b, i) => (
            <BuildCard key={b.id} i={i} />
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

const BuildCard = ({ i }) => (
  <div className="border p-5" style={{ borderColor: "rgba(23,23,23,0.25)" }}>
    <div className="flex items-baseline justify-between">
      <div className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-70">
        <Editable id={`roadmap.builds.${i}.label`} />
      </div>
      <div
        className="text-3xl font-display"
        style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif', color: ORANGE }}
      >
        <Editable id={`roadmap.builds.${i}.pct`} />
      </div>
    </div>
    <div className="text-sm mt-3 leading-relaxed opacity-80">
      <Editable id={`roadmap.builds.${i}.body`} multiline />
    </div>
  </div>
);

// ---------- SLIDE 10 — TECH MOAT ----------

const SlideMoat = (p) => {
  const cards = useContent("moat.cards") || [];
  const stack = useContent("moat.stack") || [];
  const cardIcons = [
    <Brain className="w-5 h-5" key="brain" />,
    <MapIcon className="w-5 h-5" key="map" />,
  ];
  return (
    <SlideShell {...p} kickerId="moat.kicker">
      <div className="mt-6">
        <Display className="text-[clamp(44px,6vw,84px)]">
          <Editable id="moat.titleA" />
          <br />
          <Editable id="moat.titleB" />
          <br />
          <Editable id="moat.titleC" />
        </Display>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {cards.map((c, i) => (
            <MoatCard key={c.id} i={i} icon={cardIcons[i] || cardIcons[0]} chips={c.chips || []} />
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-4 gap-4">
          {stack.map((s, i) => (
            <div key={s.id} className="text-sm">
              <div
                className="text-2xl font-display"
                style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif' }}
              >
                <Editable id={`moat.stack.${i}.n`} />
              </div>
              <div className="opacity-60 text-xs mt-1">
                <Editable id={`moat.stack.${i}.d`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

const MoatCard = ({ i, icon, chips }) => (
  <div
    className="p-6 border-l-4"
    style={{ backgroundColor: CHARCOAL, color: CREAM, borderColor: ORANGE }}
  >
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 flex items-center justify-center"
        style={{ backgroundColor: ORANGE, color: CHARCOAL }}
      >
        {icon}
      </div>
      <div className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-70">
        <Editable id={`moat.cards.${i}.tag`} />
      </div>
    </div>
    <div
      className="text-3xl font-display mt-4"
      style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif' }}
    >
      <Editable id={`moat.cards.${i}.title`} />
    </div>
    <div className="text-sm mt-3 leading-relaxed opacity-90">
      <Editable id={`moat.cards.${i}.body`} multiline />
    </div>
    <div className="flex flex-wrap gap-2 mt-5">
      {chips.map((c, j) => (
        <span
          key={j}
          className="text-[10px] uppercase tracking-[0.2em] font-mono px-2 py-1"
          style={{ backgroundColor: "rgba(245,124,0,0.15)", color: ORANGE }}
        >
          <Editable id={`moat.cards.${i}.chips.${j}`} />
        </span>
      ))}
    </div>
  </div>
);

// ---------- SLIDE 11 — THE ASK ----------

const SlideAsk = (p) => {
  const uses = useContent("ask.uses") || [];
  const milestones = useContent("ask.milestones") || [];
  return (
    <SlideShell {...p} kickerId="ask.kicker">
      <div className="grid md:grid-cols-12 gap-10 mt-6">
        <div className="md:col-span-7">
          <div className="text-[10px] tracking-[0.3em] uppercase font-mono mb-4 opacity-60">
            <Editable id="ask.raisingLabel" />
          </div>
          <Display className="text-[clamp(80px,15vw,220px)]" style={{ color: ORANGE }}>
            <Editable id="ask.amount" />
          </Display>
          <div className="text-2xl mt-2" style={{ fontFamily: '"Fraunces", Georgia, serif' }}>
            <Editable id="ask.terms" />
          </div>
          <p className="mt-6 text-base leading-relaxed max-w-lg opacity-80">
            <Editable id="ask.body" multiline />
          </p>
        </div>

        <div className="md:col-span-5">
          <div className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-60 mb-4">
            <Editable id="ask.useLabel" />
          </div>
          {uses.map((u, i) => (
            <UseRow key={u.id} i={i} pct={u.pct} />
          ))}
        </div>
      </div>

      <div
        className="mt-12 p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
        style={{ backgroundColor: CHARCOAL, color: CREAM }}
      >
        {milestones.map((m, i) => (
          <div key={m.id}>
            <div
              className="text-5xl font-display"
              style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif', color: ORANGE }}
            >
              <Editable id={`ask.milestones.${i}.n`} />
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-70 mt-1">
              <Editable id={`ask.milestones.${i}.l`} />
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
};

const UseRow = ({ i, pct }) => (
  <div className="mb-4">
    <div className="flex items-baseline justify-between">
      <div className="font-semibold text-sm">
        <Editable id={`ask.uses.${i}.label`} />
      </div>
      <div
        className="text-2xl font-display"
        style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif' }}
      >
        {pct}%
      </div>
    </div>
    <div className="h-[3px] bg-black/15 mt-1">
      <div className="h-full" style={{ width: `${pct}%`, backgroundColor: ORANGE }} />
    </div>
    <div className="text-xs opacity-70 mt-1 italic">
      <Editable id={`ask.uses.${i}.note`} />
    </div>
  </div>
);

// ---------- SLIDE 12 — CLOSE ----------

const SlideClose = (p) => {
  const contacts = useContent("close.contacts") || [];
  return (
    <SlideShell {...p} kickerId="close.kicker">
      <div className="grid md:grid-cols-12 gap-10 h-full mt-6 items-center">
        <div className="md:col-span-7">
          <Display className="text-[clamp(60px,10vw,160px)]">
            <Editable id="close.titleA" />
            <br />
            <span style={{ color: ORANGE }}>
              <Editable id="close.titleB" />
            </span>
            <br />
            <Editable id="close.titleC" />
            <br />
            <span style={{ color: ORANGE }}>
              <Editable id="close.titleD" />
            </span>
          </Display>
          <p
            className="mt-8 text-xl leading-snug max-w-xl"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            <Editable id="close.body" multiline />
          </p>
        </div>

        <div className="md:col-span-5">
          <div className="p-6 border-2" style={{ borderColor: CHARCOAL }}>
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-60">
              <Editable id="close.founderLabel" />
            </div>
            <div
              className="text-4xl font-display mt-1"
              style={{ fontFamily: '"Bebas Neue", "Oswald", sans-serif' }}
            >
              <Editable id="close.founderName" />
            </div>
            <div className="text-sm mt-2 opacity-80 leading-relaxed">
              <Editable id="close.founderBio" multiline />
            </div>

            <div className="mt-6 pt-6 border-t" style={{ borderColor: "rgba(23,23,23,0.2)" }}>
              <div className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-60 mb-3">
                <Editable id="close.contactLabel" />
              </div>
              <div className="text-sm space-y-1">
                {contacts.map((c, i) => (
                  <div key={c.id}>
                    <span className="opacity-60">
                      <Editable id={`close.contacts.${i}.k`} /> /
                    </span>{" "}
                    <Editable id={`close.contacts.${i}.v`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-6 text-center p-4"
            style={{ backgroundColor: ORANGE, color: CHARCOAL }}
          >
            <div className="text-[11px] uppercase tracking-[0.3em] font-mono">
              <Editable id="close.cta" />
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------- DECK CONTAINER ----------

const SLIDES = [
  SlideCover,
  SlideProblem,
  SlideInsight,
  SlideSolution,
  SlideHow,
  SlideModel,
  SlideRevenue,
  SlideMarket,
  SlideRoadmap,
  SlideMoat,
  SlideAsk,
  SlideClose,
];

function DeckInner() {
  const [i, setI] = useState(0);
  const total = SLIDES.length;

  const next = useCallback(() => setI((p) => Math.min(p + 1, total - 1)), [total]);
  const prev = useCallback(() => setI((p) => Math.max(p - 1, 0)), []);

  useEffect(() => {
    const onKey = (e) => {
      // Don't hijack arrow keys when the user is editing a text field.
      const tag = e.target?.tagName;
      const editing =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        e.target?.isContentEditable;
      if (editing) return;

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") next();
      if (e.key === "ArrowLeft" || e.key === "PageUp") prev();
      if (e.key === "Home") setI(0);
      if (e.key === "End") setI(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, total]);

  const Current = SLIDES[i];

  return (
    <div className="relative" style={{ backgroundColor: CREAM }}>
      <EditorToolbar />
      <EditModeHint />

      {/* Print: render all slides stacked. Screen: render only current. */}
      <div className="print:hidden">
        <Current index={i + 1} total={total} />
      </div>
      <div className="hidden print:block">
        {SLIDES.map((S, idx) => (
          <div key={idx} className="print-slide">
            <S index={idx + 1} total={total} />
          </div>
        ))}
      </div>

      {/* Nav controls — screen only */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 print:hidden">
        <button
          onClick={prev}
          disabled={i === 0}
          aria-label="Previous slide"
          className="w-11 h-11 flex items-center justify-center transition disabled:opacity-30 hover:scale-105"
          style={{ backgroundColor: CHARCOAL, color: CREAM }}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div
          className="px-4 h-11 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em]"
          style={{ backgroundColor: CREAM, color: CHARCOAL, border: `1px solid ${CHARCOAL}` }}
        >
          <span>
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <div className="w-32 h-[2px] bg-black/15">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${((i + 1) / total) * 100}%`, backgroundColor: ORANGE }}
            />
          </div>
        </div>

        <button
          onClick={next}
          disabled={i === total - 1}
          aria-label="Next slide"
          className="w-11 h-11 flex items-center justify-center transition disabled:opacity-30 hover:scale-105"
          style={{ backgroundColor: ORANGE, color: CHARCOAL }}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Slide-jump dots */}
      <div className="fixed top-1/2 right-4 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 print:hidden">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: idx === i ? ORANGE : "rgba(23,23,23,0.25)",
              transform: idx === i ? "scale(1.6)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Deck() {
  return (
    <ContentProvider>
      <DeckInner />
    </ContentProvider>
  );
}
