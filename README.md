# Next.js + tRPC + Better Auth + Drizzle + Neon (Walkthrough)

A full-stack starter template with Better Auth for authentication, Drizzle ORM for database access, and Neon serverless Postgres.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **tRPC** - End-to-end type-safe APIs
- **Better Auth** - Modern authentication library
- **Drizzle ORM** - Lightweight, type-safe ORM
- **Neon** - Serverless Postgres
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library

## Getting Started

### Prerequisites

- Node.js 20+
- Neon account (https://console.neon.tech)
- GitHub OAuth app (https://github.com/settings/developers)
- Google OAuth credentials (https://console.cloud.google.com)

### Setup

1. Clone the repository:
```bash
git clone <repo-url>
cd nextjs-trpc-betterauth-drizzle-neon-tanstack
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Configure `.env.local`:
   - Add your Neon database URL
   - Generate a secret: `openssl rand -base64 32`
   - Add OAuth credentials

5. Push database schema:
```bash
npx drizzle-kit push
```

6. Start development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/
│   │   ├── auth/          # Better Auth API route
│   │   └── trpc/          # tRPC API route
│   ├── home/              # Protected home page
│   ├── login/             # Login page
│   └── page.tsx           # Landing page
├── components/
│   ├── auth/              # Auth components (login, signout buttons)
│   └── ui/                # shadcn/ui components
├── db/                    # Drizzle configuration
│   ├── index.ts          # Database connection
│   └── schema.ts         # Drizzle schema
├── lib/                   # Utilities
│   ├── auth.ts           # Better Auth server config
│   ├── auth-client.ts    # Better Auth client
│   └── utils.ts          # Helper functions
├── providers/             # React context providers
└── trpc/                  # tRPC configuration
    ├── client/           # Client-side tRPC
    └── server/           # Server-side tRPC + routers
```

## Key Features

- **Type-safe from database to frontend** - Drizzle generates types that flow through tRPC to React
- **OAuth authentication** - GitHub and Google sign-in with Better Auth
- **Protected routes** - Server-side auth checks with redirects
- **Modern React patterns** - Server Components + Client Components hybrid

## Drizzle Commands

```bash
# Push schema changes to database
npx drizzle-kit push

# Generate migration files
npx drizzle-kit generate

# Open Drizzle Studio (database GUI)
npx drizzle-kit studio
```

## Learn More

This is a walkthrough starting point. Each commit in the git history represents a step in building this stack. Review the commits to understand how each piece fits together.

## License

MIT
