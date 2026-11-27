import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { supabase, friendlyError } from '../lib/supabase';
import { Logo } from './Splash.jsx';

const PROVIDERS = [
  { id: 'google', label: 'Google', icon: <FcGoogle size={24} /> },
  { id: 'apple', label: 'Apple', icon: <FaApple size={24} /> },
  { id: 'facebook', label: 'Facebook', icon: <FaFacebook size={24} color="#1877F2" /> },
  { id: 'linkedin_oidc', label: 'LinkedIn', icon: <FaLinkedin size={24} color="#0A66C2" /> },
];

export default function LoginSignup({ initialMode = 'login', onBack }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

  const update = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const switchMode = (login) => {
    setIsLogin(login);
    setError('');
    setInfo('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setBusy(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email.trim(),
          password: formData.password,
        });
        if (error) throw error;
      } else {
        if (formData.password.length < 6) throw new Error('Password must be at least 6 characters.');
        const { data, error } = await supabase.auth.signUp({
          email: formData.email.trim(),
          password: formData.password,
          options: {
            data: { full_name: formData.fullName.trim() },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        if (!data.session) setInfo('Check your email to confirm your account, then sign in.');
      }
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleForgot = async () => {
    setError('');
    setInfo('');
    if (!formData.email) return setError('Enter your email first, then tap Forgot Password.');
    const { error } = await supabase.auth.resetPasswordForEmail(formData.email.trim(), {
      redirectTo: window.location.origin,
    });
    if (error) setError(error.message);
    else setInfo('Password reset link sent. Check your email.');
  };

  const handleOAuth = async (provider) => {
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="screen auth">
      <button className="back-btn" onClick={onBack} aria-label="Back">
        <ArrowLeft size={22} />
      </button>

      <Logo size="sm" />

      <h2 className="auth-title">{isLogin ? 'Welcome Back!' : 'Join Connections'}</h2>
      <p className="auth-sub">{isLogin ? 'Sign in to continue' : 'Create your account'}</p>

      <div className="tabs" role="tablist">
        <button
          role="tab"
          aria-selected={isLogin}
          className={`tab ${isLogin ? 'active' : ''}`}
          onClick={() => switchMode(true)}
        >
          Login
        </button>
        <button
          role="tab"
          aria-selected={!isLogin}
          className={`tab ${!isLogin ? 'active' : ''}`}
          onClick={() => switchMode(false)}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form">
        {!isLogin && (
          <label className="field">
            <User size={20} />
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={update}
              autoComplete="name"
              required
            />
          </label>
        )}

        <label className="field">
          <Mail size={20} />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={update}
            autoComplete="email"
            required
          />
        </label>

        <label className="field">
          <Lock size={20} />
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formData.password}
            onChange={update}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            required
          />
          <button
            type="button"
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </label>

        {isLogin && (
          <div className="row">
            <label className="check">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span>Remember Me</span>
            </label>
            <button type="button" className="link" onClick={handleForgot}>
              Forgot Password?
            </button>
          </div>
        )}

        {error && <p className="msg error">{error}</p>}
        {info && <p className="msg info">{info}</p>}

        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Please wait…' : isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="divider">
        <span>or continue with</span>
      </div>

      <div className="social">
        {PROVIDERS.map((p) => (
          <button key={p.id} className="social-btn" onClick={() => handleOAuth(p.id)} aria-label={p.label}>
            {p.icon}
          </button>
        ))}
      </div>

      <p className="switch">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button className="link strong" onClick={() => switchMode(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  );
}
