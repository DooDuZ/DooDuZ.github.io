# language._.by Design System

## 1. Atmosphere & Identity

A quiet, compact busking card for a phone screen. The signature is a near-monochrome editorial surface: thin rules, mono labels, soft rounded controls, and a single black active state make the live setlist legible at a glance.

## 2. Color

| Role | Token | Value | Usage |
|---|---|---:|---|
| Surface | `--bg` | `#FAFAF9` | Page background |
| Surface elevated | `--input-bg` | `#FFFFFF` | Inputs, panels, popovers |
| Text | `--fg` | `#0A0A0A` | Primary copy and controls |
| Text muted | `--muted` | `#737373` | Labels and secondary copy |
| Border | `--line` | `rgba(0, 0, 0, 0.12)` | Rules and control outlines |
| Active | `--accent` | `#0A0A0A` | Current song and primary actions |
| Active text | `--accent-fg` | `#FAFAF9` | Text on active controls |
| Success | `--success` | `#15803D` | Confirmed actions |
| Error | `--error` | `#B91C1C` | Inline error feedback |

Use black as the only action accent. Status colors communicate state only.

## 3. Typography

| Level | Size | Weight | Usage |
|---|---:|---:|---|
| Display | 36px | 700 | Artist title |
| Body | 13.5px | 500 | List entries and controls |
| Small | 12px | 400 | Supporting copy |
| Mono label | 9.5px | 600 | Section labels, status and metadata |

- Sans: Pretendard, system sans-serif fallback.
- Mono: JetBrains Mono, monospace fallback.
- Korean labels remain on one line where space permits; controls truncate before causing horizontal page overflow.

## 4. Spacing & Layout

- Base unit: 4px.
- Page gutter: 22px; max content width: 480px.
- Section gap: 22px; compact control gaps: 8px; standard panel padding: 12px.
- Single-column document flow at every viewport. Overlays use the viewport; their internal content scrolls rather than the page growing sideways.

## 5. Components

### Setlist row
- **Structure**: position badge, title/subtitle, optional NOW label.
- **States**: default, current, empty, loading, error.
- **Accessibility**: semantic list; a song link is keyboard reachable when it has a code/lyrics page.

### Admin trigger and panel
- **Structure**: compact text button, sign-in state, selection/search field, setlist actions.
- **States**: signed out, signing in, authorized writer, permission denied, loading, empty, error.
- **Accessibility**: native buttons and labels; Escape/close control; visible focus; live status text.
- **Layout**: fixed overlay with a scroll-owning inner panel.

### Compact action button
- **States**: default, hover, active, focus-visible, disabled.
- **Motion**: 180ms color/border transition; reduced motion disables it.

## 6. Motion & Interaction

- Use 180ms ease transitions for color and border only.
- No decorative motion. State changes must communicate a successful save, current-song change, or panel visibility.
- Respect `prefers-reduced-motion` by removing transitions.

## 7. Depth & Surface

Borders-only hierarchy: 1px `--line` outlines and dashed list separators. The admin panel may use one soft shadow solely to separate a modal layer from the page.

## 8. Accessibility Constraints & Accepted Debt

### Constraints
- Target WCAG 2.2 AA contrast, visible keyboard focus, labelled fields, and an `aria-live` save/error status.
- Only the authenticated Firebase writer may successfully persist changes; hiding UI is not treated as authorization.

### Accepted Debt
| Item | Location | Why accepted | Owner / Exit |
|---|---|---|---|
| Static code/lyric pages | `songs/song-*.html` | Firebase can add a title-only live request, but cannot create a safe code/lyric page without source text. | Add an authenticated song-editor workflow when code/lyrics editing is requested. |
