# bt-proto

A mobile web prototype for BTG Clubhouse, built as an installable PWA. On a phone it runs full-screen. On a desktop it renders inside an iPhone-sized frame so you can review it at real phone dimensions.

## Stack

- **React 19** with the React Compiler
- **Vite 8**
- **vite-plugin-pwa** (Workbox) for the manifest, service worker and offline caching
- **Plain CSS**, using tokens and type styles from the BTG Clubhouse design system in `src/design-system/`
- **Geist / Geist Mono** fonts via Fontsource

## Getting started

Requires Node 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open http://localhost:5173.

| Script            | What it does                                       |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                         |
| `npm run build`   | Production build into `dist/`                      |
| `npm run preview` | Serve the production build (use this to test PWA)  |
| `npm run lint`    | ESLint                                             |

## Project structure

```
src/
  main.jsx                 Entry point, loads global CSS and the design system
  App.jsx                  Wraps the current page in the PhoneFrame
  index.css                Global reset and base background
  components/
    PhoneFrame/            Desktop phone frame and simulated iOS status bar
  pages/
    Home/                  Home · Play mode screen
  design-system/           BTG Clubhouse DS tokens, type styles and <Text>
  assets/                  Images and icons, grouped by where they're used
public/
  pwa/                     App icons for the manifest (placeholders for now)
```

## Phone frame

`PhoneFrame` decides how the app is shown using CSS only:

- **Desktop** (viewport at least 500px wide **and** a mouse or trackpad): the app sits in a 402×874 frame with 64px corners, plus a simulated status bar. On short windows the frame gets shorter rather than overflowing.
- **Phone or tablet** (touch input, or a narrow window): no frame and no fake status bar. The app fills the screen, and the device's own status bar shows over it.

Build pages to fill their container (`width: 100%; height: 100%`) so they work in both modes.

## Design system

Import from `src/design-system`. Its tokens and type styles are loaded globally in `main.jsx`.

```jsx
import { Text } from '../../design-system'

<Text variant="title-2">Round 1</Text>
<Text variant="small" color="subtle">Front nine</Text>
```

Theme and text size are set with attributes on `<html>`: `data-theme="dark|light"` (dark is the default) and `data-text-size="default|xxx-large|ax5"`. See `tokens.css` for every token.

## Testing as a PWA

A service worker only behaves like production in a production build:

```sh
npm run build
npm run preview -- --host
```

In Chrome, open DevTools → **Application** to check the manifest, the service worker and the precache. Tick **Offline** under Service workers to test offline loading.

To install on a phone you need HTTPS, so use a Netlify deploy (see below). On iPhone, open it in Safari → Share → **Add to Home Screen**. On Android, open it in Chrome → ⋮ → **Install app**.

The app updates itself: after a deploy, the new version loads on the **next** launch. If you're stuck on an old version, clear the site's data (DevTools → Application → Storage), or remove the app from the home screen and add it again.

## Deploying

The site deploys to Netlify. `netlify.toml` sets the build command, the `dist/` publish folder, Node 22, a fallback that serves `index.html` for every route, and cache headers that let service-worker updates roll out.

- **From Git:** connect the repo in Netlify (Add new site → Import from Git). Every push to `main` deploys.
- **From the CLI:** `netlify deploy` for a draft URL, then `netlify deploy --prod`.

## Known gaps

- The PWA icons in `public/pwa/` and `favicon.svg` are template placeholders.
- `course.png` is about 2.6 MB. The Workbox precache limit is raised to 4 MB in `vite.config.js` to fit it. Converting it to WebP would shrink it a lot.
- `npm run lint` reports one fast-refresh error in `src/design-system/Text.jsx`, because it exports `TEXT_VARIANTS` alongside the component.
