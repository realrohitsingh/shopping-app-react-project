# Tailwind CSS Quick Cheatsheet

## Layout

- Container: `max-w-md`, `max-w-lg`, `mx-auto`, `p-4`, `md:p-8`
- Flex: `flex`, `items-center`, `justify-between`, `gap-4`
- Grid: `grid`, `grid-cols-2`, `md:grid-cols-3`, `gap-6`

## Spacing

- Padding: `p-4`, `px-6`, `py-2`
- Margin: `m-4`, `mt-6`, `mb-2`

## Typography

- Font: `font-sans`, `font-semibold`, `font-extrabold`
- Size: `text-sm`, `text-lg`, `text-2xl`, `text-4xl`
- Color: `text-primary`, `text-accent`, `text-muted`

## Colors (theme)

- Backgrounds: `bg-background`, `bg-card`, `bg-primary`
- Borders: `border`, `border-border`, `border-white/30`

## Effects

- Radius: `rounded-md`, `rounded-lg`, `rounded-2xl`
- Shadows: `shadow`, `shadow-lg`, `shadow-2xl`, `shadow-glass`
- Blur: `backdrop-blur`, `backdrop-blur-md`, `backdrop-blur-xl`
- Opacity: `bg-white/20`, `text-white/80`

## Buttons

- Primary: `bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark`
- Accent: `bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/80`

## Inputs

- Base: `w-full px-4 py-2 border rounded-md focus:ring-2`
- Glass: `input-glass` (from `App.css` components layer)

## Glassmorphism Panel

- `glass-panel` (from `App.css` components layer)
- Or inline: `relative bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl`

## Responsive

- Prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Example: `md:grid-cols-3`, `lg:text-4xl`

## Tips

- Combine classes incrementally.
- Use browser devtools to tweak classes live.
- Keep theme consistent using colors from `tailwind.config.cjs`.
