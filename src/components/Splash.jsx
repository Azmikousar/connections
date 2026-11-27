import { ArrowRight, Users, Briefcase, Store, Wrench, GraduationCap, HeartPulse, Car, Home } from 'lucide-react';

export function Logo({ size = 'lg', tagline = true }) {
  return (
    <div className={`brand brand-${size}`}>
      <img className="brand-logo" src="/logo-full.png" alt="Connections" />
      {tagline && <p className="brand-tagline">Many Worlds. One Connection.</p>}
    </div>
  );
}

const orbit = [Users, Briefcase, Store, Wrench, GraduationCap, HeartPulse, Car, Home];

export default function Splash({ onGetStarted, onSignIn }) {
  return (
    <div className="screen splash">
      <section className="splash-brand">
        <Logo size="lg" />

        <div className="splash-copy">
          <p className="splash-motto">Connect • Discover • Grow</p>
          <p className="splash-sub">People • Businesses • Services • Opportunities</p>
          <hr className="splash-rule" />
          <p className="splash-world">One connected world.</p>
        </div>

        <div className="splash-actions">
          <button className="btn btn-primary" onClick={onGetStarted}>
            Get Started <ArrowRight size={18} />
          </button>
          <button className="btn btn-outline" onClick={onSignIn}>
            Sign In
          </button>
        </div>
      </section>

      <section className="globe-wrap" aria-hidden="true">
        <div className="globe" />
        <div className="orbit">
          {orbit.map((Icon, i) => (
            <span
              key={i}
              className="orbit-dot"
              style={{ '--angle': `${(360 / orbit.length) * i}deg` }}
            >
              <span className="orbit-icon">
                <Icon size={18} />
              </span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
