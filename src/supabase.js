import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isConfigured =
  Boolean(url && anonKey) && /^https:\/\/.+\.supabase\.co\/?$/.test(url) && !url.includes('YOUR-PROJECT');

if (!isConfigured) {
  console.warn(
    'Supabase is not configured. Set VITE_SUPABASE_URL (https://xxxx.supabase.co) and VITE_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables, then redeploy.'
  );
}

export const supabase = createClient(
  isConfigured ? url : 'https://placeholder.supabase.co',
  isConfigured ? anonKey : 'placeholder-key',
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);

// Turn raw network errors into something a person can act on
export function friendlyError(err) {
  const m = (err && err.message) || '';
  if (!isConfigured)
    return 'App is not connected to Supabase yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel, then redeploy.';
  if (/load failed|failed to fetch|networkerror/i.test(m))
    return 'Cannot reach the server. Check your internet, and make sure the Supabase URL in Vercel is correct.';
  if (/invalid login credentials/i.test(m)) return 'Wrong email or password.';
  if (/email not confirmed/i.test(m)) return 'Please confirm your email first (check your inbox), then sign in.';
  return m || 'Something went wrong. Please try again.';
}
