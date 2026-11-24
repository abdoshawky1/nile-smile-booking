import { useEffect, useState } from 'react';
import { getBookings } from '../lib/storage.js';

// Reads bookings from localStorage and refreshes when another tab changes them.
export function useBookings() {
  const [bookings, setBookings] = useState(getBookings);

  useEffect(() => {
    const refresh = () => setBookings(getBookings());
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, []);

  return [bookings, () => setBookings(getBookings())];
}
