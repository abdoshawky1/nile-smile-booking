import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { services, formatPrice } from '../data/clinic.js';
import { getSlotsForDay } from '../lib/slots.js';
import { formatLongDate, formatMinutes } from '../lib/dates.js';
import { useBookings } from '../hooks/useBookings.js';
import { saveBooking, SlotTakenError } from '../lib/storage.js';
import { normalizeEgyptianPhone } from '../lib/validation.js';
import { generateReference } from '../lib/reference.js';
import BookingForm from '../components/BookingForm.jsx';
import Calendar from '../components/Calendar.jsx';
import SlotPicker from '../components/SlotPicker.jsx';

export default function Booking() {
  // Home page links can preselect a service with /book?service=cleaning
  const [params] = useSearchParams();
  const [serviceId, setServiceId] = useState(
    services.some((s) => s.id === params.get('service')) ? params.get('service') : services[0].id
  );
  const [date, setDate] = useState(null);
  const [startMin, setStartMin] = useState(null);
  const [bookings, refreshBookings] = useBookings();
  const [saveError, setSaveError] = useState('');
  const navigate = useNavigate();

  const service = services.find((s) => s.id === serviceId);
  const activeBookings = useMemo(() => bookings.filter((b) => b.status !== 'cancelled'), [bookings]);
  const slots = useMemo(
    () => (date ? getSlotsForDay(date, service.durationMin, activeBookings) : []),
    [date, service, activeBookings]
  );

  // Changing service changes slot lengths, so a previously picked time may no longer fit.
  function chooseService(id) {
    setServiceId(id);
    setStartMin(null);
  }
  function chooseDate(key) {
    setDate(key);
    setStartMin(null);
  }

  function handleSubmit({ name, phone, notes }) {
    const booking = {
      reference: generateReference(),
      serviceId: service.id,
      date,
      startMin,
      durationMin: service.durationMin,
      name: name.trim(),
      phone: normalizeEgyptianPhone(phone),
      notes: notes.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    try {
      saveBooking(booking);
      navigate(`/confirmation/${booking.reference}`);
    } catch (err) {
      if (!(err instanceof SlotTakenError)) throw err;
      setSaveError(err.message);
      setStartMin(null); // force a fresh choice from the updated slot list
      refreshBookings();
    }
  }

  return (
    <section className="section">
      <div className="container booking">
        <h1>Book an appointment</h1>

        <div className="step">
          <h2>1. Choose a service</h2>
          <select value={serviceId} onChange={(e) => chooseService(e.target.value)} aria-label="Service">
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.durationMin} min, {formatPrice(s.priceEgp)})
              </option>
            ))}
          </select>
        </div>

        <div className="step">
          <h2>2. Pick a date</h2>
          <Calendar selected={date} onSelect={chooseDate} />
        </div>

        {date && (
          <div className="step">
            <h2>3. Pick a time</h2>
            <p className="muted">{formatLongDate(date)}</p>
            <SlotPicker slots={slots} selected={startMin} onSelect={setStartMin} />
          </div>
        )}

        {date && startMin !== null && (
          <div className="step">
            <p className="summary">
              {service.name} on {formatLongDate(date)} at {formatMinutes(startMin)}
            </p>
            <h2>4. Your details</h2>
            <BookingForm onSubmit={handleSubmit} error={saveError} />
          </div>
        )}
        {saveError && startMin === null && <p className="form-error" role="alert">{saveError}</p>}
      </div>
    </section>
  );
}
