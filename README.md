# Downbot

Downbot is a focused authentication app for an AI workspace. It includes a React/Vite client and an Express/MongoDB API, with login, registration, refresh-token rotation, logout, and current-user endpoints.

## Requirements

- Node.js 20+
- MongoDB

## Run locally

1. Copy `backend/.env.example` to `backend/.env` and set both JWT secrets to different, long random values.
2. From the project root, install dependencies and start both the API and client:

   ```powershell
   npm install
   npm run dev
   ```

The Vite development server proxies `/api` to `http://localhost:5000` in [frontend/vite.config.js](./frontend/vite.config.js). CORS is not configured.

Run `npm run lint` from the project root to lint both workspaces.

## Authentication API

All routes use the `/api/v1` prefix. Responses follow the same envelope:

```json
{ "success": true, "message": "Login successful", "data": {} }
```

```json
{ "success": false, "message": "Validation failed", "errors": [{ "field": "email", "message": "Enter a valid email address" }] }
```

| Method | Route | Request | Success `data` |
| --- | --- | --- | --- |
| `POST` | `/api/v1/auth/register` | `{"name":"Sam Lee","email":"sam@example.com","password":"example123"}` | `{"accessToken":"…","user":{"id":"…","name":"Sam Lee","email":"sam@example.com"}}` |
| `POST` | `/api/v1/auth/login` | `{"email":"sam@example.com","password":"example123"}` | `{"accessToken":"…","user":{"id":"…","name":"Sam Lee","email":"sam@example.com"}}` |
| `POST` | `/api/v1/auth/refresh` | Refresh cookie is sent automatically | Rotated access token and user |
| `POST` | `/api/v1/auth/logout` | Refresh cookie is sent automatically | `{}` |
| `GET` | `/api/v1/auth/me` | `Authorization: Bearer <access-token>` | `{"user":{"id":"…","name":"Sam Lee","email":"sam@example.com"}}` |

The refresh token is stored in an HTTP-only, seven-day cookie. The access token is held in the Redux auth state and is not persisted in browser storage.

## Client architecture

The `frontend/src/features/auth` feature is separated into `hooks`, `UI`, `state`, and `API` layers. Routes are declared as data and rendered dynamically in `frontend/src/App.jsx`. Tailwind CSS provides styling.
