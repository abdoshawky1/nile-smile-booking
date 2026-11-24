import { isSlotFree } from './slots.js';

const KEY = 'clinic.bookings.v1';

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return []; // corrupted or unavailable storage should not crash the app
  }
}

function write(bookings) {
  localStorage.setItem(KEY, JSON.stringify(bookings));
}

export class SlotTakenError extends Error {}

// Re-checks availability against fresh data at save time. The UI already hides
// taken slots, but another tab could have booked it since the page loaded.
export function saveBooking(booking) {
  const all = getBookings();
  const active = all.filter((b) => b.status !== 'cancelled');
  if (!isSlotFree(booking.date, booking.startMin, booking.durationMin, active)) {
    throw new SlotTakenError('That time was just taken. Please pick another slot.');
  }
  write([...all, booking]);
  return booking;
}

export function cancelBooking(reference) {
  write(getBookings().map((b) => (b.reference === reference ? { ...b, status: 'cancelled' } : b)));
}

export function findBooking(reference) {
  return getBookings().find((b) => b.reference === reference);
}
