# Royal Alabaster Design System

### 1. Overview & Creative North Star
**Creative North Star: The Sovereign Professional**
Royal Alabaster is a design system that marries the prestige of a heritage banking institution with the agility of modern enterprise resource planning. It is built to feel "Established yet Evolved." The system breaks the standard "SaaS box" by utilizing deep navy foundations (`#00113a`) juxtaposed against warm, metallic secondary accents (`#775a19`).

The aesthetic is driven by high-density information architecture balanced with wide editorial margins. Layouts are intentionally asymmetric—using heavy right-hand navigation in RTL contexts to anchor the user, while the main canvas floats on a multi-tiered surface of cool grays.

### 2. Colors
The palette is a sophisticated "Fidelity" scheme. It uses a deep Primary Navy for authority and a Golden-Tan Secondary for highlights and critical state indicators (like the active navigation bar).

*   **The "No-Line" Rule:** Sectioning is achieved through color blocks and shadow depth rather than 1px borders. For example, the sidebar uses `surface_container_low` (`#f2f4f6`) to distinguish itself from the `background` (`#f7f9fb`), not a solid line.
*   **Surface Hierarchy & Nesting:** 
    *   `background`: The base canvas.
    *   `surface_container_lowest`: Pure white (`#ffffff`) for elevated "Bento" cards and interactive modules.
    *   `surface_container_low`: The sidebar and secondary navigation background.
*   **The "Glass & Gradient" Rule:** The Floating Action Button (FAB) and Quick Action panels utilize `surface_tint/80` with `backdrop-blur-xl` to create a modern, semi-transparent layer that suggests the interface is made of physical glass.
*   **Signature Textures:** Interactive states and large action panels use subtle background overlays (like the golden circle in the Quick Actions panel) to add depth without clutter.

### 3. Typography
Royal Alabaster uses a dual-font strategy to balance corporate weight with modern readability.
*   **Headlines:** *Manrope* (or *Tajawal* for Arabic) provides a geometric, bold presence.
*   **Body & Labels:** *Plus Jakarta Sans* (or *Tajawal*) offers high legibility for dense data tables.

**Typography Scale:**
*   **Display/Hero:** 1.875rem (30px) - Used for page titles and major stats.
*   **Headline:** 1.5rem (24px) - Used for section headers.
*   **Title/Subhead:** 1.25rem (20px) or 1.125rem (18px).
*   **Body:** 0.875rem (14px) - The standard for all narrative text.
*   **Caption/Label:** 0.75rem (12px) or 10px - Used for uppercase metadata and micro-labels.

### 4. Elevation & Depth
Depth is not just about shadows; it’s about **Tonal Layering**.

*   **The Layering Principle:** 
    1. Base: `background`
    2. Navigation: `surface_container_low`
    3. Content Cards: `surface_container_lowest` (+ `shadow-sm`)
*   **Ambient Shadows:** We use three distinct levels:
    *   `shadow-sm`: For standard data cards.
    *   `shadow-lg`: For primary action buttons and sidebars.
    *   `shadow-2xl`: Reserved for the "Glassified" Floating Action Button to denote it sits on the highest Z-index.
*   **Glassmorphism:** Applied specifically to the FAB (`#435b9f` at 80% opacity with 24px blur) to create a "Signature Element."

### 5. Components
*   **Bento Stats Cards:** Rounded corners (12px/xl), white backgrounds, and a 4px solid "Accent Edge" on the right (Primary, Secondary, or Error) to denote category.
*   **The "Command" Button:** Deep primary background, white text, 12px rounded corners, with a subtle `shadow-lg` to make it feel tactile.
*   **Status Badges:** Pill-shaped with "Fixed" color variants (e.g., `tertiary_fixed` for 'Paid' status) and bold, tracked-out 10px typography.
*   **The Sidebar Nav:** Uses a `border-r-4` on the active item to mirror the "Accent Edge" of the dashboard cards, creating a unified visual language of "anchoring lines."

### 6. Do's and Don'ts
**Do:**
*   Use asymmetric layouts where the primary anchor is a solid vertical block.
*   Apply `backdrop-blur` to any element that floats over content.
*   Use the "Accent Edge" (4px border) on cards to provide a pop of color without overwhelming the neutral palette.

**Don't:**
*   **Don't** use 1px black or dark gray borders to separate content blocks.
*   **Don't** use standard blue for links; use the Secondary Golden-Tan for a more premium editorial feel.
*   **Don't** overcrowd the `surface_container_lowest` cards; keep padding at a minimum of 24px (spacing level 2).