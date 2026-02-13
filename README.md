# Smart Bookmark App

**Live Demo:** [https://smart-bookmark-app-iota.vercel.app](https://smart-bookmark-app-iota.vercel.app)

A simple, real-time bookmark manager built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Google OAuth Login**: Secure sign-up and login using Google.
- **Add Bookmarks**: Save your favorite links with a title.
- **Private List**: Bookmarks are private to each user (protected by Row Level Security).
- **Real-time Updates**: The list updates instantly across devices/tabs without refreshing.
- **Delete**: Easily remove bookmarks you no longer need.

## Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS
- **Backend**: Supabase (Auth, Database, Realtime)
- **Deployment**: Vercel

## Challenges & Solutions

### 1. Supabase Client Integration in Next.js App Router
**Problem:** I initially faced issues processing authentication callbacks and managing cookies correctly between Server Components, Client Components, and Middleware. The deprecated `@supabase/auth-helpers-nextjs` package was causing "export" errors in the build.
**Solution:** I migrated to the modern `@supabase/ssr` package. This required updating `route.ts`, `middleware.ts`, and `supabase-browser.ts` to use `createServerClient` and `createBrowserClient` with proper cookie handling methods (`getAll`, `setAll`) compatible with Next.js 15+.

### 2. Real-time Subscription Consistency
**Problem:** When adding a bookmark, the UI would sometimes duplicate the entry if the optimistic update conflicted with the real-time subscription event.
**Solution:** I verified that the real-time event listener checks if the item already exists in the state before adding it. `BookmarkList.tsx` filters incoming `INSERT` events to ensure uniqueness by ID.

### 3. Build Errors with Dashboard Layout
**Problem:** The build failed with `default export is not a React Component` in `/dashboard/layout`.
**Solution:** The file was empty. I implemented a basic layout component to satisfy the Next.js App Router requirement for `layout.tsx` files.

## Setup Instructions

1.  Clone the repo.
2.  Install dependencies: `npm install`.
3.  Set up `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4.  Run locally: `npm run dev`.
