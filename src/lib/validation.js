// Egyptian mobile numbers: 01 + operator digit (0, 1, 2 or 5) + 8 digits.
// Accepts local (010...), +20, and 0020 forms, with spaces or dashes.
export function normalizeEgyptianPhone(input) {
  const digits = input.replace(/[\s\-()]/g, '');
  const match = digits.match(/^(?:\+20|0020|20|0)(1[0125]\d{8})$/);
  return match ? `0${match[1]}` : null;
}

export function validateBookingForm({ name, phone }) {
  const errors = {};
  const trimmed = name.trim();
  if (trimmed.length < 2) errors.name = 'Please enter your full name.';
  if (!normalizeEgyptianPhone(phone)) {
    errors.phone = 'Enter a valid Egyptian mobile number, e.g. 010 1234 5678.';
  }
  return errors;
}
