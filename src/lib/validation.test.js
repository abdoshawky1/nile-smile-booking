import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeEgyptianPhone, validateBookingForm } from './validation.js';

test('accepts common Egyptian mobile formats and normalizes them', () => {
  for (const input of ['01012345678', '010 1234 5678', '+201012345678', '00201012345678', '010-1234-5678']) {
    assert.equal(normalizeEgyptianPhone(input), '01012345678', input);
  }
  assert.equal(normalizeEgyptianPhone('01512345678'), '01512345678');
});

test('rejects wrong operator, wrong length, letters', () => {
  for (const input of ['01312345678', '0101234567', '010123456789', 'abc', '', '+441012345678']) {
    assert.equal(normalizeEgyptianPhone(input), null, input);
  }
});

test('form needs a name and a valid phone', () => {
  assert.deepEqual(validateBookingForm({ name: 'Omar', phone: '01012345678' }), {});
  assert.deepEqual(Object.keys(validateBookingForm({ name: ' ', phone: '1' })).sort(), ['name', 'phone']);
});
