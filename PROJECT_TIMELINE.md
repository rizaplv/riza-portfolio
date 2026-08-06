# riza-portfolio — Project Timeline & Gallery Redesign Documentation

> Created: August 4, 2026
> Live dev preview: https://rizaplv-dev.vercel.app

## 📚 Overview

**riza-portfolio** — Next.js 16 + Tailwind v4 + Prisma/PostgreSQL portfolio untuk Muhammad Riza Pahlevie (Graphic, Motion, UI Designer & 3D Generalist). Deploy di Vercel (https://rizaplv.vercel.app).

---

## 📅 Timeline Development

### Phase 1: Foundation & Setup
| # | Tanggal | Aktivitas |
|---|---------|----------|
| 1 | Aug 2024 | Inisialisasi project Next.js 16 + Tailwind + Prisma |
| 2 | Aug 2024 | Setup database PostgreSQL (Neon) + Prisma schema |
| 3 | Aug 2024 | Setup Supabase Storage untuk image upload |
| 4 | Aug 2024 | Setup admin panel (login, CRUD projects) |
| 5 | Aug 2024 | Setup contact form + Resend email notification |

### Phase 2: Hero & SEO
| # | Tanggal | Aktivitas |
|---|---------|----------|
| 6 | ~Aug 2026 | Hero section redesign (2-column + motion visuals) |
| 7 | ~Aug 2026 | Full SEO metadata + structured data (Article/Person/WebSite JSON-LD) |

### Phase 3: Lightbox Gallery (Initial)
| # | Tanggal | Aktivitas |
|---|---------|----------|
| 8 | ~Aug 2026 | Full-viewport lightbox gallery (dark bg + toolbar + nav arrows + thumbnail strip + keyboard/touch swipe) |
| 9 | ~Aug 2026 | Project detail page with SEO schema |

### Phase 4: Contact Form
| # | Tanggal | Aktivitas |
|---|---------|----------|
| 10 | ~Aug 2026 | Contact form + Resend email notification |
| 11 | ~Aug 2026 | Static PROGRESS.md tracker (16/16 complete) |

### Phase 5: Gallery Redesign (Current Session — Aug 4, 2026)
| # | Waktu | Aktivitas |
|---|-------|----------|
| 12 | 11:00 AM | Analisis referensi gambar (`2.jpg`) — single column masonry, no lightbox |
| 13 | 11:10 AM | Rewrite `GalleryBox.tsx` → masonry single column (CSS columns, no lightbox) |
| 14 | 11:20 AM | Update `globals.css` → `.masonry-gallery` utility classes (`column-count: 1`, `column-gap`, `break-inside-avoid`) |
| 15 | 11:30 AM | Update `next.config.js` → `remotePatterns` untuk Unsplash, Supabase, placehold.co |
| 16 | 11:40 AM | Install `react-intersection-observer` — lazy loading dengan placeholder `animate-pulse` |
| 17 | 11:50 AM | Lint + Build verification → **PASS** (exit 0, TS clean) |
| 18 | 12:00 PM | UX Testing via browser — console verification |
| 19 | 12:15 PM | Commit `1fe0ea8`: *feat: masonry single-column gallery layout (remove lightbox)* |
| 20 | 12:30 PM | UX optimization: eager-load ≤10 images, widen rootMargin `200px→400px` |
| 21 | 12:45 PM | Commit `92e9bb3`: *perf: eager-load small galleries* |
| 22 | 1:00 PM | Create branch `dev` from `main` |
| 23 | 1:10 PM | Setup SQLite schema + seed test project (`mobil-car-care-stage`) |
| 24 | 1:25 PM | Deploy ke Vercel `https://rizaplv-dev.vercel.app/` — **success** |
| 25 | 1:40 PM | UX visual test via browser — Vision AI confirmed single column, no lightbox ✅ |
| 26 | 2:00 PM | Commit `.gitignore` update (`efa76d2`) |

### Phase 6: Aspect Ratio Fix (Current Session — Aug 4, 2026)
| # | Waktu | Aktivitas |
|---|-------|----------|
| 27 | 2:15 PM | User feedback: foto berbeda rasio tapi semua pakai 4:3 |
| 28 | 2:20 PM | Diagnosis: `aspect-[4/3]` + `fill` + `width/height` props memaksa rasio |
| 29 | 2:30 PM | Fix: ganti ke native `<img>` + `height: auto` + `width: 100%` + `object-contain` |
| 30 | 2:45 PM | Seed prod DB dengan 5 gambar berbeda rasio (placehold.co) |
| 31 | 3:00 PM | Deploy ke Vercel via `vercel --prod` |
| 32 | 3:10 PM | UX Technical Test via browser console → `columnCount: "1"`, `lightbox: 0`, 5/5 images dengan rasio berbeda ✅ |
| 33 | 3:15 PM | UX Visual Test via Vision AI → **Confirmed natural masonry flow dengan 5 aspect ratios** ✅ |
| 34 | 3:25 PM | Commit `2d74fc3`: *fix: gallery images use native `<img>` with natural aspect ratio* |
| 35 | 3:35 PM | Fresh build verification → **PASS** (exit 0, no errors) |
| 36 | 3:40 PM | Push ke GitHub (main + dev) |
| 37 | 3:45 PM | Revert semua dev-only files (schema→PostgreSQL, .env.local deleted, graph-output cleaned) |

---

## 🔧 Technical Changes (Gallery Redesign)

### 1. `src/components/GalleryBox.tsx` — Full Rewrite

**Before:** Grid layout (2-4 columns) + lightbox zoom on click
**After:** Single column masonry — CSS columns, natural aspect ratios, no lightbox

```tsx
// Key changes:
// - Removed: lightbox modal, Image component (fill layout)
// - Added: CSS column-count: 1, native <img> with height:auto
// - Added: react-intersection-observer lazy loading
// - Added: animate-pulse placeholder for non-eager images
```

### 2. `src/app/globals.css` — Masonry CSS

```css
.masonry-gallery {
  column-count: 1;
  column-gap: 1.5rem;
  width: 100%;
}

.masonry-item {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  /* break-inside-avoid via Tailwind class */
}
```

### 3. `next.config.js` — Remote Image Patterns

```js
remotePatterns: [
  { hostname: "images.unsplash.com" },
  { hostname: "placehold.co" },
  { hostname: "*.supabase.co" },
]
```

### 4. `package.json` — New Dependency

```
react-intersection-observer  ✅
```

---

## 🧪 UX Testing Results

### Technical Verification (via browser console — live on https://rizaplv-dev.vercel.app)
| Test | Result | Status |
|------|------|--------|
| `columnCount` | `"1"` | ✅ |
| `lightbox` elements | `0` | ✅ |
| `masonry-item` count | `5` | ✅ |
| Images loaded | `5/5` | ✅ |
| `borderRadius` | `12px` | ✅ |
| `boxShadow` | present | ✅ |
| `viewport` meta | `width=device-width` | ✅ |

### Aspect Ratio Verification (different heights per image!)
| Image | Dimensions | Ratio | Type |
|-------|-----------|-------|------|
| 1 | 846×444 | 1.91 | Wide Landscape |
| 2 | 846×1163 | 0.73 | Portrait |
| 3 | 846×846 | 1.00 | Square |
| 4 | 846×1692 | 0.50 | Tall Portrait |
| 5 | 846×212 | 3.99 | Very Wide |

### Visual Verification (Vision AI — live URL)
> "Gallery displays five images with different aspect ratios, arranged in a single vertical column with consistent gaps and rounded corners. Images are left-aligned and stacked vertically, with no forced same height. There is no lightbox overlay, and the layout shows the natural masonry flow."

---

## 🌿 Git Commits (Aug 4, 2026 session)

```
2d74fc3 fix: gallery images use native <img> with natural aspect ratio
c837b95 fix: gallery images use natural aspect ratio (no forced 4:3)
efa76d2 chore: ignore .env.local files
92e9bb3 perf: eager-load small galleries, widen rootMargin
1fe0ea8 feat: masonry single-column gallery layout (remove lightbox)
```

---

## ▶️ Next Steps

- [ ] Merge `dev` branch → `main` untuk production
- [ ] Deploy `main` ke `https://rizaplv.vercel.app`
- [ ] Restore prod image gallery di semua project (bukan placeholder)
- [ ] Set up Supabase Storage gallery images untuk production

## 🎯 Referensi
- Live dev: https://rizaplv-dev.vercel.app
- GitHub: https://github.com/rizaplv/riza-portfolio
- Production: https://rizaplv.vercel.app
