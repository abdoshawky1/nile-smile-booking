import { fromDateKey } from './dates.js';

// Clinic schedule. Times are minutes since midnight.
export const OPEN_MIN = 10 * 60;
export const CLOSE_MIN = 20 * 60;
export const SLOT_STEP_MIN = 30;
export const CLOSED_WEEKDAYS = [5]; // Friday (Date#getDay)
export const MAX_DAYS_AHEAD = 60;

export function isClosedDay(dateKey) {
  return CLOSED_WEEKDAYS.includes(fromDateKey(dateKey).getDay());
}

// Two bookings clash when their time ranges overlap.
// Back-to-back (one ends exactly when the next starts) is fine.
function overlaps(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

/**
 * All start times for a day, each flagged available or not.
 * A slot is unavailable if the treatment would run past closing,
 * overlap an existing booking, or the time has already passed today.
 *
 * @param {string} dateKey  'YYYY-MM-DD'
 * @param {number} durationMin  length of the chosen service
 * @param {Array<{date, startMin, durationMin}>} bookings  existing bookings
 * @param {Date} [now]  injectable so tests do not depend on the clock
 */
export function getSlotsForDay(dateKey, durationMin, bookings, now = new Date()) {
  if (isClosedDay(dateKey)) return [];

  const dayBookings = bookings.filter((b) => b.date === dateKey);
  const isToday = dateKey === `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const slots = [];
  for (let start = OPEN_MIN; start + durationMin <= CLOSE_MIN; start += SLOT_STEP_MIN) {
    const end = start + durationMin;
    const inPast = isToday && start <= nowMin;
    const taken = dayBookings.some((b) => overlaps(start, end, b.startMin, b.startMin + b.durationMin));
    slots.push({ startMin: start, available: !inPast && !taken });
  }
  return slots;
}

export function isSlotFree(dateKey, startMin, durationMin, bookings, now = new Date()) {
  return getSlotsForDay(dateKey, durationMin, bookings, now)
    .some((s) => s.startMin === startMin && s.available);
}
