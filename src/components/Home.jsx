import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Logo } from './Splash.jsx';

export default function Home({ session }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [session.user.id]);

  const name = profile?.full_name || session.user.user_metadata?.full_name || session.user.email;

  return (
    <div className="screen home">
      <Logo size="sm" />
      <h2 className="auth-title">Hello, {name} 👋</h2>
      <p className="auth-sub">You're signed in. Build your feed, search and profiles here next.</p>
      <button className="btn btn-outline" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  );
}
