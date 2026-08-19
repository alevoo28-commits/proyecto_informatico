# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page marketing site for **NexoMatrix**, a Chilean B2B IT consultancy (student project vinculado a DUOC UC). Static HTML/CSS/JS — no build tool, no package manager, no framework, no dependencies. Open `index.html` directly in a browser or serve the folder with any static file server to preview.

There is no lint/test/build command — the whole "toolchain" is a text editor and a browser.

## Files

- `index.html` — the entire site, one page, anchor-linked sections (`#ia`, `#conocimientos`, `#servicios`, `#confianza`, `#duoc`, `#aprendizaje`, `#certificaciones`, `#metodologia`, `#tecnologias`, `#contacto`). Section order in the DOM **is** the nav order and the page's narrative order — reordering a section means reordering both the `<section>` block and the corresponding `<li>` in `.site-nav ul` (and usually the footer "Enlaces" list too).
- `styles.css` — one stylesheet, no preprocessor, organized top-to-bottom as: design tokens (`:root`) → reset/base → utilities → one block per page section, in the same order the sections appear in `index.html`. Responsive rules live in a single media-query block near the end of the file (breakpoints at 1100px, 900px, 700px, 480px), not inline next to each component.
- `script.js` — one IIFE, no modules/bundler. Handles: dynamic footer year, mobile nav toggle, contact form (client-side validation + `mailto:` submission, no backend), header scroll state, and scroll-reveal via `IntersectionObserver`.

## Design system (`styles.css` tokens)

Color scheme is **solid navy + amber accent — deliberately no gradients** on brand elements (logo, buttons). This was a deliberate choice away from an earlier blue→purple/cyan gradient palette that read as generic AI-generated design; don't reintroduce gradients on `.btn`, `.brand-mark`, or `.brand-text`.

- `--c-primary` (`#0b1d3a`, navy) / `--c-primary-h` (`#14295c`, hover) — brand/CTA color, always flat.
- `--c-accent` (`#d98e2e`, amber) / `--c-accent-soft` (`#b9741f`) — used sparingly for highlights: eyebrow markers, underlines, hover states, stat/metric numbers. Not a background fill for large areas.
- `--grad-primary` and `--grad-accent` are aliased directly to the solid `--c-primary`/`--c-accent` (not real gradients) so existing `background: var(--grad-*)` rules across the file stay flat automatically — keep it that way rather than re-introducing multi-stop gradients there.
- `--grad-hero` is a real (navy-only) gradient used for dark section backgrounds (`hero`, `#tecnologias`, `final-cta-layout`) — this one is fine to keep as a gradient since it's a single-hue depth effect, not a brand-color gradient.
- `--c-navy` / `--c-navy-mid` / `--c-indigo` are darker supporting blues for dark-section backgrounds and secondary text tints.
- Card/section pattern: most content cards (`.service-card`, `.trust-card`, `.learning-card`, `.cert-card`, `.ia-case-card`, `.knowledge-item`, `.steps-list li`) share the same shape — light surface, soft border, `--shadow-xs`→`--shadow-md` on hover, a thin accent bar (`::before`/`::after`) that animates in on hover, and entrance animation via the `.is-visible` class toggled by the `IntersectionObserver` in `script.js`. When adding a new card-style component, add its selector to *both* the CSS entrance-animation rule (`opacity:0` / `.is-visible` block near the end of `styles.css`) and the `querySelectorAll(...)` list in `script.js`'s `initScrollReveal`, or it won't fade in.
- `.section` / `.section-alt` alternate plain and tinted (`--grad-surface`) backgrounds down the page for visual rhythm — keep that alternation when inserting/reordering sections.

## Content notes

- The `#ia` section (Inteligencia Artificial) is intentionally placed immediately after the hero, before Servicios — it's meant to be the first substantive thing a visitor reads. It holds two case-study cards (`#ia-case-pruebaia` — github.com/Alejandroduoc/pruebaIA multi-agent IT support system; `#ia-case-continuidad` — internal orchestrator-agents initiative for mapping a company's org structure and generating per-role task manuals for operational continuity) laid out via `.ia-showcase`'s named grid areas (`case1`/`case2`/`offer`), plus an `.ia-offer` aside. Only add metrics/evidence links to a case-study card when the user gives real numbers/URLs — don't fabricate them (`#ia-case-continuidad` intentionally has neither).
- `#conocimientos`, right after `#ia`, shows the tools the team actually uses (ChatGPT, Gemini, Perplexity, Claude, GitHub, VS Code) as real brand logo images (`.knowledge-item` / `img.knowledge-icon`), sourced from local files in the project root (`ChatGPT-Logo.svg.webp`, `gemini.jpg`, `perplexity-ai-icon.webp`, `Claude-ai-icon.svg.webp`, `github.png`, `Visual_Studio_Code_1.35_icon.svg.webp`). Previously these were colored monogram badges to avoid reproducing trademarked artwork; the user explicitly supplied the real logo files and asked to switch to them, so that's the current intent — if adding a new tool to this grid, source and add its actual logo file rather than reverting to a monogram.
- The contact form has no real backend — it opens the visitor's email client via a `mailto:` link built from form field values in `script.js`. This is called out as a known limitation in a code comment (`initContactForm`); if a real backend/endpoint is added, that's the function to change.
