// Human-friendly booking reference, e.g. NSD-7K4Q2M.
// Skips look-alike characters (0/O, 1/I) so it is easy to read out over the phone.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateReference() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const code = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
  return `NSD-${code}`;
}
