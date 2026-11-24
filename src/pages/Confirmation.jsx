import { Link, useParams } from 'react-router-dom';
import { clinic, services, formatPrice } from '../data/clinic.js';
import { findBooking } from '../lib/storage.js';
import { formatLongDate, formatMinutes } from '../lib/dates.js';

export default function Confirmation() {
  const { reference } = useParams();
  const booking = findBooking(reference);

  // The reference comes from the URL, so it may be mistyped or from another browser.
  if (!booking) {
    return (
      <section className="section">
        <div className="container booking">
          <h1>Booking not found</h1>
          <p className="muted">
            We could not find a booking with reference {reference} on this device.
            Bookings are stored in your browser in this demo.
          </p>
          <Link to="/book" className="btn">Make a booking</Link>
        </div>
      </section>
    );
  }

  const service = services.find((s) => s.id === booking.serviceId);
  const cancelled = booking.status === 'cancelled';

  return (
    <section className="section">
      <div className="container booking">
        <h1>{cancelled ? 'Booking cancelled' : 'You are booked in'}</h1>
        <p className="reference">Reference: <strong>{booking.reference}</strong></p>
        <dl className="details">
          <div><dt>Service</dt><dd>{service.name} ({formatPrice(service.priceEgp)})</dd></div>
          <div><dt>Date</dt><dd>{formatLongDate(booking.date)}</dd></div>
          <div><dt>Time</dt><dd>{formatMinutes(booking.startMin)} to {formatMinutes(booking.startMin + booking.durationMin)}</dd></div>
          <div><dt>Name</dt><dd>{booking.name}</dd></div>
          <div><dt>Phone</dt><dd>{booking.phone}</dd></div>
          <div><dt>Where</dt><dd>{clinic.address}</dd></div>
        </dl>
        <p className="muted">Need to change something? Call {clinic.phone} and quote your reference.</p>
        <Link to="/" className="btn btn-outline">Back to home</Link>
      </div>
    </section>
  );
}
