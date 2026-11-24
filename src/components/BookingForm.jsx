import { useState } from 'react';
import { validateBookingForm } from '../lib/validation.js';

export default function BookingForm({ onSubmit, error, submitting }) {
  const [values, setValues] = useState({ name: '', phone: '', notes: '' });
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateBookingForm(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="form">
      <label>
        Full name
        <input value={values.name} onChange={update('name')} autoComplete="name"
          aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'err-name' : undefined} />
        {errors.name && <span id="err-name" className="field-error">{errors.name}</span>}
      </label>
      <label>
        Mobile number
        <input value={values.phone} onChange={update('phone')} type="tel" inputMode="tel" autoComplete="tel"
          placeholder="010 1234 5678"
          aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'err-phone' : undefined} />
        {errors.phone && <span id="err-phone" className="field-error">{errors.phone}</span>}
      </label>
      <label>
        Notes (optional)
        <textarea value={values.notes} onChange={update('notes')} rows={3} />
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" className="btn" disabled={submitting}>Confirm booking</button>
    </form>
  );
}
