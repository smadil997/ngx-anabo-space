# ngx-anabo-space

A lightweight, fully customizable **animated space particle background** for Angular applications.
Built with pure Canvas API — no external dependencies.

[![npm version](https://img.shields.io/npm/v/ngx-anabo-space.svg)](https://www.npmjs.com/package/ngx-anabo-space)
[![Angular](https://img.shields.io/badge/Angular-17%2B-red)](https://angular.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![SSR Safe](https://img.shields.io/badge/SSR-Safe-green)](#ssr-support)

---

## Preview

| Theme | Color |
|---|---|
| `full` | `aurora` — teal, cyan, violet, pink |
| `stars` | `electric` — pink, purple, indigo, blue |
| `stars-glow` | `nebula` — red, orange, yellow, pink |

---

## Features

- ✅ Floating stars with twinkling effect
- ✅ Connection lines between nearby stars
- ✅ Mouse interaction — stars repel from cursor
- ✅ Shooting stars at random intervals
- ✅ 10 built-in color palettes
- ✅ 6 built-in themes
- ✅ SSR / Universal safe
- ✅ Runs outside Angular zone for 60fps performance
- ✅ Zero external dependencies
- ✅ Angular 17+ standalone component

---

## Installation

```bash
npm install ngx-anabo-space
```

---

## Quick Start

### 1. Import the component

```ts
// app.component.ts
import { Component } from '@angular/core';
import { NgxAnaboSpaceComponent } from 'ngx-anabo-space';

@Component({
  standalone: true,
  imports: [NgxAnaboSpaceComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

### 2. Add to your template

```html
<!-- app.component.html -->
<ngx-anabo-space theme="full" color="classic" [speed]="4" />
```

### 3. Make it fullscreen (app.component.css)

```css
:host {
  display: block;
  width: 100vw;
  height: 100vh;
}
```

That's it! 🚀

---

## Usage with Content

Place any content inside the component — it renders **on top of the particles**:

```html
<ngx-anabo-space theme="full" color="aurora" [speed]="4">

  <div class="hero">
    <h1>Welcome to My App</h1>
    <p>Built with Angular</p>
    <button>Get Started</button>
  </div>

</ngx-anabo-space>
```

---

## API — Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `theme` | `SpaceTheme` | `'full'` | Controls which effects are active |
| `color` | `SpaceColor` | `'classic'` | Star color palette |
| `speed` | `number` | `4` | Animation speed (1–10) |
| `particleCount` | `number` | `140` | Number of stars |
| `showControls` | `boolean` | `false` | Show built-in speed/toggle overlay |

---

## Themes (`SpaceTheme`)

Controls which visual effects are active. Pass as a plain string — only one value at a time.

| Value | Stars | Lines | Glow |
|---|---|---|---|
| `'stars'` | ✅ | ❌ | ❌ |
| `'lines'` | ❌ | ✅ | ❌ |
| `'glow'` | ❌ | ❌ | ✅ |
| `'stars-lines'` | ✅ | ✅ | ❌ |
| `'stars-glow'` | ✅ | ❌ | ✅ |
| `'full'` | ✅ | ✅ | ✅ |

```html
<ngx-anabo-space theme="stars-glow" />
<ngx-anabo-space theme="full" />
<ngx-anabo-space theme="lines" />
```

---

## Colors (`SpaceColor`)

10 built-in color palettes. Pass as a plain string.

| Value | Preview Colors |
|---|---|
| `'classic'` | White, ice blue, warm gold, soft purple, mint |
| `'aurora'` | Teal, cyan, violet, pink, white |
| `'nebula'` | Red, orange, yellow, hot pink, white |
| `'galaxy'` | Lavender, violet, indigo, lilac, white |
| `'matrix'` | Neon green, lime, electric green, yellow-green |
| `'mars'` | Red, burnt orange, amber, blush, white |
| `'ocean'` | Sky blue, ocean blue, deep sea, aqua, white |
| `'blossom'` | Blush, rose, petal pink, hot pink, white |
| `'moonlight'` | Ice white, cool grey, periwinkle, slate blue |
| `'electric'` | Hot pink, deep purple, indigo, electric blue, cyan |

```html
<ngx-anabo-space color="aurora" />
<ngx-anabo-space color="electric" />
<ngx-anabo-space color="moonlight" />
```

---

## Examples

### Basic fullscreen background

```html
<ngx-anabo-space theme="full" color="classic" [speed]="4" />
```

### Hero section with content

```html
<ngx-anabo-space theme="full" color="aurora" [speed]="3">
  <div class="hero">
    <h1>Deep Space</h1>
    <p>Explore the universe</p>
  </div>
</ngx-anabo-space>
```

### Stars only — no lines or glow

```html
<ngx-anabo-space theme="stars" color="moonlight" [speed]="2" />
```

### High energy — fast electric particles

```html
<ngx-anabo-space
  theme="full"
  color="electric"
  [speed]="9"
  [particleCount]="200"
/>
```

### Slow ambient background

```html
<ngx-anabo-space
  theme="stars-glow"
  color="nebula"
  [speed]="1"
  [particleCount]="80"
/>
```

### Using TypeScript types in your component

```ts
import { Component } from '@angular/core';
import {
  NgxAnaboSpaceComponent,
  SpaceTheme,
  SpaceColor
} from 'ngx-anabo-space';

@Component({
  standalone: true,
  imports: [NgxAnaboSpaceComponent],
  template: `
    <ngx-anabo-space
      [theme]="selectedTheme"
      [color]="selectedColor"
      [speed]="4"
    />
  `
})
export class AppComponent {
  selectedTheme: SpaceTheme = 'full';
  selectedColor: SpaceColor = 'aurora';
}
```

---

## SSR Support

This library is fully **SSR (Server-Side Rendering) safe**. Canvas and animation APIs are guarded with `isPlatformBrowser()` and will not run on the server.

Works out of the box with:
- Angular Universal
- `@angular/ssr`
- `provideClientHydration()`

No extra configuration needed.

---

## TypeScript Types

All types are exported and available for use in your app:

```ts
import { SpaceTheme, SpaceColor } from 'ngx-anabo-space';

// SpaceTheme
type SpaceTheme = 'stars' | 'lines' | 'glow' | 'stars-lines' | 'stars-glow' | 'full';

// SpaceColor
type SpaceColor =
  | 'classic' | 'aurora'    | 'nebula' | 'galaxy'
  | 'matrix'  | 'mars'      | 'ocean'  | 'blossom'
  | 'moonlight'| 'electric';
```

---

## Browser Support

| Browser | Supported |
|---|---|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |
| IE 11 | ❌ |

---

## Requirements

| Package | Version |
|---|---|
| `@angular/core` | `>= 17.0.0` |
| `@angular/common` | `>= 17.0.0` |

---

## Building Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/ngx-anabo-bg.git
cd ngx-anabo-bg

# Install dependencies
npm install

# Build the library
ng build ngx-anabo-space

# Run the demo app
ng serve demo
```

---

## Publishing

```bash
# Build for production
ng build ngx-anabo-space --configuration production

# Navigate to dist
cd dist/ngx-anabo-space

# Publish to npm
npm publish
```

---

## Changelog

### 1.0.0
- Initial release
- 6 themes, 10 color palettes
- Mouse interaction
- Shooting stars
- SSR safe

---

## License

MIT © [Your Name](https://github.com/yourusername)