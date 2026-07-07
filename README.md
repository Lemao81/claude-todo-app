# ClaudeTodoApp

A full-stack todo application with per-user todo lists, built with a .NET 10 minimal API backend, a React 19 frontend, and PostgreSQL.

## Features

- **Authentication** — cookie-based login/logout (`ClaudeTodoApp.Auth` HTTP-only cookie); user info is persisted in local storage so the session display survives page reloads
- **Multiple todo lists per user** — lists are user-scoped; the sidebar shows all lists of the signed-in user
- **Create todo lists** — a "New List" entry with plus icon in the sidebar opens a name dialog; the created list becomes the selected one
- **Delete todo lists** — a delete button next to "Add ToDo" opens a confirmation dialog; deleting a list cascades to its todos
- **Todos** — create (with optional description), toggle done (with strike-through display), delete via a per-card trash icon, and reorder via drag & drop; a "Show done" switch filters completed todos
- **Optimistic UI** — toggling, deleting, and reordering update the UI immediately and roll back if the API call fails
- **Light/dark mode** — toggle in the toolbar, persisted in local storage

## Tech Stack

### Backend (`backend/WebApi/`)

- .NET 10 minimal API (no controllers), feature-folder structure (`Features/Auth`, `Features/Todos`, `Features/Users`)
- Entity Framework Core with PostgreSQL (Npgsql), migrations included
- Cookie authentication, all todo endpoints require authorization
- Database seeding with demo users and todo lists on startup
- OpenAPI in development via `app.MapOpenApi()`

### Frontend (`frontend/`)

- React 19 with TanStack Router (file-based routing under `src/routes/`)
- MUI 9 (Material UI) components, Tailwind CSS v4 available via Vite plugin
- dnd-kit for drag & drop reordering
- React context providers for user info, todo lists, and theme (`src/components/provider/`)
- Vite, Vitest, Biome (tabs, double quotes), pnpm

## Getting Started

### Prerequisites

- .NET 10 SDK
- Node.js with pnpm
- Docker (for PostgreSQL and/or the containerized backend)

### Run with Docker

```powershell
docker compose up
```

Builds the backend image and starts it on http://localhost:8080 together with PostgreSQL 17.

### Run locally

Start PostgreSQL (e.g. only the `postgres` service from `compose.yaml`), then:

```powershell
cd backend/WebApi
dotnet run          # API on http://localhost:5000
```

```powershell
cd frontend
pnpm install
pnpm dev            # Dev server on http://localhost:3000
```

### Demo users

Seeded automatically on first run (login with username or email):

| Username | Email | Password |
|----------|-------|----------|
| admin | admin@test.com | password |
| jdoe | jdoe@test.com | password |

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/login` | Log in with username/email and password |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/todolists` | Get the current user's todo lists |
| GET | `/api/todolists/{id}` | Get a single todo list |
| POST | `/api/todolists` | Create a todo list |
| DELETE | `/api/todolists/{id}` | Delete a todo list including its todos |
| GET | `/api/todos?todoListId={id}` | Get todos (optionally filtered by list) |
| POST | `/api/todos` | Create a todo |
| PATCH | `/api/todos/{id}` | Update a todo's done state |
| PATCH | `/api/todos/reorder` | Reorder todos |
| DELETE | `/api/todos/{id}` | Delete a todo |
| GET | `/api/users/{id}` | Get a user |

Sample requests for all endpoints are in `backend/WebApi/WebApi.http`.

## Testing

```powershell
cd backend/UnitTests
dotnet test         # xUnit backend tests
```

```powershell
cd frontend
pnpm test           # Vitest frontend tests
pnpm check          # Biome lint + format check
```
