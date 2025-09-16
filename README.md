# lightmancer

Smart light controller dashboard built with Vite + React + TypeScript, Tailwind CSS, shadcn/ui, Radix UI, and TanStack Query. It talks to a light control backend via a simple REST API and includes routines, schedules, timers, usage stats, and weather-based presets.

## Quick start

Prereqs:
- Node.js 18+ (use nvm if unsure)
- pnpm or npm (repo uses npm scripts; bun lockfile also exists, but npm is fine)

Setup:
```sh
npm install
cp .env.example .env # set your values
npm run dev
```
Dev server runs at http://localhost:8080 (hosted on all interfaces). Preview builds with `npm run preview`.

## Scripts

- `npm run dev` — Vite dev server with React Fast Refresh
- `npm run build` — Production build to `dist/`
- `npm run build:dev` — Development-mode build (useful for quick deploys with sourcemaps)
- `npm run preview` — Serve the built app locally
- `npm run lint` — ESLint (TypeScript + React hooks rules)

## Configuration

Vite env vars (prefix with VITE_ and stored in `.env`):
- `VITE_API_BASE` — Base URL of your light backend (default falls back to https://lightapi.arturferreira.dev)
- `VITE_OPENWEATHER_API_KEY` — OpenWeather API key for weather-based presets

A sample file is provided in `.env.example`.

## Architecture overview

- Vite + React + TypeScript in `src/`
- Routing: `react-router-dom` with routes defined in `src/App.tsx`
- State/data fetching: TanStack Query
- UI: Tailwind CSS + shadcn/ui components (see `src/components/ui/*`) and Radix primitives
- Theming: `ThemeProvider` with `next-themes` for dark/light
- Animations: `framer-motion`
- API layer: `src/lib/api/*` wraps the backend REST endpoints
	- Light control: `light.ts` (power, brightness, color, state)
	- Routines: `routines.ts` (CRUD + run)
	- Schedules: `schedules.ts`
	- Timers: `timers.ts`
	- Usage: `usage.ts`
	- Shared config: `utils.ts` (reads `VITE_API_BASE`)
- Weather presets: `src/lib/weather.ts` uses `VITE_OPENWEATHER_API_KEY`

Pages:
- `/` Dashboard with connection status, light controls, weather card, quick actions
- `/routines` Manage routines, timers, schedules
- `/statistics` Usage stats (daily/weekly)

## Development tips

- Component library: Most UI primitives live in `src/components/ui`. Higher-level widgets are in `src/components/`.
- Aliases: `@` points to `src/` (see `vite.config.ts`). Import like `import { api } from '@/lib/api'`.
- Styling: Tailwind classes. Extra tokens/animations in `tailwind.config.ts`. Global CSS in `src/index.css` and `src/App.css`.
- To add a new API call, extend a file in `src/lib/api/` or add a new module and export it from `src/lib/api/index.ts`.
- To add a page, create under `src/pages/` and add a `<Route>` in `src/App.tsx`.

## Backend contract (expected)

The app calls a REST API at `VITE_API_BASE` with endpoints like:
- `POST /set_power` body: `{ state: 'on' | 'off' }`
- `POST /set_brightness` body: `{ brightness: 1..100 }`
- `POST /set_color` body: `{ red, green, blue }`
- `GET /get_state` returns `{ response: { result: [power, brightness, rgbInt] } }`
- Routines/Timers/Schedules/Usage under `/routines`, `/timers`, `/schedules`, `/usage/*`

If you don't have a backend yet, set `VITE_API_BASE` to a mock server and adapt the API helpers.

## Project structure

```
src/
	components/        # feature components (LightControl, WeatherCard, ...)
		ui/              # shadcn/ui primitives
		nav/             # nav elements
	hooks/             # custom hooks
	lib/
		api/             # backend API wrappers
		utils.ts         # UI/util helpers
		weather.ts       # weather fetch + color presets
	pages/             # route components
	main.tsx           # app bootstrap
	App.tsx            # routes + providers
```

## Linting and formatting

ESLint config is in `eslint.config.js` (TypeScript + React rules). Run `npm run lint`.

## Deployment

### Docker Deployment

The app can be deployed as a Docker container:

#### Quick Start with Docker

```sh
# Build the application locally first
npm run build

# Build and run the Docker container
docker build -t lightmancer .
docker run -p 3000:80 lightmancer
```

The app will be available at http://localhost:3000

#### Using Docker Compose

```sh
# Build the application first
npm run build

# Start with docker-compose
docker-compose up -d
```

#### Backend Configuration

The backend API endpoint is configured at build time via environment variables:
- Default: `https://lightmancerbackend.arturs.software`
- Alternative: `https://lightmancerbackend.artur.engineer`

To use a custom backend, set the environment variable before building:
```sh
export VITE_API_BASE=https://your-backend-domain.com
npm run build
docker build -t lightmancer .
```

#### Production Deployment

For production deployment:

1. **Build the application with production config:**
   ```sh
   cp .env.example .env
   # Edit .env with your production values
   npm run build
   ```

2. **Build and deploy the container:**
   ```sh
   docker build -t lightmancer:prod .
   docker run -d -p 80:80 --restart unless-stopped lightmancer:prod
   ```

3. **Or use docker-compose for easier management:**
   ```sh
   docker-compose up -d
   ```

### Static Hosting (Alternative)

- Static hosting (Netlify/Vercel/GitHub Pages): run `npm run build` and deploy `dist/`.
- Ensure your environment vars are set on the host (Vercel/Netlify project settings). For static hosting, any secrets must be consumed at build-time only.

## Troubleshooting

- 404s in API calls: verify `VITE_API_BASE` points to your backend and that CORS is allowed.
- Weather shows fallback: ensure `VITE_OPENWEATHER_API_KEY` is set and not rate-limited.
- Styles look off: check that Tailwind is scanning `./src/**/*.{ts,tsx}` and that classes aren't purged.
- Port in use: change `server.port` in `vite.config.ts`.

---

Happy hacking! If you're “vibecoding,” the sections above should be enough to run, edit, and extend the app safely.
