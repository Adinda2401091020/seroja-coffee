# Seroja Coffee — Design Guide

This document records the current visual system and interaction patterns for the
Seroja Coffee website. Use it as the reference when adding or updating pages.

## Brand direction

- **Personality:** editorial, warm, grounded in Indonesian coffee origins, and
  contemporary rather than overly decorative.
- **Visual balance:** generous whitespace, large photography, restrained
  typography, and bright-blue details against a light background.
- **Grid alignment:** cards in the same row should start on the same baseline
  and use equal image heights. Do not stagger cards vertically unless a section
  is intentionally redesigned as an editorial collage.
- Keep the experience image-led, but make headings, descriptions, and actions
  easy to scan.

## Design tokens

Tokens are defined at the top of `styles.css`.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f7f9fc` | Main page background |
| `--paper-deep` | `#eaf1fa` | Alternate section background |
| `--ink` | `#16314f` | Main text and headings |
| `--muted` | `#52677f` | Supporting text |
| `--primary` | `#003a6c` | Primary actions and brand details |
| `--blue-mid` | `#164ecd` | Secondary blue and primary-action hover state |
| `--blue-bright` | `#0085ff` | Small decorative highlights |
| `--accent` | `#164ecd` | Emphasis and text labels with readable contrast |
| `--blue-pale` | `#d6e4ff` | Soft blue highlight surfaces |
| `--line` | `#d3e1f1` | Dividers and subtle borders |
| `--display` | Bricolage Grotesque, Arial | Display headings |
| `--sans` | Roboto, Arial | Body text, labels, and controls |

Use the existing tokens before introducing new colors. Keep uppercase labels
letter-spaced and understated. Use Bricolage Grotesque for headings with close
tracking and selective italic emphasis; use Roboto for body text and controls.
Keep supporting text comfortably readable and maintain strong color contrast.

## Page structure

The page is a single scrollable landing page. Keep these sections in order:

1. **Hero (`#home`)** — full-viewport image carousel, short story, CTA, previous
   and next controls, and slide indicators.
2. **Our Roles (`#peran`)** — three equal cards for kebun, origin, and cangkir.
3. **Coffee Origin (`#origin`)** — seven selected farm locations in Bener
   Meriah: Pondok Gajah, Pondok Sayur, Hakim, Gele, Bintang, Atu Lintang, and
   Bur Lintang. Mark temporary farm photos so they can be replaced.
4. **Coffee Process (`#process`)** — cards for Heritage Luwak Liar, Giling
   Basah, Basah, Natural, and Honey processes.
5. **Origin map (`#dampak`)** — its own full-viewport section. The SVG is
   traced from the supplied Aceh map artwork and is illustrative, not a
   navigation map or precise geographic dataset.
6. **Our Impact (`#our-impact`)** — impact statistics and table. Current values
   are dummy examples and must not be presented as verified business data.
7. **Story and history (`#riwayat`)** — three editorial cards for Our Story,
   How it started, and Our Commitment.
8. **Field story (`#cerita`)** — full-width photo and short editorial story.
9. **Explore origins (`#jelajah`)** — four cards with location, variety, and
   tasting notes.
10. **Footer (`#kontak`)** — brand summary, navigation, and contact details.
   Current location and email are examples.

Preserve the section IDs when possible because navigation links and CTAs use
them.

## Grid and card patterns

- Use CSS Grid with `minmax(0, 1fr)` columns so long text cannot force overflow.
- Desktop: three columns for Our Roles, Coffee Origin, and process cards; four for Explore.
- Story and history uses three editorial cards on desktop.
- Tablet: Explore changes to two columns.
- Mobile: cards stack in one column.
- Role, product/process, story-history, and Explore cards share the same
  rounded surface, soft shadow, image height, copy padding, heading scale, and
  description rhythm.
- Card copy remains directly below its image. Use a short category label, a
  clear title, concise description, and a visible action where appropriate.
- Cards that open details use one real button with `data-open-detail`; the
  shared native `<dialog>` displays the card image and copy. Optional
  `data-detail` text provides additional context without duplicating an inline
  expand control. Keep the dialog close button and backdrop dismissal behavior.
- Keep the lightweight hover lift and image zoom subtle. Do not make hover the
  only way to discover or activate an action.

## Logo and image assets

- The header and footer both use `assets/seroja-logo.png`, extracted from the
  supplied logo artwork with its black background converted to transparency.
  Replace that file with another transparent logo PNG to update both placements
  together. The original SVG artwork is retained at `assets/seroja-logo.svg`.
- Local photo slots live in `assets/images/`. The current available filenames
  and temporary photo assignments are documented in
  [`assets/images/README.txt`](./assets/images/README.txt).
- Use local image files from `assets/images/` and keep their paths in
  `index.html` aligned with the actual filenames. Replace temporary assignments
  with final photos as they become available.
- Use descriptive `alt` text for meaningful photos. Use empty alt text only
  when the image is purely decorative.
- Prefer landscape crops for card imagery, and choose a focal point that remains
  visible with `object-fit: cover` on narrow screens.

## Motion and interaction

- The hero fades between slides and slowly scales the active photo.
- Content reveals as it enters the viewport. Cards lift slightly and photos
  zoom subtly on hover.
- The illustrative map marks the Bener Meriah origin.
- Honor `prefers-reduced-motion`: reduced-motion users should not receive
  scroll reveals or prolonged animation.
- Carousel buttons, dots, and keyboard left/right arrows should keep the slide
  number, active dot, and `aria-hidden` state in sync.
- Keep actions usable by keyboard and show a visible `:focus-visible` outline.

## Responsive behavior

Breakpoints currently used in `styles.css`:

- `max-width: 900px`: tighter section gutters and two-column Explore grid.
- `max-width: 680px`: mobile navigation, single-column card grids, stacked
  impact content, and compact dialog layout.

When adjusting layouts, verify the hero, all card grids, full-screen map,
impact table, dialog, and footer at both desktop and mobile widths. Prevent
horizontal page overflow; the impact table may scroll within its own wrapper on
small screens.

## Content and data

- Keep Indonesian descriptions concise and human. English can be used for
  section names or origin titles where it suits the brand.
- Treat all current impact counts, partner descriptions, business location,
  contact details, and product/origin specifics as placeholders until verified
  information is supplied.
- Label simulated values clearly. Do not turn sample content into factual
  claims.

## Files and maintenance

- `index.html` — page structure, copy, image slots, card content, and detail
  dialog.
- `styles.css` — tokens, layout, responsive rules, and animation.
- `script.js` — mobile menu, carousel, local image loading, card details, and
  scroll reveal behavior.
- `assets/seroja-logo.png` — shared header/footer logo.
- `assets/seroja-logo.svg` — original supplied logo artwork.
- `assets/images/` — replaceable local photo assets.

After a visual update, check desktop and mobile layouts, keyboard/focus
behavior, carousel controls, detail dialogs, image loading, and reduced-motion
behavior in a browser.
