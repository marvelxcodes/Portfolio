# marvelxcodes — portfolio

A parallax storytelling portfolio. Next.js 16 (App Router, Turbopack), Tailwind
v4 with a CSS-first token system, GSAP for every text and SVG effect, Motion for
springs, Lottie for the small loops, and hand-written GLSL under Paper Shaders.

## Design language

Three sites were analysed live with Playwright — computed styles, custom
properties, DOM structure and measured scroll behaviour, not screenshots — and
blended rather than copied.

| Source | What it contributes | Where it shows up |
| --- | --- | --- |
| [juanmora.co](https://juanmora.co) | The whole register: warm cream ground `#faf6ef`, peach field `#ffbc95` / `#f99e76`, electric cobalt `#2e54fe`, warm grey `#96908c`. Plus the parallax model — a clipped frame whose media drifts at ~30% of scroll while dimming to 0.6, half-width sticky scenes, and one pinned panel the argument scrolls over. | `Hero`, `Curious`, `Services`, `Reasons`, `Contact` |
| [gsap.com](https://gsap.com) | The per-letter morph: each glyph in its own overflow-clipped cell, a second face pinned to the same bottom edge for a 3D flip, SVG flair marks at `z-index: -1` behind chosen letters, a counter sliding through a widened cell, and `{ }` braces around the standfirst. Also the near-black `#0e100f` used as the inverted register. | `MorphHeadline`, `shapes.tsx`, `Reasons`, `Footer` |
| [bymonolog.com](https://bymonolog.com) | Success Stories: a sticky label rail beside a ten-column collection, each row a twelve-column split of a 3:2 cover and five columns of copy, dotted separators, oversized metric readouts, and the `06 / View all / (→)` closer. | `Stories` |

The peach accent sits between juanmora's two oranges. The body runs warm; the
panel and footer run on gsap.com's green-black — the inversion is what makes the
peach read as heat rather than trim.

## Chapters

`Hero → Curious → Success Stories → Services → Reasons → Process → Contact → Footer`

The register alternates on purpose: peach hero, cream, the beige Stories plate,
cream, full inversion for the argument, cream, peach closer, ink footer.

## Run

```bash
bun install
bun run dev        # http://localhost:3000
bun run build
bun run lint       # `next lint` no longer exists in Next 16 — this is `eslint .`
bun run typecheck
```

## Where things live

```
src/
  app/globals.css        the whole design system: @theme tokens + CSS extensions
  data/site.ts           every word on the site
  shaders/field.ts       the GLSL field, with light and dark compositing modes
  components/
    motion/              MorphHeadline, MorphShape, Scramble, SplitText,
                         CharFill, Reveal, Parallax, Marquee, Counter, Lottie
    sections/            one file per chapter
    ui/                  Nav, Footer, Cursor, Preloader, shapes, Chapter
public/covers/           generated project cover art, in palette
public/portrait-*.jpg    hero and about portraits
```

## Notes

- **GSAP plugins.** MorphSVG, DrawSVG and ScrambleText were members-only for a
  decade and are public as of 3.13, which is what makes the real path-to-path
  morphing here possible without a licence check.
- **CSS layering.** Every extension in `globals.css` lives in `@layer
  components`. Tailwind v4 orders layers theme → base → components → utilities,
  so an *unlayered* rule sorts last and silently outranks every utility — a
  `.link-underline { color: inherit }` written outside a layer beats
  `text-cream-50/80` on the same element.
- **Class-name collisions.** The dark register is `.on-ink`, not `.invert`:
  Tailwind ships `invert` as the `filter: invert(100%)` utility, and a
  same-named component class loses to it. The section rendered photo-negative.
- **Portraits.** `public/portrait-hero.jpg` and `public/portrait-about.jpg` are
  graded crops of the source photograph, standing in until generated assets
  replace them. Drop replacements at the same paths — nothing else changes.
  See `PROMPTS.md` for the image prompts.
- **Content.** LinkedIn is behind an auth wall (HTTP 999), so profile content
  comes from the GitHub API, the profile README and pinned repositories.
- **Journal.** Routing, metadata, `generateStaticParams` and the reading surface
  are wired; the post bodies are placeholders.
- **`hello@marvelxcodes.dev`** is a placeholder address, and the contact form
  composes a `mailto:` rather than posting to a backend.
- **Accessibility.** Every scroll effect is gated on `prefers-reduced-motion`,
  entrance states are undone by a `<noscript>` block so the page is complete
  without JavaScript, and the morph headline carries its full text in an
  `sr-only` label since the visible glyphs are per-letter and `aria-hidden`.
