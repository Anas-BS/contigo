# Contigo Redesign: Glassmorphism & Motion Principles

This document outlines the design system and motion principles for the Contigo platform redesign, focusing on a modern Glassmorphism aesthetic and fluid animations powered by Framer Motion.

## 1. Design Philosophy: Glassmorphism

**Glassmorphism** is a design trend characterized by translucent, frosted-glass-like elements, often combined with vibrant colors and subtle shadows. Key characteristics include:

- **Transparency/Blur:** Background blur applied to elements, creating a frosted glass effect.
- **Multi-layered Approach:** Objects are placed on top of each other, creating a sense of depth.
- **Vibrant Colors:** Often used in the background to enhance the frosted effect.
- **Light Border:** A subtle, thin border around the translucent elements to define their edges.

This aesthetic will be applied to cards, modals, and other interactive UI components, providing a sophisticated and contemporary feel.

## 2. Color Palette

While retaining the existing Contigo Orange (`#F97B4F`) as a primary accent, the palette will be expanded to include complementary soft gradients and translucent shades to support the Glassmorphism effect.

| Category | Color Name | Hex Code | Usage |
| :------- | :--------- | :------- | :---- |
| **Primary** | Contigo Orange | `#F97B4F` | CTAs, active states, branding accents |
| **Accent 1** | Soft Blue | `#A7C7E7` | Background gradients, secondary elements |
| **Accent 2** | Pale Green | `#C8E6C9` | Background gradients, success indicators |
| **Neutral** | Frosted White | `rgba(255, 255, 255, 0.2)` | Glassmorphic card backgrounds |
| **Text** | Dark Gray | `#333333` | Primary text |
| **Text** | Medium Gray | `#666666` | Secondary text, descriptions |

## 3. Typography

We will maintain a clean and readable typography system, leveraging modern sans-serif fonts.

- **Headings:** A bold, modern sans-serif (e.g., Inter, Poppins) for strong visual hierarchy.
- **Body Text:** A highly readable sans-serif (e.g., Inter, Roboto) for content and descriptions.

## 4. Motion Principles: Framer Motion

Framer Motion will be used to introduce subtle yet impactful animations, enhancing user experience and providing visual feedback. The focus will be on **delightful, functional, and non-intrusive** motion.

### Key Animation Types:

1.  **Entrance Animations:** Elements fading in, sliding up, or scaling slightly upon load or visibility.
    -   **Example:** Cards on dashboards, chat messages in TigoChat.
    -   **Properties:** `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
    -   **Transition:** `duration: 0.5, ease: "easeOut"`

2.  **Hover Effects:** Interactive elements responding to user input.
    -   **Example:** Buttons, clickable cards, navigation links.
    -   **Properties:** `whileHover={{ scale: 1.02, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }}`
    -   **Transition:** `type: "spring", stiffness: 400, damping: 10`

3.  **Layout Transitions:** Smooth changes when elements are added, removed, or reordered.
    -   **Example:** TigoChat opening/closing, dynamic lists.
    -   **Properties:** `layout` attribute on `motion.div`
    -   **Transition:** `type: "spring", stiffness: 700, damping: 30`

4.  **Feedback Animations:** Visual cues for actions or state changes.
    -   **Example:** Form submission success, item added to a list.
    -   **Properties:** `whileTap={{ scale: 0.95 }}`

### Animation Guidelines:

-   **Subtlety:** Animations should be noticeable but not distracting.
-   **Purposeful:** Every animation should serve a purpose, guiding the user's eye or providing feedback.
-   **Performance:** Prioritize smooth 60fps animations, avoiding heavy effects that could degrade performance.
-   **Consistency:** Apply similar animation patterns across the application for a cohesive feel.

## 5. Implementation Strategy

-   **Global Styles:** Update `globals.css` for background gradients and base typography.
-   **Component-level Styling:** Apply Glassmorphism to existing components (e.g., cards, chat panel) using Tailwind CSS and custom utility classes.
-   **Framer Motion Integration:** Wrap relevant components with `motion.div` and apply `initial`, `animate`, `whileHover`, `whileTap`, and `layout` props as defined above.
-   **Refactor:** Ensure existing components are refactored to easily adopt the new design system.

This plan provides a clear direction for transforming the Contigo interface into a modern, motion-rich, and visually appealing platform.
