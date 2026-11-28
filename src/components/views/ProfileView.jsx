import { useEffect, useState } from 'react';
import { LogOut, ShieldCheck, Lock, Bell, Eye, Download, Trash2, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ROWS = [
  { icon: Lock, label: 'Change password & two-factor' },
  { icon: Eye, label: 'Privacy controls' },
  { icon: Bell, label: 'Notification preferences' },
  { icon: ShieldCheck, label: 'Login history & devices' },
  { icon: Download, label: 'Download my data' },
  { icon: Trash2, label: 'Deactivate or delete account' },
];

export default function ProfileView({ user, profile, name, completion, onSaved, onSoon }) {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    setFullName(profile?.full_name || user.user_metadata?.full_name || '');
    setBio(profile?.bio || '');
  }, [profile, user]);

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg({ type: '', text: '' });
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, full_name: fullName.trim(), bio: bio.trim() });
    setBusy(false);
    if (error) {
      setMsg({
        type: 'error',
        text: /relation .* does not exist|schema cache/i.test(error.message)
          ? 'The profiles table is missing. Run supabase/schema.sql in the Supabase SQL Editor.'
          : error.message,
      });
    } else {
      setMsg({ type: 'info', text: 'Profile saved.' });
      onSaved();
    }
  };

  return (
    <div className="d-profile">
      <section className="d-pcard">
        <div className="avatar big">{name.trim().charAt(0).toUpperCase()}</div>
        <h2>{name}</h2>
        <p className="d-sub">{user.email}</p>
        <div className="d-roles">
          <span className="d-badge">Personal</span>
        </div>
        <div className="d-progress dark"><span style={{ width: `${completion}%` }} /></div>
        <small>Profile {completion}% complete</small>
      </section>

      <form className="d-pform" onSubmit={save}>
        <h3>Edit profile</h3>
        <label className="d-field">
          <span>Full name</span>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" required />
        </label>
        <label className="d-field">
          <span>Bio</span>
          <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell people what you do…" maxLength={300} />
        </label>
        {msg.text && <p className={`msg ${msg.type}`}>{msg.text}</p>}
        <button className="btn btn-primary" disabled={busy}>
          {busy ? 'Saving…' : 'Save changes'}
        </button>
      </form>

      <section className="d-rows">
        <h3>Account & privacy</h3>
        {ROWS.map(({ icon: Icon, label }) => (
          <button key={label} className="d-row" onClick={() => onSoon(label)}>
            <Icon size={20} />
            <span>{label}</span>
            <ChevronRight size={18} />
          </button>
        ))}
        <button className="d-row out" onClick={() => supabase.auth.signOut()}>
          <LogOut size={20} />
          <span>Sign out</span>
        </button>
      </section>
    </div>
  );
}
