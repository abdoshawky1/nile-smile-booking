import { Link, NavLink } from 'react-router-dom';
import { clinic } from '../data/clinic.js';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">+</span>
          {clinic.name}
        </Link>
        <nav aria-label="Main">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <Link to="/book" className="btn btn-small">Book now</Link>
        </nav>
      </div>
    </header>
  );
}
