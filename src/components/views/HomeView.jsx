import { ArrowRight, Sparkles, Users, Building2, CalendarDays, Briefcase, MessageCircle } from 'lucide-react';
import { QUICK_ACTIONS } from '../../data/nav';

function Empty({ icon: Icon, text }) {
  return (
    <div className="d-empty">
      <Icon size={22} />
      <p>{text}</p>
    </div>
  );
}

function Block({ title, onMore, children }) {
  return (
    <section className="d-block">
      <div className="d-block-head">
        <h3>{title}</h3>
        {onMore && (
          <button className="d-link" onClick={onMore}>
            See all
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

export default function HomeView({ name, completion, workspace, go, onAction }) {
  const stats =
    workspace === 'business'
      ? [['0', 'Orders'], ['0', 'Enquiries'], ['₹0', 'Revenue']]
      : [['0', 'Connections'], ['0', 'Profile views'], ['0', 'Messages']];

  return (
    <div className="d-home">
      <section className="d-hero">
        <div>
          <p className="d-hero-sub">Welcome back,</p>
          <h2>{name} 👋</h2>
          <div className="d-progress" aria-label={`Profile ${completion}% complete`}>
            <span style={{ width: `${completion}%` }} />
          </div>
          <p className="d-hero-sub">
            Profile {completion}% complete
            {completion < 100 && (
              <>
                {' · '}
                <button className="d-link light" onClick={() => go('profile')}>
                  Finish it
                </button>
              </>
            )}
          </p>
        </div>
      </section>

      <button className="d-ai" onClick={() => go('ai')}>
        <span className="d-ai-icon"><Sparkles size={22} /></span>
        <span className="d-ai-text">
          <b>Ask Connections AI</b>
          <small>Business ideas, posts, replies and more</small>
        </span>
        <ArrowRight size={18} />
      </button>

      <section className="d-stats">
        {stats.map(([v, l]) => (
          <div className="d-stat" key={l}>
            <b>{v}</b>
            <span>{l}</span>
          </div>
        ))}
      </section>

      <Block title="Quick actions">
        <div className="d-quick">
          {QUICK_ACTIONS.map((a) => (
            <button key={a.id} className="d-quick-item" onClick={() => onAction(a)}>
              <span><a.icon size={22} /></span>
              {a.label}
            </button>
          ))}
        </div>
      </Block>

      <div className="d-cols">
        <Block title="Suggested connections" onMore={() => go('network')}>
          <Empty icon={Users} text="People you may know will appear here." />
        </Block>
        <Block title="Trending businesses" onMore={() => go('explore')}>
          <Empty icon={Building2} text="Popular businesses near you will appear here." />
        </Block>
        <Block title="Upcoming events" onMore={() => go('events')}>
          <Empty icon={CalendarDays} text="Events you may like will appear here." />
        </Block>
        <Block title="Latest opportunities" onMore={() => go('jobs')}>
          <Empty icon={Briefcase} text="Jobs and partnerships will appear here." />
        </Block>
        <Block title="Recent messages" onMore={() => go('messages')}>
          <Empty icon={MessageCircle} text="Your conversations will appear here." />
        </Block>
      </div>
    </div>
  );
}
