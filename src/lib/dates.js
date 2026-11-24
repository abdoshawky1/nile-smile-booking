// Dates are passed around as 'YYYY-MM-DD' strings in the user's local time.
// Avoiding toISOString() on purpose: it converts to UTC and can shift the day.

export function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function fromDateKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function formatLongDate(key) {
  return fromDateKey(key).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

// 14:30 -> '2:30 PM'
export function formatMinutes(minutes) {
  const h24 = Math.floor(minutes / 60);
  const m = String(minutes % 60).padStart(2, '0');
  const suffix = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${m} ${suffix}`;
}
