// Single source of truth for clinic details and services.
// Keeping content out of components means a new client = edit this file only.

export const clinic = {
  name: 'Nile Smile Dental',
  tagline: 'Gentle, modern dental care in the heart of Cairo.',
  phone: '+20 2 2345 6789',
  email: 'hello@nilesmile.example',
  address: '14 Road 9, Maadi, Cairo, Egypt',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Maadi+Cairo',
};

// Days use JS getDay(): 0 = Sunday ... 6 = Saturday. Friday is closed.
export const workingHours = [
  { label: 'Saturday to Thursday', hours: '10:00 AM to 8:00 PM' },
  { label: 'Friday', hours: 'Closed' },
];

export const services = [
  { id: 'checkup', name: 'Checkup and Exam', durationMin: 30, priceEgp: 300, description: 'A full exam, X-rays if needed, and a clear treatment plan.' },
  { id: 'cleaning', name: 'Teeth Cleaning', durationMin: 45, priceEgp: 500, description: 'Scaling and polishing to remove plaque and surface stains.' },
  { id: 'whitening', name: 'Teeth Whitening', durationMin: 60, priceEgp: 1800, description: 'In-chair whitening for a visibly brighter smile in one visit.' },
  { id: 'filling', name: 'Fillings', durationMin: 45, priceEgp: 700, description: 'Tooth-colored fillings that match your natural teeth.' },
  { id: 'root-canal', name: 'Root Canal', durationMin: 90, priceEgp: 2500, description: 'Pain-free treatment to save a badly infected tooth.' },
  { id: 'braces', name: 'Braces Consultation', durationMin: 30, priceEgp: 0, description: 'Free first consultation to plan straighter teeth.' },
];

export function formatPrice(priceEgp) {
  return priceEgp === 0 ? 'Free' : `${priceEgp.toLocaleString('en-US')} EGP`;
}
