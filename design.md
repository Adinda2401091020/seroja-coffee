# Seroja Coffee — Design Guide

This document records the current visual system and interaction patterns for the
Seroja Coffee website. Use it as the reference when adding or updating pages.

## Brand direction

- **Personality:** editorial, warm, grounded in Indonesian coffee origins, and
  contemporary rather than overly decorative.
- **Visual balance:** generous whitespace, large photography, restrained
  typography, and small coral details.
- **Grid alignment:** cards in the same row should start on the same baseline
  and use equal image heights. Do not stagger cards vertically unless a section
  is intentionally redesigned as an editorial collage.
- Keep the experience image-led, but make headings, descriptions, and actions
  easy to scan.

## Design tokens

Tokens are defined at the top of `styles.css`.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f4f6f0` | Main page background |
| `--paper-deep` | `#e8eee8` | Alternate section background |
| `--ink` | `#183a3b` | Main text and headings |
| `--muted` | `#697975` | Supporting text |
| `--green` | `#24605b` | Primary actions and brand details |
| `--accent` | `#c67255` | Emphasis, labels, and small highlights |
| `--line` | `#d4dfd9` | Dividers and subtle borders |
| `--serif` | Playfair Display, Georgia | Editorial headings |
| `--sans` | DM Sans, Arial | Body text, labels, and controls |

Use the existing tokens before introducing new colors. Keep small uppercase
labels letter-spaced and understated. Headings use a serif face, close tracking,
and selective italic emphasis.

## Page structure

The page is a single scrollable landing page. Keep these sections in order:

1. **Hero (`#home`)** — full-viewport image carousel, short story, CTA, previous
   and next controls, and slide indicators.
2. **Our Roles (`#peran`)** — three equal cards for kebun, origin, and cangkir.
3. **Coffee Origin (`#origin`)** — three equal origin cards.
4. **Origin map (`#dampak`)** — its own full-viewport section. The current SVG
   is illustrative; do not present its pins or shapes as precise geographic
   data.
5. **Our Impact (`#our-impact`)** — impact statistics and table. Current values
   are dummy examples and must not be presented as verified business data.
6. **Field story (`#cerita`)** — full-width photo and short editorial story.
7. **Explore origins (`#jelajah`)** — four cards with location, variety, and
   tasting notes.
8. **Footer (`#kontak`)** — brand summary, navigation, and contact details.
   Current location and email are examples.

Preserve the section IDs when possible because navigation links and CTAs use
them.

## Grid and card patterns

- Use CSS Grid with `minmax(0, 1fr)` columns so long text cannot force overflow.
- Desktop: three columns for Our Roles and Coffee Origin; four for Explore.
- Tablet: Explore changes to two columns.
- Mobile: cards stack in one column.
- Our Roles photos share the same height; Coffee Origin photos share the same
  height. Keep cards in each grid row aligned.
- Use the existing asymmetric corner treatment sparingly on images, not on
  every text container.
- Card copy should remain directly below its image. Use a short category label,
  a clear title, concise description, and a visible action.
- Cards that open details use a real button with `data-open-detail`; the shared
  native `<dialog>` displays the card image and copy. Keep the dialog close
  button and backdrop dismissal behavior.
- Keep the lightweight hover lift and image zoom subtle. Do not make hover the
  only way to discover or activate an action.

## Logo and image assets

- The header and footer both use `assets/seroja-logo.png`, extracted from the
  supplied logo artwork with its black background converted to transparency.
  Replace that file with another transparent logo PNG to update both placements
  together. The original SVG artwork is retained at `assets/seroja-logo.svg`.
- Local photo slots live in `assets/images/`. The matching filenames are
  documented in [`assets/images/README.txt`](./assets/images/README.txt).
- Use JPEG files with those exact names. Uploaded photos load from their local
  `.jpeg` files; the Explore Gayo card currently reuses `origin-gayo.jpeg`
  until `coffee-gayo.jpeg` is supplied.
- Image slots are assigned with `data-image-slot` in `index.html`; `script.js`
  maps each slot to its local filename. Keep the slot and file mapping aligned
  when changing an image.
- Use descriptive `alt` text for meaningful photos. Use empty alt text only
  when the image is purely decorative.
- Prefer landscape crops for card imagery, and choose a focal point that remains
  visible with `object-fit: cover` on narrow screens.

## Motion and interaction

- The hero fades between slides and slowly scales the active photo.
- Content reveals as it enters the viewport. Cards lift slightly and photos
  zoom subtly on hover.
- Map pins pulse gently.
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
