import { useState } from 'react';
import { addDays, startOfToday, toDateKey } from '../lib/dates.js';
import { isClosedDay, MAX_DAYS_AHEAD } from '../lib/slots.js';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({ selected, onSelect }) {
  const today = startOfToday();
  const lastBookable = addDays(today, MAX_DAYS_AHEAD);
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = view.getFullYear();
  const month = view.getMonth();
  const leadingBlanks = view.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const canGoBack = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoForward = new Date(year, month + 1, 1) <= lastBookable;

  const cells = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(<span key={`b${i}`} />);
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const key = toDateKey(date);
    const disabled = date < today || date > lastBookable || isClosedDay(key);
    cells.push(
      <button
        key={key}
        type="button"
        className={`cal-day${key === selected ? ' is-selected' : ''}`}
        disabled={disabled}
        aria-pressed={key === selected}
        onClick={() => onSelect(key)}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="calendar">
      <div className="cal-head">
        <button type="button" className="cal-nav" disabled={!canGoBack} aria-label="Previous month"
          onClick={() => setView(new Date(year, month - 1, 1))}>&lsaquo;</button>
        <strong>{view.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</strong>
        <button type="button" className="cal-nav" disabled={!canGoForward} aria-label="Next month"
          onClick={() => setView(new Date(year, month + 1, 1))}>&rsaquo;</button>
      </div>
      <div className="cal-grid">
        {WEEKDAYS.map((d) => <span key={d} className="cal-weekday">{d}</span>)}
        {cells}
      </div>
    </div>
  );
}
