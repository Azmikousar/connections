import { useCallback, useEffect, useState } from 'react';
import {
  Menu, Bell, Search, X, ChevronDown, Plus, Home as HomeIcon, Compass, MessageCircle,
  UserRound, LogOut, Check, User, Building2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { NAV, GROUPS, LIVE, CREATE_ACTIONS, byId } from '../data/nav';
import HomeView from './views/HomeView.jsx';
import ExploreView from './views/ExploreView.jsx';
import ProfileView from './views/ProfileView.jsx';
import Placeholder from './views/Placeholder.jsx';
import '../dashboard.css';

const TABS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'create', label: 'Create', icon: Plus },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'profile', label: 'Profile', icon: UserRound },
];

export default function Dashboard({ session }) {
  const user = session.user;
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState('home');
  const [workspace, setWorkspace] = useState('personal');
  const [wsOpen, setWsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [toast, setToast] = useState('');

  const loadProfile = useCallback(() => {
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => setProfile(data))
      .catch(() => {});
  }, [user.id]);

  useEffect(loadProfile, [loadProfile]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const name = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'there';
  const completion = 40 + (name && name !== user.email?.split('@')[0] ? 30 : 0) + (profile?.bio ? 30 : 0);

  const go = (id) => {
    setView(id === 'settings' ? 'profile' : id);
    setMenuOpen(false);
    setCreateOpen(false);
    window.scrollTo({ top: 0 });
  };

  const onAction = (a) => {
    setCreateOpen(false);
    if (a.to) return go(a.to);
    setToast(`${a.label} is coming in Phase ${a.phase}`);
  };

  const onSoon = (label) => setToast(`${label} is coming soon`);

  const activeId = view === 'profile' ? 'settings' : view;

  let screen;
  if (view === 'home') screen = <HomeView name={name} completion={completion} workspace={workspace} go={go} onAction={onAction} />;
  else if (view === 'explore') screen = <ExploreView onAction={onAction} />;
  else if (view === 'profile')
    screen = <ProfileView user={user} profile={profile} name={name} completion={completion} onSaved={loadProfile} onSoon={onSoon} />;
  else screen = <Placeholder section={byId[view]} go={go} />;

  const sideNav = (
    <nav className="d-nav" aria-label="Main">
      {GROUPS.map((g) => (
        <div key={g} className="d-group">
          <p>{g}</p>
          {NAV.filter((n) => n.group === g).map(({ id, label, icon: Icon }) => (
            <button key={id} className={`d-item ${activeId === id ? 'on' : ''}`} onClick={() => go(id)}>
              <Icon size={19} />
              <span>{label}</span>
              {!LIVE.has(id) && <em>Soon</em>}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );

  return (
    <div className="d-app">
      {/* Desktop sidebar */}
      <aside className="d-side">
        <img className="d-logo" src="/logo-full.png" alt="Connections" />
        {sideNav}
        <button className="d-item out" onClick={() => supabase.auth.signOut()}>
          <LogOut size={19} /> <span>Sign out</span>
        </button>
      </aside>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="d-overlay" onClick={() => setMenuOpen(false)}>
          <aside className="d-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="d-drawer-head">
              <img src="/logo-icon.png" alt="Connections" />
              <button className="d-icon" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={20} /></button>
            </div>
            {sideNav}
          </aside>
        </div>
      )}

      <div className="d-body">
        <header className="d-top">
          <button className="d-icon d-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={20} /></button>

          <div className="d-ws">
            <button className="d-ws-btn" onClick={() => setWsOpen(!wsOpen)}>
              {workspace === 'personal' ? <User size={16} /> : <Building2 size={16} />}
              {workspace === 'personal' ? 'Personal' : 'My Business'}
              <ChevronDown size={16} />
            </button>
            {wsOpen && (
              <div className="d-ws-menu">
                {[['personal', 'Personal', User], ['business', 'My Business', Building2]].map(([id, label, Icon]) => (
                  <button key={id} onClick={() => { setWorkspace(id); setWsOpen(false); }}>
                    <Icon size={16} /> {label} {workspace === id && <Check size={16} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <label className="d-top-search">
            <Search size={17} />
            <input placeholder="Search people, businesses, services…" onFocus={() => go('explore')} />
          </label>

          <div className="d-top-right">
            <button className="d-icon" onClick={() => go('notifications')} aria-label="Notifications"><Bell size={20} /></button>
            <button className="avatar" onClick={() => go('profile')} aria-label="Profile">{name.trim().charAt(0).toUpperCase()}</button>
          </div>
        </header>

        <main className="d-main">{screen}</main>
      </div>

      {/* Mobile bottom tabs */}
      <nav className="d-tabs" aria-label="Primary">
        {TABS.map(({ id, label, icon: Icon }) =>
          id === 'create' ? (
            <button key={id} className="d-create" onClick={() => setCreateOpen(true)} aria-label="Create">
              <Icon size={26} />
            </button>
          ) : (
            <button key={id} className={`d-tab ${view === id ? 'on' : ''}`} onClick={() => go(id)}>
              <Icon size={22} />
              <span>{label}</span>
            </button>
          )
        )}
      </nav>

      {/* Create sheet */}
      {createOpen && (
        <div className="d-overlay center" onClick={() => setCreateOpen(false)}>
          <div className="d-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="d-sheet-head">
              <h3>Create</h3>
              <button className="d-icon" onClick={() => setCreateOpen(false)} aria-label="Close"><X size={20} /></button>
            </div>
            <div className="d-sheet-grid">
              {CREATE_ACTIONS.map((a) => (
                <button key={a.id} onClick={() => onAction(a)}>
                  <span><a.icon size={22} /></span>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && <div className="d-toast" role="status">{toast}</div>}
    </div>
  );
}
