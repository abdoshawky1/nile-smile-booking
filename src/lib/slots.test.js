import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getSlotsForDay, isSlotFree } from './slots.js';

const monday = '2026-12-07'; // a Monday
const friday = '2026-12-11';
const farBefore = new Date(2026, 11, 1, 9, 0);

test('closed on Friday', () => {
  assert.deepEqual(getSlotsForDay(friday, 30, [], farBefore), []);
});

test('a 90 minute treatment cannot start in the last 90 minutes of the day', () => {
  const slots = getSlotsForDay(monday, 90, [], farBefore);
  assert.equal(slots.at(-1).startMin, 18 * 60 + 30); // 6:30 PM, ends 8:00 PM
});

test('an existing booking blocks every overlapping start time', () => {
  const booked = [{ date: monday, startMin: 11 * 60, durationMin: 60 }]; // 11:00-12:00
  const free = (s) => isSlotFree(monday, s, 30, booked, farBefore);
  assert.equal(free(10 * 60 + 30), true);  // 10:30-11:00 touches, no overlap
  assert.equal(free(11 * 60), false);
  assert.equal(free(11 * 60 + 30), false);
  assert.equal(free(12 * 60), true);
});

test('a long treatment is blocked by a booking inside its window', () => {
  const booked = [{ date: monday, startMin: 11 * 60, durationMin: 30 }];
  assert.equal(isSlotFree(monday, 10 * 60, 90, booked, farBefore), false);
});

test('past times today are unavailable', () => {
  const now = new Date(2026, 11, 7, 13, 10);
  const slots = getSlotsForDay(monday, 30, [], now);
  const at = (m) => slots.find((s) => s.startMin === m).available;
  assert.equal(at(13 * 60), false);
  assert.equal(at(13 * 60 + 30), true);
});

test('bookings on other days do not matter', () => {
  const booked = [{ date: '2026-12-08', startMin: 600, durationMin: 60 }];
  assert.equal(isSlotFree(monday, 600, 30, booked, farBefore), true);
});
