```markdown
# Design System Document: The Digital Soil

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Soil"**
This design system rejects the cold, sterile nature of traditional government portals. Instead, it embraces a philosophy of **Organic Technicality**. We are building the "Google for Bharat"—a platform that feels as rooted and dependable as the earth (Secondary Earth Tones) but as visionary and clear as a morning mist over a field (Glassmorphism & Emerald Gradients).

To break the "template" look, we move away from rigid, boxy grids. We utilize **intentional asymmetry**, where hero elements may bleed off-canvas, and **tonal depth**, where the interface feels like layers of semi-transparent silk stacked upon one another. The goal is an editorial experience that feels premium, human-centered, and profoundly intuitive for rural governance.

---

## 2. Colors & Surface Philosophy
The palette balances the high-tech vibrancy of Emerald/Teal with the grounding stability of Sand and Saffron.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning. 
Boundaries must be defined solely through:
1. **Background Color Shifts:** A `surface-container-low` section sitting on a `surface` background.
2. **Subtle Tonal Transitions:** Using the spacing scale to create breathing room that acts as a natural separator.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of frosted glass. 
- **Base Layer:** `surface` (#f9f9f8) with a very light textured gradient.
- **Sectioning:** Use `surface-container-low` (#f3f4f3) for large layout blocks.
- **Interactive Cards:** Use `surface-container-lowest` (#ffffff) to create a "lifted" feel.
- **Deep Content:** Use `surface-dim` (#d9dad9) for inactive or recessed utility areas.

### The "Glass & Gradient" Rule
Floating elements (Modals, Navigation Bars, Hovering Action Cards) must use Glassmorphism. 
- **Value:** `surface` color at 70% opacity + `backdrop-blur: 20px`.
- **Primary CTAs:** Always use the signature gradient: `primary-container` (#10b981) to `inverse-primary` (#4edea3). This provides the "visual soul" that flat colors lack.

---

## 3. Typography: Editorial Authority
We pair **Plus Jakarta Sans** (Display/Headlines) for a modern, approachable personality with **Inter** (Body/Labels) for clinical readability.

*   **Display (LG/MD/SM):** Use `display-lg` (3.5rem) for high-impact welcome states. Bold weights only. These should feel like a premium broadsheet.
*   **Headlines:** `headline-md` (1.75rem) provides the structural anchor. Use `on-surface` (#191c1c) to maintain high contrast.
*   **Body Text:** `body-lg` (1rem) for all primary reading. Line height must be generous (1.6) to ensure accessibility for all age groups.
*   **Labels:** `label-md` (0.75rem) in `outline` (#6c7a71) color for metadata.

---

## 4. Elevation & Depth
Hierarchy is achieved through **Tonal Layering**, not structural lines.

### Ambient Shadows
For "floating" components like FABs or Glass Cards:
- **Shadow:** `0 20px 40px rgba(25, 28, 28, 0.06)`. 
- **Color Note:** Never use pure black shadows. The shadow must be a tinted version of the `on-surface` color to mimic natural, ambient light.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., Input Fields):
- **Token:** `outline-variant` (#bbcabf) at **15% opacity**. 
- **Rule:** 100% opaque borders are forbidden.

---

## 5. Components

### Buttons
- **Primary (Pill):** `full` roundedness. Uses the Emerald-to-Teal gradient. White text (`on-primary`). 
- **Secondary (Earthy):** `secondary-container` (#f8dac7) background with `on-secondary-container` (#755e4f) text.
- **CTA Accent:** For urgent actions (e.g., "Apply Now"), use `tertiary-container` (#e29100) / Saffron.

### Cards & Lists
- **The Rule of Whitespace:** Use `spacing-6` (2rem) or `spacing-8` (2.75rem) to separate list items instead of divider lines.
- **Curvature:** Standard cards use `lg` (2rem) corner radius. Secondary cards use `DEFAULT` (1rem).
- **Glass Cards:** Used for top-level stats. Background: `surface` at 60% + blur.

### Input Fields
- **Styling:** `md` (1.5rem) rounded corners. Background: `surface-container-highest` (#e1e3e2).
- **Active State:** A 2px "Ambient Glow" using `primary` (#006c49) at 30% opacity, rather than a harsh solid line.

### Iconic Navigation
- **Icon-First:** Every major action must be accompanied by a 24px icon. Icons should be "Duotone" style, using `primary` and `primary-fixed-dim` to match the layered aesthetic.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use `surface-container` tiers to nest content. (e.g., A white card inside a light grey section).
*   **DO** use "Plus Jakarta Sans" for all numbers and statistics to make them feel prestigious.
*   **DO** apply a subtle grain or "paper texture" overlay to the `background` gradient to avoid a "flat digital" look.

### Don’t
*   **DON'T** use 1px solid lines to separate content. Use space or color.
*   **DON'T** use pure `#000000` for text. Use `on-surface` (#191c1c).
*   **DON'T** use sharp corners. The minimum radius is `sm` (0.5rem), but the preference is always `DEFAULT` (1rem) and above.
*   **DON'T** use standard Material shadows. Keep blurs large and opacities under 8%.

---

## 7. Signature Platform Components
*   **The "Progress Bloom":** A radial glass component showing governance application status, using the Primary Gradient.
*   **The "Community Hearth":** A horizontally scrolling card section for village updates, utilizing `secondary-fixed` (Soft Brown) to feel warm and inviting.
*   **The "Citizen FAB":** A large, pill-shaped floating action button in Saffron (#F59E0B) that follows the user, acting as a constant "Help/AI" anchor.```