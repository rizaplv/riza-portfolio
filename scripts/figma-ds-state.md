# rizaplv Figma DS — resume state
File: https://www.figma.com/design/C5ka8cIimk4XYLMc1FUtsB (key C5ka8cIimk4XYLMc1FUtsB)

## SELESAI
- Tokens: Primitives(26) Spacing(9) Radius(4) Color Light(16) Color Dark(16) — 71 variabel, code syntax var(--color-*) ter-set
- Text styles: Display/Hero, Display/Statement, Display/Subtitle, Heading/Section, Heading/Card, Body/Base, Label/Eyebrow, Label/Small, Label/Nav, Mono/Code
- Effect styles: Shadow/Card, Shadow/Card-Dark, Shadow/Project
- Pages: Foundations (cover+swatch light/dark+type+spacing+radius) | Components | Previews (kosong)
- Components (page Components): Button set 6:27 (Ink/Outline/Accent × Default/Hover, variants 6:15..6:25), Badge set 6:36 (6:28 Availability, 6:31 Category, 6:33 Featured), FilterPill set 6:41 (6:37,6:39), IconButton set 6:52 (6:42,6:47), SectionHeader 6:53, Navbar 6:60, ProjectCard 6:75, Footer 6:84

## BELUM (keblokir limit MCP Starter)
Previews page: Hero light (pakai instance 6:15,6:19,6:42,6:28) + Hero dark (manual hex dark palette).
Script lengkap tersimpan: scripts/figma-preview-hero.js (jalankan sekali, setCurrentPage Previews).
Jalankan lagi saat limit reset / setelah upgrade: tool mcp__figma__use_figma fileKey C5ka8cIimk4XYLMc1FUtsB.

## Gotchas yang dipakai
- setVariableCodeSyntax('WEB', 'var(--x)') — bukan assignment property (no setter)
- Scope SPACE_BETWEEN/SPACE_AFTER invalid di API ini
- Starter: 1 mode/collection (addMode throw), 3 pages/file, createInstanceFromAsync tidak ada → node.createInstance()
- Gradient stops wajib alpha channel
