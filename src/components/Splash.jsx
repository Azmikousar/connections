import { Infinity as InfinityIcon, ArrowRight, Users, Briefcase, Store, Wrench, GraduationCap, HeartPulse, Car, Home } from 'lucide-react';

export function Logo({ size = 'lg' }) {
  return (
    <div className={`brand brand-${size}`}>
      <InfinityIcon className="brand-icon" strokeWidth={2.5} />
      <h1 className="brand-title">CONNECTIONS</h1>
      <p className="brand-tagline">Many Worlds. One Connection.</p>
    </div>
  );
}

const orbit = [Users, Briefcase, Store, Wrench, GraduationCap, HeartPulse, Car, Home];

export default function Splash({ onGetStarted, onSignIn }) {
  return (
    <div className="screen splash">
      <Logo size="lg" />

      <div className="globe-wrap" aria-hidden="true">
        <div className="globe" />
        {orbit.map((Icon, i) => (
          <span
            key={i}
            className="orbit-dot"
            style={{ '--angle': `${(360 / orbit.length) * i}deg` }}
          >
            <Icon size={18} />
          </span>
        ))}
      </div>

      <div className="splash-copy">
        <p className="splash-motto">Connect • Discover • Grow</p>
        <p className="splash-sub">People • Businesses • Services • Opportunities</p>
      </div>

      <div className="splash-actions">
        <button className="btn btn-primary" onClick={onGetStarted}>
          Get Started <ArrowRight size={18} />
        </button>
        <button className="btn btn-outline" onClick={onSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}
