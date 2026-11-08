# BariLagbe: Server

Express + PostgreSQL (Neon) backend for the BariLagbe real estate platform.

**Done so far:** database schema, authentication (JWT + role check), and the public properties API.

## Tech
Node.js, Express, PostgreSQL (`pg`), JSON Web Token, dotenv, cors

## Folder structure
```
src/
  app.js, server.js
  lib/          db pool, async error wrapper, query builder
  middleWare/   verifyToken, verifyAdmin, verifyAgent
  auth/         router, controller, service
  public/
    property/   router, controller, service
schema.sql      all tables
```
Every feature folder has a `router`, a `controller` and a `service` (SQL lives in the service).

## Setup
```bash
npm install
cp .env.example .env     # fill DATABASE_URL and SECRET
# run schema.sql once in the Neon SQL Editor
npm run dev
```

## API
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/jwt` | public | issue a JWT for an email |
| POST | `/users` | public | register a user (role is always `user`) |
| GET | `/user/admin/:email` | public | `{ admin: true/false }` |
| GET | `/user/agent/:email` | public | `{ agent: true/false }` |
| GET | `/property` | public | all properties, optional `?email=` and `?verified=true/false` |
| GET | `/property/:id` | public | single property |

## Database
`users`, `properties`, `reviews`, `wishlists`, `offers`, `payments`, `temporary_products`. See `schema.sql`.
