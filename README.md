# bt-proto

A mobile web prototype for BTG, built as an installable PWA. On a phone it runs full-screen. On a desktop it renders inside an iPhone-sized frame so you can review it at real phone dimensions.

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

## Deploying

The site deploys to Netlify. `netlify.toml` sets the build command, the `dist/` publish folder, Node 22, a fallback that serves `index.html` for every route, and cache headers that let service-worker updates roll out.

- **From Git:** connect the repo in Netlify (Add new site → Import from Git). Every push to `main` deploys.
- **From the CLI:** `netlify deploy` for a draft URL, then `netlify deploy --prod`.

