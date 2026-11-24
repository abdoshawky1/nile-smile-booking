import { useMemo, useState } from 'react';
import { services } from '../data/clinic.js';
import { useBookings } from '../hooks/useBookings.js';
import { cancelBooking } from '../lib/storage.js';
import { formatLongDate, formatMinutes } from '../lib/dates.js';

const serviceName = (id) => services.find((s) => s.id === id)?.name ?? id;

// No real login: this is a demo, and localStorage data is not secret anyway.
// A production version would sit behind authentication and a server API.
export default function Admin() {
  const [bookings, refresh] = useBookings();
  const [showCancelled, setShowCancelled] = useState(false);

  const rows = useMemo(
    () => bookings
      .filter((b) => showCancelled || b.status !== 'cancelled')
      .sort((a, b) => a.date.localeCompare(b.date) || a.startMin - b.startMin),
    [bookings, showCancelled]
  );

  function handleCancel(b) {
    if (!window.confirm(`Cancel ${b.name}'s booking on ${formatLongDate(b.date)}?`)) return;
    cancelBooking(b.reference);
    refresh();
  }

  return (
    <section className="section">
      <div className="container">
        <h1>Bookings</h1>
        <label className="check">
          <input type="checkbox" checked={showCancelled} onChange={(e) => setShowCancelled(e.target.checked)} />
          Show cancelled
        </label>

        {rows.length === 0 ? (
          <p className="muted">No bookings yet.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th><th>Time</th><th>Patient</th><th>Phone</th><th>Service</th><th>Status</th><th />
                </tr>
              </thead>
              <tbody>
                {rows.map((b) => (
                  <tr key={b.reference} className={b.status === 'cancelled' ? 'is-cancelled' : ''}>
                    <td data-label="Date">{formatLongDate(b.date)}</td>
                    <td data-label="Time">{formatMinutes(b.startMin)}</td>
                    <td data-label="Patient"><div>{b.name}<br /><small className="muted">{b.reference}</small></div></td>
                    <td data-label="Phone">{b.phone}</td>
                    <td data-label="Service">{serviceName(b.serviceId)}</td>
                    <td data-label="Status">{b.status}</td>
                    <td>
                      {b.status !== 'cancelled' && (
                        <button type="button" className="btn btn-small btn-outline" onClick={() => handleCancel(b)}>Cancel</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
