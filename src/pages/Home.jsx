import { Link } from 'react-router-dom';
import { clinic, services, workingHours } from '../data/clinic.js';
import ServiceCard from '../components/ServiceCard.jsx';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>A healthier smile starts with an easy booking.</h1>
          <p className="lead">{clinic.tagline} Pick a service, choose a time, done in under a minute.</p>
          <Link to="/book" className="btn">Book an appointment</Link>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <h2>Our services</h2>
          <div className="grid">
            {services.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="visit">
        <div className="container two-col">
          <div>
            <h2>Working hours</h2>
            <dl className="hours">
              {workingHours.map((h) => (
                <div key={h.label}>
                  <dt>{h.label}</dt>
                  <dd>{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2>Find us</h2>
            <address>
              {clinic.address}<br />
              <a href={`tel:${clinic.phone.replace(/\s/g, '')}`}>{clinic.phone}</a><br />
              <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
            </address>
            <a className="btn btn-outline" href={clinic.mapsUrl} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready when you are.</h2>
          <Link to="/book" className="btn">Book an appointment</Link>
        </div>
      </section>
    </>
  );
}
