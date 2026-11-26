import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Splash from './components/Splash.jsx';
import LoginSignup from './components/LoginSignup.jsx';
import Home from './components/Home.jsx';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState('splash'); // 'splash' | 'auth'
  const [initialMode, setInitialMode] = useState('login');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) return <div className="center-screen">Loading…</div>;
  if (session) return <Home session={session} />;

  if (screen === 'splash') {
    return (
      <Splash
        onGetStarted={() => {
          setInitialMode('signup');
          setScreen('auth');
        }}
        onSignIn={() => {
          setInitialMode('login');
          setScreen('auth');
        }}
      />
    );
  }

  return <LoginSignup initialMode={initialMode} onBack={() => setScreen('splash')} />;
}
