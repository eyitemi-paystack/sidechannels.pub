# Layout & Geometry Audit — Discrepancy Report
**Date:** 2026-04-09  
**Post:** Severity Inflation as a Signaling Failure  
**Auditor:** Claude Code (Playwright-verified)  
**Status:** Report only — no fixes applied. Awaiting approval.

---

## PASS 1: VERTICAL SYNCHRONIZATION (SIDENOTES)

**Verdict: CLEAN.** All 6 sidenotes pass.

| Check | Result |
|---|---|
| Anchor alignment (baseline diff) | All 6 at **0px** — pixel-perfect |
| Collision detection | Zero overlaps, 24px gap enforced in JS |
| Positioning method | `position: absolute; top: Npx` inside `position: relative` container |

Minor: Sidenote #6 (`p-ellis`: "Nine months later, it did.") is 19px tall — could read as UI artifact.

---

## PASS 2: GEOMETRY & VERTICAL RHYTHM

**The Measure:** 680px column, 67 chars/line at 16.8px. Within 65-85 target.

Base unit = **28.22px** (16.8px font x 1.68 line-height)

| ID | Element | Property | Actual | Base units | Should be |
|---|---|---|---|---|---|
| D1 | h2 | margin-top | 72px | 2.55x | **84px** (3x) |
| D2 | h2 | margin-bottom | 20px | 0.71x | **28px** (1x) |
| D3 | h3 | margin-top | 48px | 1.70x | **56px** (2x) |
| D4 | h3 | margin-bottom | 16px | 0.57x | **14px** (0.5x) |
| D5 | p | margin-bottom | 24px | 0.85x | **28px** (1x) |
| D6 | blockquote | margin-top | 40px | 1.42x | **42px** (1.5x) |
| D7 | blockquote | margin-bottom | 40px | 1.42x | **42px** (1.5x) |
| D8 | table | margin-top | 32px | 1.13x | **28px** (1x) or **42px** (1.5x) |
| D9 | table | margin-bottom | 32px | 1.13x | **28px** (1x) or **42px** (1.5x) |
| D10 | ul/ol | margin-bottom | 24px | 0.85x | **28px** (1x) |
| D11 | ul/ol | margin-top | 0px | 0x | (OK if intentional) |
| D12 | hr | margin-top/bottom | **0px** | 0x | **28px** (1x) min |
| D13 | li | margin-bottom | 8px | 0.28x | **14px** (0.5x) |

D14: Blockquote left edge flush with prose column (inset = 0px). Tufte convention is to hang border into gutter.

---

## PASS 3: INTERACTIVE & STICKY ELEMENTS

| ID | Issue | Severity |
|---|---|---|
| D15 | TOC only visible at >=1280px (Tailwind `xl:block`). 1200-1279px = no TOC. | Low |
| D16 | TOC sticky has no max-height or overflow-y. Would overflow if TOC grew. | Low |
| D17 | TOC sticky has no footer-stop. `top: 80px`, `bottom: auto`. | Low |
| D18 | IntersectionObserver dead zone is large (-20% 0px -60% 0px). TOC highlight can lag. | Minor |

---

## PASS 4: MOBILE DEGRADATION

| ID | Issue | Severity |
|---|---|---|
| **D19** | **CRITICAL: Grid blowout at <=1000px.** Prose = 1830px at 768px viewport. `1fr` = `minmax(auto, 1fr)`. Fix: `minmax(0, 1fr)`. | **Critical** |
| **D20** | **CRITICAL: Sidenote-inline invisible on mobile.** CSS cascade: base `display: none` overrides media query `display: block`. Sidenote content completely lost below 1000px. | **Critical** |
| D21 | Tables may overflow after D19 fix. Existing `overflow-x: auto` at <=768px should handle. Needs re-verification. | Medium |

---

## PRIORITY ORDER

1. D19 + D20 — Critical mobile bugs
2. D1-D13 — Vertical rhythm alignment
3. D12 — HR zero-margin
4. D16 — TOC overflow guard
5. D18 — IntersectionObserver tuning
6. D14, D15, D17 — Minor polish
