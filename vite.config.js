import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Also expose Vercel's Supabase-integration variables (NEXT_PUBLIC_*). These are public by design.
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
});
