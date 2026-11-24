import { clinic } from '../data/clinic.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} {clinic.name}. Demo project, not a real clinic.</p>
      </div>
    </footer>
  );
}
