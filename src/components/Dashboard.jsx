import { useEffect, useState } from 'react';
import {
  Users, Store, Briefcase, BarChart3, MessageSquare, CalendarDays,
  Search, LogOut, Bell, LayoutDashboard, UserRound, Sparkles,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const FEATURES = [
  { id: 'social', label: 'Social Network', icon: Users, text: 'Find and follow people, share updates.' },
  { id: 'market', label: 'Marketplace', icon: Store, text: 'Discover local businesses and services.' },
  { id: 'jobs', label: 'Jobs & Careers', icon: Briefcase, text: 'Browse and post opportunities.' },
  { id: 'biz', label: 'Business Dashboard', icon: BarChart3, text: 'Manage your listings and insights.' },
  { id: 'msg', label: 'Messages', icon: MessageSquare, text: 'Chat with your connections.' },
  { id: 'events', label: 'Events & Webinars', icon: CalendarDays, text: 'Join and host events.' },
];

const NAV = [
  { id: 'home', label: 'Home', icon: LayoutDashboard },
  { id: 'social', label: 'Network', icon: Users },
  { id: 'msg', label: 'Messages', icon: MessageSquare },
  { id: 'profile', label: 'Profile', icon: UserRound },
];

export default function Dashboard({ session }) {
  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState('home');
  const [query, setQuery] = useState('');

  const user = session.user;

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [user.id]);

  const name = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'there';
  const initial = name.trim().charAt(0).toUpperCase();
  const active = FEATURES.find((f) => f.id === tab);

  const signOut = () => supabase.auth.signOut();

  return (
    <div className="dash">
      {/* Sidebar (desktop) */}
      <aside className="dash-side">
        <img className="dash-logo" src="/logo-icon.png" alt="Connections" />
        <nav>
          {[...NAV.slice(0, 1), ...FEATURES.map((f) => ({ id: f.id, label: f.label, icon: f.icon })), NAV[3]].map(
            ({ id, label, icon: Icon }) => (
              <button key={id} className={`side-item ${tab === id ? 'on' : ''}`} onClick={() => setTab(id)}>
                <Icon size={20} /> {label}
              </button>
            )
          )}
        </nav>
        <button className="side-item out" onClick={signOut}>
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      <main className="dash-main">
        <header className="dash-top">
          <div>
            <p className="dash-hello">Welcome back,</p>
            <h2 className="dash-name">{name} 👋</h2>
          </div>
          <div className="dash-top-right">
            <button className="icon-btn" aria-label="Notifications"><Bell size={20} /></button>
            <div className="avatar" title={user.email}>{initial}</div>
          </div>
        </header>

        {tab === 'home' && (
          <>
            <label className="search">
              <Search size={18} />
              <input
                placeholder="Search people, businesses, services…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>

            <section className="stats">
              <div className="stat"><b>0</b><span>Connections</span></div>
              <div className="stat"><b>0</b><span>Messages</span></div>
              <div className="stat"><b>0</b><span>Opportunities</span></div>
            </section>

            <h3 className="dash-h">Explore</h3>
            <section className="tiles">
              {FEATURES.filter((f) => !query || f.label.toLowerCase().includes(query.toLowerCase())).map(
                ({ id, label, icon: Icon }) => (
                  <button key={id} className="tile" onClick={() => setTab(id)}>
                    <Icon size={30} />
                    <span>{label}</span>
                  </button>
                )
              )}
            </section>

            <section className="promo">
              <Sparkles size={22} />
              <div>
                <b>Complete your profile</b>
                <p>Add a photo and short bio so people and businesses can find you.</p>
              </div>
              <button className="btn btn-primary small" onClick={() => setTab('profile')}>Start</button>
            </section>
          </>
        )}

        {active && (
          <section className="panel">
            <active.icon size={40} />
            <h3>{active.label}</h3>
            <p>{active.text}</p>
            <span className="soon">Coming soon</span>
          </section>
        )}

        {tab === 'profile' && (
          <section className="panel">
            <div className="avatar big">{initial}</div>
            <h3>{name}</h3>
            <p>{user.email}</p>
            <button className="btn btn-outline small" onClick={signOut}>Sign Out</button>
          </section>
        )}
      </main>

      {/* Bottom tab bar (mobile) */}
      <nav className="dash-tabs">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button key={id} className={`tab-item ${tab === id ? 'on' : ''}`} onClick={() => setTab(id)}>
            <Icon size={22} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
