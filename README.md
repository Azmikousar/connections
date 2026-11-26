# Connections

**Many Worlds. One Connection.**

React + Vite + Supabase (auth & database), deployed on Vercel.

## What's included
- Splash screen (Get Started / Sign In)
- Login / Sign Up with email + password, show/hide password, Remember Me, Forgot Password
- Social login buttons: Google, Apple, Facebook, LinkedIn (via Supabase OAuth)
- Session handling + a simple signed-in Home screen
- `supabase/schema.sql` – `profiles` table, security rules, auto-create-profile trigger

## Setup

### 1. Put the code in your GitHub repo
Copy these files into your repository (replace what's there), then commit and push:

```bash
git add .
git commit -m "Add Connections auth app"
git push
```

### 2. Supabase
1. Open **SQL Editor** → paste `supabase/schema.sql` → **Run**.
2. **Authentication → URL Configuration**: set *Site URL* to your Vercel URL and add it (plus `http://localhost:5173`) under *Redirect URLs*.
3. **Authentication → Providers**: enable Email (and Google / Apple / Facebook / LinkedIn when you have their keys).

### 3. Environment variables
Locally: copy `.env.example` to `.env` and fill in the values from Supabase → Project Settings → API.

On Vercel: Project → Settings → Environment Variables → add
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then redeploy.

> Use only the **anon / public** key in the frontend. Never put the `service_role` key here.

### 4. Run locally
```bash
npm install
npm run dev
```

## Next steps
Profiles editing, search/discover, business & service listings, messaging.
