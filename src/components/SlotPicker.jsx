import { formatMinutes } from '../lib/dates.js';

export default function SlotPicker({ slots, selected, onSelect }) {
  if (slots.length === 0) return <p className="muted">The clinic is closed on this day.</p>;
  if (!slots.some((s) => s.available)) return <p className="muted">No times left on this day. Try another date.</p>;

  return (
    <div className="slots" role="group" aria-label="Available times">
      {slots.map((slot) => (
        <button
          key={slot.startMin}
          type="button"
          className={`slot${slot.startMin === selected ? ' is-selected' : ''}`}
          disabled={!slot.available}
          aria-pressed={slot.startMin === selected}
          onClick={() => onSelect(slot.startMin)}
        >
          {formatMinutes(slot.startMin)}
        </button>
      ))}
    </div>
  );
}
