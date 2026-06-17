# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ClaudeTodoApp is a full-stack Todo application with a .NET 10 minimal API backend and a React 19 + TanStack Router frontend.

## Commands

### Backend (`backend/WebApi/`)

```powershell
dotnet run          # Start API server (http://localhost:5000)
dotnet build        # Build
dotnet test         # Run tests
```

### Frontend (`frontend/`)

```powershell
pnpm install        # Install dependencies
pnpm dev            # Dev server on http://localhost:3000
pnpm build          # Production build
pnpm test           # Run Vitest tests
pnpm check          # Biome lint + format check (run before committing)
pnpm lint           # Lint only
pnpm format         # Format check only
pnpm format-write   # Format check + apply fixes
```

### Docker

```powershell
docker compose up   # Build and run the backend container
```

## Architecture

### Backend

- Minimal API style (`Program.cs`) — no controllers
- Target: .NET 10, nullable enabled, implicit usings enabled
- OpenAPI auto-configured in development via `app.MapOpenApi()`
- Currently scaffolded with a placeholder `/weatherforecast` endpoint; replace with todo endpoints

### Frontend

- **Router**: TanStack Router with file-based routing. Add a file under `src/routes/` and the route is created automatically. `src/routeTree.gen.ts` is auto-generated — never edit it.
- **Root layout**: `src/routes/__root.tsx` — wraps all routes; TanStack devtools panel is mounted here
- **Styling**: Tailwind CSS v4 (configured via Vite plugin, no `tailwind.config.js`)
- **Import alias**: Both `#/*` and `@/*` resolve to `./src/*`
- **Linting/Formatting**: Biome (not ESLint/Prettier) — tabs, double quotes; `src/routeTree.gen.ts` and `src/styles.css` are excluded from Biome
- **Package manager**: pnpm

### File-based routing conventions

| File | Route |
|------|-------|
| `src/routes/__root.tsx` | Root layout (no URL) |
| `src/routes/index.tsx` | `/` |
| `src/routes/about.tsx` | `/about` |
| `src/routes/todos/$id.tsx` | `/todos/:id` |

Use `Link` from `@tanstack/react-router` for client-side navigation. Use `Route.useLoaderData()` to access data loaded by a route's `loader`.

## Code Style
- General:
  - insert new line before return keyword if not first line of block
  - put single line statements in curly braces to separate line
  - never add comments
- C#:
  - Tests:
    - Arrange, Act, Assert pattern (comment each section in method)

## Workflows

### Creating/Modifying API endpoints

When creating or modifying API endpoints:

1. Add/update endpoint in the .http file, use a sample payload for POST/PUT/PATCH method