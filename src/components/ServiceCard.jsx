import { formatPrice } from '../data/clinic.js';

export default function ServiceCard({ service }) {
  return (
    <article className="card">
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <p className="card-meta">
        {service.durationMin} min &middot; {formatPrice(service.priceEgp)}
      </p>
    </article>
  );
}
