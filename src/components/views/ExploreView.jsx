import { useState } from 'react';
import { Search, ShieldCheck, MapPin, Star, Plus } from 'lucide-react';
import { CATEGORIES, DISCOVER_TYPES } from '../../data/nav';

export default function ExploreView({ onAction }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('businesses');
  const [category, setCategory] = useState('');
  const [filters, setFilters] = useState({ verified: false, nearby: false, top: false });

  const toggle = (k) => setFilters((f) => ({ ...f, [k]: !f[k] }));
  const typeLabel = DISCOVER_TYPES.find((t) => t.id === type)?.label.toLowerCase();

  return (
    <div className="d-explore">
      <h2 className="d-title">Explore</h2>
      <p className="d-sub">Discover people, businesses, products, services and opportunities.</p>

      <label className="d-search">
        <Search size={18} />
        <input
          placeholder="Search by keyword, category or location…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <div className="d-types">
        {DISCOVER_TYPES.map(({ id, label, icon: Icon }) => (
          <button key={id} className={`d-type ${type === id ? 'on' : ''}`} onClick={() => setType(id)}>
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>

      <h3 className="d-h">Categories</h3>
      <div className="d-chips">
        {CATEGORIES.map((c) => (
          <button key={c} className={`d-chip ${category === c ? 'on' : ''}`} onClick={() => setCategory(category === c ? '' : c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="d-filters">
        <button className={`d-chip ${filters.verified ? 'on' : ''}`} onClick={() => toggle('verified')}>
          <ShieldCheck size={15} /> Verified
        </button>
        <button className={`d-chip ${filters.nearby ? 'on' : ''}`} onClick={() => toggle('nearby')}>
          <MapPin size={15} /> Nearby
        </button>
        <button className={`d-chip ${filters.top ? 'on' : ''}`} onClick={() => toggle('top')}>
          <Star size={15} /> Top rated
        </button>
      </div>

      <div className="d-results">
        <p>
          No {typeLabel}
          {category ? ` in ${category}` : ''}
          {query ? ` matching “${query}”` : ''} yet.
        </p>
        <small>Listings will appear here as people join. Be one of the first.</small>
        <button className="btn btn-primary d-cta" onClick={() => onAction({ id: 'business', label: 'Create business', phase: 1 })}>
          <Plus size={18} /> List your business
        </button>
      </div>
    </div>
  );
}
